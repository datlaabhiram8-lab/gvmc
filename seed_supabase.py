import sys
import os
import json
import re
import urllib.request
import urllib.error

def send_post(url, headers, data):
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers=headers,
        method='POST'
    )
    try:
        with urllib.request.urlopen(req) as response:
            return response.read(), response.status
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.read().decode('utf-8')}")
        raise e

def main():
    if len(sys.argv) < 3:
        # Try to read from environment or prompt
        url = os.environ.get("SUPABASE_URL")
        key = os.environ.get("SUPABASE_ANON_KEY")
        if not url or not key:
            print("Usage: python seed_supabase.py <SUPABASE_URL> <SUPABASE_ANON_KEY>")
            print("Alternatively, set SUPABASE_URL and SUPABASE_ANON_KEY env variables.")
            url = input("Enter Supabase URL (e.g. https://xxxx.supabase.co): ").strip()
            key = input("Enter Supabase Anon Key: ").strip()
            if not url or not key:
                sys.exit(1)
    else:
        url = sys.argv[1].rstrip('/')
        key = sys.argv[2]

    # Normalize url
    if not url.startswith("http"):
        url = "https://" + url

    # Base path
    base_dir = os.path.dirname(os.path.abspath(__file__))
    demographics_path = os.path.join(base_dir, 'js', 'demographics.js')
    areas_path = os.path.join(base_dir, 'ward_areas_clean.json')

    print(f"Reading demographics from: {demographics_path}")
    print(f"Reading areas from: {areas_path}")

    # 1. Parse demographics
    demographics = {}
    if not os.path.exists(demographics_path):
        print(f"Error: {demographics_path} not found.")
        sys.exit(1)

    with open(demographics_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
        # Match lines like: 1: { ward:1, name:"Bheemili", population:18240, ... }
        pattern = re.compile(
            r'(\d+)\s*:\s*\{\s*ward\s*:\s*(\d+)\s*,\s*'
            r'name\s*:\s*["\']([^"\']*)["\']\s*,\s*'
            r'population\s*:\s*(\d+)\s*,\s*'
            r'male\s*:\s*(\d+)\s*,\s*'
            r'female\s*:\s*(\d+)\s*,\s*'
            r'sc\s*:\s*(\d+)\s*,\s*'
            r'st\s*:\s*(\d+)\s*,\s*'
            r'secretariat\s*:\s*["\']([^"\']*)["\']\s*\}'
        )
        for match in pattern.finditer(content):
            key_val = int(match.group(1))
            demographics[key_val] = {
                'ward': int(match.group(2)),
                'name': match.group(3),
                'population': int(match.group(4)),
                'male': int(match.group(5)),
                'female': int(match.group(6)),
                'sc': int(match.group(7)),
                'st': int(match.group(8)),
                'secretariat': match.group(9)
            }

    print(f"Parsed {len(demographics)} ward demographics.")

    # 2. Parse areas mapping
    if not os.path.exists(areas_path):
        print(f"Error: {areas_path} not found.")
        sys.exit(1)

    with open(areas_path, 'r', encoding='utf-8') as f:
        areas_data = json.load(f)

    print(f"Loaded {len(areas_data)} ward areas mappings.")

    headers = {
        'apikey': key,
        'Authorization': f'Bearer {key}',
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
    }

    # 3. Insert Wards
    wards_payload = []
    for w in range(1, 121):
        demo = demographics.get(w, {
            'ward': w,
            'name': f'Ward {w}',
            'population': 20000,
            'male': 10000,
            'female': 10000,
            'sc': 2000,
            'st': 200,
            'secretariat': 'Ward Secretariat'
        })
        wards_payload.append({
            'ward': demo['ward'],
            'name': demo['name'],
            'population': demo['population'],
            'male': demo['male'],
            'female': demo['female'],
            'sc': demo['sc'],
            'st': demo['st'],
            'secretariat': demo['secretariat']
        })

    print("Uploading Wards to Supabase...")
    wards_url = f"{url}/rest/v1/wards"
    send_post(wards_url, headers, wards_payload)
    print("Successfully seeded all 120 wards.")

    # 4. Insert Areas
    areas_payload = []
    for ward_str, area_list in areas_data.items():
        ward_id = int(ward_str)
        for area_name in area_list:
            areas_payload.append({
                'ward_id': ward_id,
                'name': area_name
            })

    print(f"Uploading {len(areas_payload)} sub-localities to Supabase...")
    areas_url = f"{url}/rest/v1/ward_areas"
    # PostgREST allows bulk insertion. Let's send in chunks of 500 to prevent request size limits
    chunk_size = 500
    for i in range(0, len(areas_payload), chunk_size):
        chunk = areas_payload[i:i + chunk_size]
        send_post(areas_url, headers, chunk)
        print(f"Uploaded chunk {i//chunk_size + 1} ({len(chunk)} items)...")

    print("Database seeding completed successfully!")

if __name__ == "__main__":
    main()
