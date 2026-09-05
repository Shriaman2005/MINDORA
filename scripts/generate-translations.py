#!/usr/bin/env python3
"""Generate locale JSON through the local, development-only FastAPI service."""
from __future__ import annotations
import argparse, json, re
from pathlib import Path
from urllib import request

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "locales" / "en.json"
TARGETS = {"hi": "hin_Deva", "ne": "npi_Deva", "as": "asm_Beng", "bn": "ben_Beng", "brx": "brx_Deva", "mni": "mni_Mtei"}
TOKEN = re.compile(r"{{\s*[\w.]+\s*}}")

def flatten(value, path=""):
    if isinstance(value, dict):
        for key, child in value.items(): yield from flatten(child, f"{path}.{key}" if path else key)
    else:
        if not isinstance(value, str): raise TypeError(f"{path} must be a string")
        yield path, value

def unflatten(items):
    root = {}
    for path, value in items:
        target = root
        *parents, last = path.split(".")
        for part in parents: target = target.setdefault(part, {})
        target[last] = value
    return root

def verify(source, target):
    for (key, source_text), (_, target_text) in zip(source, target, strict=True):
        if TOKEN.findall(source_text) != TOKEN.findall(target_text):
            raise ValueError(f"Placeholder mismatch in {key}: {TOKEN.findall(source_text)} != {TOKEN.findall(target_text)}")

def post(base_url, texts, target):
    data = json.dumps({"texts": texts, "source": "eng_Latn", "target": target}).encode()
    req = request.Request(f"{base_url.rstrip('/')}/translate", data=data, headers={"Content-Type": "application/json"})
    with request.urlopen(req, timeout=120) as response: return json.load(response)["translations"]

def main():
    parser = argparse.ArgumentParser(); parser.add_argument("--batch-size", type=int, default=32); parser.add_argument("--targets", default=",".join(TARGETS)); parser.add_argument("--base-url", default="http://127.0.0.1:8000"); parser.add_argument("--dry-run", action="store_true"); parser.add_argument("--verify", action="store_true")
    args = parser.parse_args(); source = list(flatten(json.loads(SOURCE.read_text(encoding="utf-8"))))
    for runtime in args.targets.split(","):
        if runtime not in TARGETS: raise ValueError(f"Unsupported target: {runtime}")
        output = ROOT / "src" / "locales" / f"{runtime}.json"
        if args.verify:
            verify(source, list(flatten(json.loads(output.read_text(encoding="utf-8"))))); print(f"{runtime}: verified"); continue
        translated = []
        for start in range(0, len(source), args.batch_size):
            batch = source[start:start + args.batch_size]; values = [text for _, text in batch]
            if args.dry_run: results = values
            else: results = post(args.base_url, values, TARGETS[runtime])
            if len(results) != len(batch): raise ValueError(f"{runtime}: translation count mismatch")
            translated.extend(zip((key for key, _ in batch), results))
        verify(source, translated)
        output.write_text(json.dumps(unflatten(translated), ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{runtime}: wrote {output.relative_to(ROOT)}")

if __name__ == "__main__": main()
