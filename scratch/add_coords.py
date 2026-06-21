import json
import re

COORDS_73_TO_120 = {
    "73": [17.755, 83.225],
    "74": [17.725, 83.245],
    "75": [17.685, 83.265],
    "76": [17.655, 83.275],
    "77": [17.682, 83.245],
    "78": [17.685, 83.235],
    "79": [17.690, 83.230],
    "80": [17.695, 83.235],
    "81": [17.690, 83.220],
    "82": [17.695, 83.210],
    "83": [17.692, 83.215],
    "84": [17.685, 83.195],
    "85": [17.715, 83.235],
    "86": [17.680, 83.185],
    "87": [17.685, 83.205],
    "88": [17.675, 83.195],
    "89": [17.670, 83.205],
    "90": [17.680, 83.215],
    "91": [17.675, 83.225],
    "92": [17.665, 83.215],
    "93": [17.655, 83.225],
    "94": [17.645, 83.235],
    "95": [17.665, 83.205],
    "96": [17.645, 83.195],
    "97": [17.685, 83.205],
    "98": [17.675, 83.175],
    "99": [17.675, 83.155],
    "100": [17.695, 83.145],
    "101": [17.685, 83.135],
    "102": [17.682, 83.115],
    "103": [17.665, 83.135],
    "104": [17.625, 83.165],
    "105": [17.655, 83.155],
    "106": [17.665, 83.095],
    "107": [17.695, 83.025],
    "108": [17.692, 83.015],
    "109": [17.685, 83.015],
    "110": [17.681, 83.005],
    "111": [17.691, 83.012],
    "112": [17.712, 83.015],
    "113": [17.755, 83.195],
    "114": [17.775, 83.215],
    "115": [17.795, 83.205],
    "116": [17.805, 83.195],
    "117": [17.785, 83.195],
    "118": [17.765, 83.205],
    "119": [17.755, 83.205],
    "120": [17.785, 83.225]
}

def main():
    file_path = 'js/ward-coordinates.js'
    print(f"Reading {file_path}...")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the JSON-like object inside the file.
    # It looks like: const WARD_COORDINATES = { ... };
    # Let's extract the dict between { and }
    match = re.search(r'const WARD_COORDINATES = (\{.*?\});', content, re.DOTALL)
    if not match:
        print("Could not find WARD_COORDINATES definition!")
        return

    json_str = match.group(1)
    
    # Parse existing coords
    coords = json.loads(json_str)
    print(f"Loaded {len(coords)} existing coordinates.")

    # Update with new coords
    for w, c in COORDS_73_TO_120.items():
        coords[w] = c

    print(f"Total coordinates after update: {len(coords)}")

    # Format back into javascript file content
    formatted_coords = json.dumps(coords, indent=2)
    # Re-insert into content
    new_content = f"// GVMC ward map coordinates for all 120 wards (Visakhapatnam)\nconst WARD_COORDINATES = {formatted_coords};\n"

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Successfully updated {file_path}!")

if __name__ == '__main__':
    main()
