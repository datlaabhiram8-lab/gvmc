import re, json
from pathlib import Path

p = Path('pdf_text.txt')
if not p.exists():
    print('pdf_text.txt not found')
    raise SystemExit(1)
text = p.read_text(encoding='utf-8')

# Split where a line starts with a ward number
parts = re.split(r'(?m)^(?=\s*\d{1,3}\b)', text)
entries = []
for part in parts:
    part = part.strip()
    if not part:
        continue
    m = re.match(r'^\s*(\d{1,3})\b\s*(.*)$', part, flags=re.DOTALL)
    if not m:
        continue
    ward = int(m.group(1))
    body = m.group(2).strip()
    # Normalize whitespace
    body = re.sub(r"\s+", " ", body)
    entries.append({"ward": ward, "areas": [body]})

# Sort by ward
entries = sorted(entries, key=lambda x: x['ward'])

with open('ward_areas_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print('Wrote', len(entries), 'entries (wards) to ward_areas_mapping.json')
