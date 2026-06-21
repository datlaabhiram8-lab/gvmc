import json
from pathlib import Path

ward_text = '''119
East and runs along the APEPDCL compound wall crossing the
simhachalam main road ant'l runs alor-rg the simhadri Nagar road upto
Simhachalam hill boundar),. _
East: Starting from the N.rtl-r Urr,
the Simhchalam road antl take turns towards Balaji nagar (Chandanapuri
Colony) road ancl passes l..g the simhachalam hill boundary upto
Simhadri Nagar.
South: Starting frotn the .rbove poirrt ancl turns towards west and runs
along the Simhadri Nagar Roac.l and crossing the Simhacham main road and
runs along the APEPDCL compourrd wall and natural drain meets BRTS at
Krishna nagar at Sri Lakshrni Ga'rnapathi Temple.
west: starting frorn the abovc point ancl passes towards north along the
BRTS road and runs alorrg the Pendurthi BRTS road uptoNaiduthota
junction.
North: starting from above point and runs towards East along the
Saimadhava Nagar road and turns towards north at Vinayaka temple and
runs along the Saimadhava Nagar natural drain passes towards East along
the Gedda up to Ganeshnagar road and turns towards north and meets
BRTS road and turns towards East and runs along the Vepagunta Gosala
road upto Gosala junction.
East The boundary starts from the. north Eastern corner of Kambalakonda
Reserve Forest and passes throughBRTS Road at Survey No. 51 Adivivaram
(v) and leading up to Simhachalam Hitl.
South: Starting from the above point, the route runs along the edge of
Simhachalam Hill, continues upto AfTSRTC Depot compound wall.
West: Starting from the above Point, runs towElrd north Simhadri Nagar,
and then turns west at Chandanapuri Colony and continuing Sai Baba
Temple road to meet Gopalapatnam Gosala Road near Prahladapuram.
From there, it runs along Gopalapabram Gosala Road junction and turns
west at Gosala Junction and proceeds towards Gosala-Vepagunta BRTS
Road And then turns towards north and passing through the natural drain
near Sai Nagar Colony, continuing along ]angala Colony Road, turning west
at Nukambika Temple, and runs through Shipyard Layout and Simhapuri
Colony Phase-II, leading to Erra Konda Reserve Forest.
North: Starting from the above junction passing through Errakonda Reserve
Forest and ends back to the Kambalakonda Reserve Forest.'''

p = Path('ward_areas_mapping.json')
if not p.exists():
    data = []
else:
    data = json.loads(p.read_text(encoding='utf-8'))

# Remove existing ward 119 if present
data = [e for e in data if e.get('ward') != 119]
# Append new entry
entry = {"ward": 119, "areas": [ward_text]}
data.append(entry)
# Sort by ward
data = sorted(data, key=lambda x: x.get('ward', 0))
# Write back
p.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
print('Appended/updated ward 119 in ward_areas_mapping.json')
