import json

with open('ward_areas_mapping.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Print summary
total_areas = 0
for ward in data:
    count = len(ward['areas'])
    total_areas += count
    print("Ward", ward['ward'], ":", count, "areas")

print("\nTotal wards:", len(data))
print("Total area entries:", total_areas)
