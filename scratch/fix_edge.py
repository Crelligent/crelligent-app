import re

# Read intelligent-systems/page.tsx
with open("src/app/intelligent-systems/page.tsx", "r", encoding="utf-8") as f:
    is_content = f.read()

# Extract the verticals array accurately
# We can find the start and then find the corresponding closing bracket.
start_idx = is_content.find("const verticals:")
if start_idx == -1:
    print("Could not find const verticals")
    exit(1)

# Find the end of the array. The array ends with `\n]` followed by `\n\nconst hardware` or similar.
end_idx = is_content.find("\n]\n", start_idx) + 2

verticals_array = is_content[start_idx:end_idx]

# Update slugs
slug_map = {
    'its': 'transport',
    'ies': 'energy',
    'ils': 'logistics',
    'iis': 'industrial',
    'ibs': 'buildings',
    'ifis': 'finance',
    'irs': 'retail',
    'ihs': 'healthcare',
    'iss': 'security',
    'ias': 'agriculture'
}
for old, new in slug_map.items():
    verticals_array = re.sub(rf"slug:\s*'{old}'", f"slug: '{new}'", verticals_array)

# Read edge/page.tsx
with open("src/app/edge/page.tsx", "r", encoding="utf-8") as f:
    edge_content = f.read()

# Replace the broken array
bad_start = edge_content.find("const verticals:")
bad_end = edge_content.find("export default function CrelligentEdgePage() {")

if bad_start != -1 and bad_end != -1:
    # Replace the broken piece with the correct array
    edge_content = edge_content[:bad_start] + verticals_array + "\n\n" + edge_content[bad_end:]

with open("src/app/edge/page.tsx", "w", encoding="utf-8") as f:
    f.write(edge_content)

print("Fixed!")
