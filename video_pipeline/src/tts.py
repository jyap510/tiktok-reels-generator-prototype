import os
import uuid
import kie_client


def generate_audio(script: str, voice: str = "nova") -> bytes:
    """Generate TTS audio bytes using OpenAI tts-1. Returns raw mp3 bytes."""
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise RuntimeError("OPENAI_API_KEY not set")
    from openai import OpenAI
    client = OpenAI(api_key=key)
    response = client.audio.speech.create(
        model="tts-1",
        voice=voice,
        input=script,
        response_format="mp3",
    )
    return response.content


def generate_tts_cdn_url(script: str, voice: str = "nova", upload_path: str = "tts") -> str:
    """Generate TTS audio and upload to KIE CDN. Returns downloadUrl (expires 3 days)."""
    audio_bytes = generate_audio(script, voice=voice)
    file_name = f"tts_{uuid.uuid4().hex[:8]}.mp3"
    return kie_client.upload_stream(audio_bytes, upload_path, file_name)
