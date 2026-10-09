import re

with open('src/app/edge/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract missing icons
icon_matches = set(re.findall(r'<([A-Z][a-zA-Z0-9]+)\s+className=', content))
print("Icons found in tags:", icon_matches)

# Add them to lucide-react import
import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', content)
if import_match:
    existing_icons = set([i.strip() for i in import_match.group(1).split(',')])
    missing = icon_matches - existing_icons
    print("Missing icons:", missing)
    if missing:
        new_import_block = import_match.group(1) + ", " + ", ".join(missing)
        new_import = f"import {{ {new_import_block} }} from 'lucide-react'"
        content = content.replace(import_match.group(0), new_import)
        with open('src/app/edge/page.tsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Fixed imports.")
