import os
import re

log_file = r"C:\Users\Abhi\.gemini\antigravity\brain\8bfb7a51-810c-4694-9687-551ba5ea4129\.system_generated\logs\transcript.jsonl"
out_file = r"c:\Users\Abhi\Desktop\gvmc 2\found_keys.txt"

if not os.path.exists(log_file):
    print("Log file does not exist")
    with open(out_file, "w") as f:
        f.write("Log file does not exist")
else:
    print("Log file exists, reading...")
    found = []
    with open(log_file, "r", encoding="utf-8") as f:
        for line in f:
            if "eyJ" in line:
                # Find all occurrences of jwt-like strings
                matches = re.findall(r"eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+", line)
                for m in matches:
                    if m not in found:
                        found.append(m)
    
    with open(out_file, "w") as f:
        for key in found:
            f.write(key + "\n")
    print(f"Done, found {len(found)} keys.")
