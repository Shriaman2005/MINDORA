# MINDORA localization

MINDORA uses `i18next` and `react-i18next` at runtime. Every loaded language
resource is statically bundled from `src/locales`; switching language makes no
network request and continues to work offline after application assets load.

Supported runtime IDs and IndicTrans2 generation codes are: `en` / `eng_Latn`,
`hi` / `hin_Deva`, `ne` / `npi_Deva`, `as` / `asm_Beng`, `bn` / `ben_Beng`,
`brx` / `brx_Deva`, and `mni` / `mni_Mtei`.

Install frontend dependencies and run the app:

```powershell
npm.cmd install
npm.cmd run dev
```

The selector persists its validated value in `mindora.language`. Invalid or
missing values and missing keys fall back to English.

## Translation generation

English in `src/locales/en.json` is the source of truth. Add a semantic key
there, use `t("feature.key")` in React, then run the local development service:

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

In a second terminal, from the repository root:

```powershell
npm.cmd run translate
python scripts/generate-translations.py --verify
npm.cmd run build
```

The generator batches source strings, preserves nested JSON structure, and
fails if a generated value changes any `{{placeholder}}` token. Its FastAPI
service uses AI4Bharat IndicTrans2 only for build/development generation; the
browser never calls it. See `backend/README.md` for model setup.

Bodo (`brx`) and Meitei Mayek (`mni`) are marked
`machine-generated-review-required` in `src/locales/review-status.json` and
must be reviewed by native speakers before production release.
