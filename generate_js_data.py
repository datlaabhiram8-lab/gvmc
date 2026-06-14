import json, re

with open('ward_areas_mapping.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Build a clean ward -> areas lookup, normalizing area names
clean_lookup = {}
for entry in data:
    ward = entry['ward']
    areas = []
    for area in entry['areas']:
        # Clean up area strings
        a = area.strip().strip('.')
        # Skip obvious junk: address fragments, numbers-only, very short
        if len(a) < 4:
            continue
        if re.match(r'^\d+[\-\/]\d+', a):  # address numbers like "1-149"
            continue
        if re.match(r'^(FLAT NO|IIIRD|MK\'S|RAJU|MURTHY|REDDY\)|APPARAO|D\.NO)', a):
            continue
        if a.isupper() and len(a) < 8 and 'NAGAR' not in a:  # short all-caps codes
            continue
        areas.append(a)
    clean_lookup[ward] = list(dict.fromkeys(areas))  # deduplicate preserving order

# Also build reverse: area (lowercase) -> ward
area_to_ward = {}
for ward, areas in clean_lookup.items():
    for area in areas:
        key = area.lower().strip()
        if key not in area_to_ward:
            area_to_ward[key] = ward

print("Building JS output...")
lines = ["// Auto-generated from GVMC Corporators Ward Wise Area Details PDF"]
lines.append("// Total wards: " + str(len(clean_lookup)))
lines.append("// Total unique areas: " + str(len(area_to_ward)))
lines.append("")
lines.append("const WARD_AREAS = " + json.dumps(clean_lookup, ensure_ascii=False, indent=2) + ";")
lines.append("")
lines.append("const AREA_TO_WARD = " + json.dumps(area_to_ward, ensure_ascii=False, indent=2) + ";")
lines.append("")
lines.append("// Function to find ward by area name (case-insensitive partial match)")
lines.append("function findWardByArea(query) {")
lines.append("  if (!query) return null;")
lines.append("  const q = query.toLowerCase().trim();")
lines.append("  // Exact match first")
lines.append("  if (AREA_TO_WARD[q] !== undefined) return AREA_TO_WARD[q];")
lines.append("  // Partial match")
lines.append("  for (const [area, ward] of Object.entries(AREA_TO_WARD)) {")
lines.append("    if (area.includes(q) || q.includes(area)) return ward;")
lines.append("  }")
lines.append("  return null;")
lines.append("}")
lines.append("")
lines.append("// Function to get all areas for a ward")
lines.append("function getAreasForWard(wardNum) {")
lines.append("  return WARD_AREAS[wardNum] || [];")
lines.append("}")

with open('ward_data.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))

print("ward_data.js written successfully!")
print("Total wards with data:", len(clean_lookup))
print("Total searchable area entries:", len(area_to_ward))

# Save clean JSON too
with open('ward_areas_clean.json', 'w', encoding='utf-8') as f:
    json.dump(clean_lookup, f, ensure_ascii=False, indent=2)
print("ward_areas_clean.json written!")
