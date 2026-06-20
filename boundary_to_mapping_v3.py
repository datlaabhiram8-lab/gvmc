import re, json
from pathlib import Path

p = Path('pdf_text.txt')
if not p.exists():
    print('pdf_text.txt not found')
    raise SystemExit(1)
text = p.read_text(encoding='utf-8')

# Match ward headers like '73 East:' or '73 East' at start of a line (case-insensitive)
pattern = re.compile(r'^\s*(\d{1,3})\s*East\b', flags=re.IGNORECASE | re.MULTILINE)
matches = list(pattern.finditer(text))
entries = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(text)
    chunk = text[start:end].strip()
    ward = int(m.group(1))
    # Remove leading ward number
    body = re.sub(r'^\s*\d{1,3}\s*', '', chunk, count=1).strip()
    body = re.sub(r"\s+", " ", body)
    entries.append({"ward": ward, "areas": [body]})

# Keep only wards 1..120 and sort
entries = [e for e in entries if 1 <= e['ward'] <= 120]
entries = sorted(entries, key=lambda x: x['ward'])

with open('ward_areas_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print('Wrote', len(entries), 'ward boundary entries to ward_areas_mapping.json')
