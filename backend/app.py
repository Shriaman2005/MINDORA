"""Development-only IndicTrans2 translation service.

The React application never calls this module.  It is intended for the local
resource generation script in ``scripts/generate-translations.py``.
"""
from __future__ import annotations

import logging
import os
from functools import lru_cache
from typing import Annotated

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

logging.basicConfig(level=os.getenv("LOG_LEVEL", "INFO"))
logger = logging.getLogger("mindora.translation")
app = FastAPI(title="MINDORA IndicTrans2 translation service")

class TranslationRequest(BaseModel):
    texts: Annotated[list[str], Field(min_length=1, max_length=128)]
    source: str = "eng_Latn"
    target: str

@lru_cache(maxsize=1)
def translator():
    """Load AI4Bharat's official HF pipeline lazily, once per process."""
    try:
        from transformers import pipeline
    except ImportError as exc:
        raise RuntimeError("Install backend requirements before translating.") from exc
    model = os.getenv("INDICTRANS2_MODEL", "ai4bharat/indictrans2-en-indic-dist-200M")
    return pipeline("translation", model=model, trust_remote_code=True)

@app.post("/translate")
def translate(request: TranslationRequest) -> dict[str, list[str]]:
    if not all(text.strip() for text in request.texts):
        raise HTTPException(status_code=422, detail="texts must contain non-empty strings")
    try:
        result = translator()(request.texts, src_lang=request.source, tgt_lang=request.target)
        translations = [item["translation_text"] for item in result]
    except Exception as exc:
        logger.exception("IndicTrans2 translation failed")
        raise HTTPException(status_code=503, detail=f"Translation model unavailable: {exc}") from exc
    if len(translations) != len(request.texts) or not all(isinstance(item, str) and item for item in translations):
        raise HTTPException(status_code=502, detail="Model returned an invalid translation batch")
    return {"translations": translations}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=int(os.getenv("PORT", "8000")))
