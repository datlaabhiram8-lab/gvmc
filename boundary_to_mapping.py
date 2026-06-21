import re, json
from pathlib import Path

p = Path('pdf_text.txt')
if not p.exists():
    print('pdf_text.txt not found')
    raise SystemExit(1)
text = p.read_text(encoding='utf-8')

# Find ward sections starting with a line like '1 East:'
matches = list(re.finditer(r'^\s*(\d{1,3})\s+East:', text, flags=re.MULTILINE))
entries = []
for i, m in enumerate(matches):
    start = m.start()
    end = matches[i+1].start() if i+1 < len(matches) else len(text)
    chunk = text[start:end].strip()
    ward = int(m.group(1))
    # Remove the leading ward number
    body = re.sub(r'^\s*\d{1,3}\s+', '', chunk, count=1).strip()
    # Normalize whitespace
    body = re.sub(r"\s+", " ", body)
    entries.append({"ward": ward, "areas": [body]})

# Save to ward_areas_mapping.json
with open('ward_areas_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print('Wrote', len(entries), 'ward boundary entries to ward_areas_mapping.json')
