import os
import json
import time
import requests
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env")

KIE_BASE = "https://api.kie.ai"

def _headers():
    key = os.environ.get("KIE_API_KEY")
    if not key:
        raise RuntimeError("KIE_API_KEY not set")
    return {"Authorization": f"Bearer {key}"}


def upload_url(file_url: str, upload_path: str, file_name: str = None) -> str:
    """Upload a remote file to KIE storage. Returns KIE-hosted fileUrl."""
    payload = {"fileUrl": file_url, "uploadPath": upload_path}
    if file_name:
        payload["fileName"] = file_name
    print(f"  [kie] upload_url: {file_url[:80]}...")
    r = requests.post(f"{KIE_BASE}/api/file-url-upload", json=payload, headers=_headers(), timeout=60)
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"upload_url failed: {data}")
    url = data["data"]["fileUrl"]
    print(f"  [kie] uploaded → {url}")
    return url


def create_task(model: str, input_params: dict) -> str:
    """Submit a generation task. Returns taskId."""
    payload = {"model": model, "input": input_params}
    print(f"  [kie] create_task model={model}")
    r = requests.post(f"{KIE_BASE}/api/v1/jobs/createTask", json=payload, headers=_headers(), timeout=30)
    r.raise_for_status()
    data = r.json()
    if data.get("code") != 200:
        raise RuntimeError(f"create_task failed: {data}")
    task_id = data["data"]["taskId"]
    print(f"  [kie] taskId={task_id}")
    return task_id


def poll_task(task_id: str, interval: int = 30, max_attempts: int = 40) -> dict:
    """Poll until task reaches success or fail. Returns task data dict."""
    for attempt in range(1, max_attempts + 1):
        r = requests.get(
            f"{KIE_BASE}/api/v1/jobs/recordInfo",
            params={"taskId": task_id},
            headers=_headers(),
            timeout=30,
        )
        r.raise_for_status()
        data = r.json()
        task_data = data.get("data", {})
        state = task_data.get("state", "unknown")
        print(f"  [poll] taskId={task_id} attempt={attempt}/{max_attempts} state={state}")
        if state == "success":
            return task_data
        if state == "fail":
            raise RuntimeError(f"Task {task_id} failed: {task_data}")
        time.sleep(interval)
    raise TimeoutError(f"Task {task_id} did not complete after {max_attempts} attempts")


def extract_result_url(task_data: dict) -> str:
    """Extract output URL from task data. resultJson is a JSON string."""
    raw = task_data.get("resultJson")
    if not raw:
        raise RuntimeError(f"No resultJson in task data: {task_data}")
    print(f"  [kie] raw resultJson: {str(raw)[:200]}")
    parsed = json.loads(raw) if isinstance(raw, str) else raw
    for key in ("url", "videoUrl", "imageUrl", "output", "video_url", "image_url"):
        if key in parsed:
            val = parsed[key]
            return val[0] if isinstance(val, list) else val
    # resultUrls is a list of URLs (nano-banana-pro, kling)
    if "resultUrls" in parsed:
        urls = parsed["resultUrls"]
        if urls:
            return urls[0]
    # Sometimes result is a list
    if isinstance(parsed, list) and parsed:
        first = parsed[0]
        if isinstance(first, str):
            return first
        for key in ("url", "videoUrl", "imageUrl", "resultUrls"):
            if key in first:
                val = first[key]
                return val[0] if isinstance(val, list) else val
    raise RuntimeError(f"Cannot find URL in resultJson: {parsed}")


def get_download_url(kie_url: str) -> str:
    """Get a temporary direct download URL from a KIE-hosted URL (valid 20min)."""
    r = requests.post(
        f"{KIE_BASE}/api/v1/common/download-url",
        json={"url": kie_url},
        headers=_headers(),
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()
    if data.get("code") != 200:
        raise RuntimeError(f"get_download_url failed: {data}")
    return data["data"]


def download_file(kie_url: str, dest_path: str) -> None:
    """Download a KIE-hosted file to local dest_path via the download-url proxy."""
    direct_url = get_download_url(kie_url)
    print(f"  [kie] downloading → {dest_path}")
    r = requests.get(direct_url, timeout=120, stream=True)
    r.raise_for_status()
    Path(dest_path).parent.mkdir(parents=True, exist_ok=True)
    with open(dest_path, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
    print(f"  [kie] saved {Path(dest_path).stat().st_size // 1024}KB → {dest_path}")
