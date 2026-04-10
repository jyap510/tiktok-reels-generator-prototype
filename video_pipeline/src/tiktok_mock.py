import json
import uuid
from datetime import datetime, timezone
from pathlib import Path


def mock_upload(product: dict, video_path: str, out_dir: str) -> dict:
    """Mock a TikTok upload. Prints result and writes tiktok_mock.json."""
    response = {
        "status": "success",
        "upload_id": f"tt_upload_{uuid.uuid4().hex[:12]}",
        "video_id": f"tt_video_{uuid.uuid4().hex[:16]}",
        "product_asin": product.get("asin", "unknown"),
        "product_title": product.get("title", "")[:80],
        "video_path": str(video_path),
        "video_size_kb": Path(video_path).stat().st_size // 1024 if Path(video_path).exists() else 0,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "mock": True,
    }

    out_path = Path(out_dir) / "tiktok_mock.json"
    with open(out_path, "w") as f:
        json.dump(response, f, indent=2)

    print(f"\n  [tiktok] MOCK UPLOAD SUCCESS")
    print(f"  [tiktok] upload_id : {response['upload_id']}")
    print(f"  [tiktok] video_id  : {response['video_id']}")
    print(f"  [tiktok] product   : {response['product_asin']} — {response['product_title']}")
    print(f"  [tiktok] written   → {out_path}")
    return response
