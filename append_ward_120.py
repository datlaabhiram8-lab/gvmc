import json
from pathlib import Path

ward_text = '''120 | East The boundary starts from the. north Eastern corner of Kambalakonda Reserve Forest and passes throughBRTS Road at Survey No. 51 Adivivaram (v) and leading up to Simhachalam Hitl.
South: Starting from the above point, the route runs along the edge of Simhachalam Hill, continues upto AfTSRTC Depot compound wall.
West: Starting from the above Point, runs towElrd north Simhadri Nagar, and then turns west at Chandanapuri Colony and continuing Sai Baba Temple road to meet Gopalapatnam Gosala Road near Prahladapuram. From there, it runs along Gopalapabram Gosala Road junction and turns west at Gosala Junction and proceeds towards Gosala-Vepagunta BRTS Road And then turns towards north and passing through the natural drain near Sai Nagar Colony, continuing along ]angala Colony Road, turning west at Nukambika Temple, and runs through Shipyard Layout and Simhapuri Colony Phase-II, leading to Erra Konda Reserve Forest.
North: Starting from the above junction passing through Errakonda Reserve Forest and ends back to the Kambalakonda Reserve Forest.'''

p = Path('ward_areas_mapping.json')
if not p.exists():
    data = []
else:
    data = json.loads(p.read_text(encoding='utf-8'))

# Remove existing ward 120 if present
data = [e for e in data if e.get('ward') != 120]
# Append new entry
entry = {"ward": 120, "areas": [ward_text]}

# Insert in sorted order
data.append(entry)
data = sorted(data, key=lambda x: x.get('ward', 0))

p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print('Appended/updated ward 120 in ward_areas_mapping.json')
