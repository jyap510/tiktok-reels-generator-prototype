import subprocess
from pathlib import Path


def merge_videos(video_paths: list, output_path: str) -> None:
    """Concat video files with ffmpeg using the concat demuxer (no re-encode)."""
    concat_list = Path(output_path).parent / "concat_list.txt"
    with open(concat_list, "w") as f:
        for vp in video_paths:
            f.write(f"file '{Path(vp).resolve()}'\n")

    print(f"  [ffmpeg] merging {len(video_paths)} clips → {output_path}")
    cmd = [
        "ffmpeg", "-y",
        "-f", "concat",
        "-safe", "0",
        "-i", str(concat_list),
        "-c", "copy",
        output_path,
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    concat_list.unlink(missing_ok=True)

    if result.returncode != 0:
        raise RuntimeError(f"ffmpeg failed:\n{result.stderr}")
    print(f"  [ffmpeg] merged → {output_path} ({Path(output_path).stat().st_size // 1024}KB)")
