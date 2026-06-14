import json
import re

def main():
    try:
        with open('pdf_text.txt', 'r', encoding='utf-8') as f:
            text = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    data = []
    lines = text.split("\n")
    current_ward = None
    current_areas = []

    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Match "1 1 1", "5 2 5", "98 8 98" etc.
        match = re.match(r'^(\d+)\s+(\d+)\s+(\d+)$', line)
        if match:
            if current_ward is not None:
                data.append({"ward": current_ward, "areas": " ".join(current_areas)})
            current_ward = int(match.group(3))
            current_areas = []
        else:
            if current_ward is not None:
                # Exclude lines that are likely part of the "NAME AND ADDRESS" or "PARTY" column
                if not re.match(r'^(SMT\.|SRI|DR |D\.NO|YSRCP|YSR CP|TDP|JANA|INDEPE|N|DENT|BJP|CPI|PLOT NUM|S/O)', line, re.IGNORECASE) and \
                   "VISAKHAPATNAM" not in line.upper() and \
                   "BHEEMILI" not in line.upper() and \
                   "VSP" not in line.upper() and \
                   not re.match(r'^\d{6}$', line): # pincode
                    current_areas.append(line)

    if current_ward is not None:
        data.append({"ward": current_ward, "areas": " ".join(current_areas)})

    # Further processing to clean up areas
    clean_data = []
    for entry in data:
        areas_str = entry["areas"]
        # split by commas
        areas_list = [a.strip() for a in areas_str.split(',') if a.strip() and a.strip() != '&' and len(a.strip()) > 2]
        clean_data.append({"ward": entry["ward"], "areas": areas_list})

    with open('ward_areas_mapping.json', 'w', encoding='utf-8') as f:
        json.dump(clean_data, f, indent=4, ensure_ascii=False)
    print('Data saved to ward_areas_mapping.json')

if __name__ == '__main__':
    main()
