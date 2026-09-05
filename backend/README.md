# IndicTrans2 development service

This service is used only while generating the bundled locale files. The web
app has no dependency on it at runtime.

Create a virtual environment, install requirements, and start it:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

`app.py` uses the official AI4Bharat IndicTrans2 Hugging Face model identifier
through the Transformers inference pipeline. Set `INDICTRANS2_MODEL` if your
local/current IndicTrans2 model distribution requires a different compatible
model. Model downloads require Hugging Face access on first setup; credentials
are never stored in this repository.
