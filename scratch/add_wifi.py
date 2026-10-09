import re
with open('src/app/intelligent-systems/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

import_match = re.search(r'import\s+\{([^}]+)\}\s+from\s+[\'"]lucide-react[\'"]', content)
if import_match:
    existing = import_match.group(1)
    if 'Wifi' not in existing:
        new_import = import_match.group(0).replace('}', ', Wifi }')
        content = content.replace(import_match.group(0), new_import)

with open('src/app/intelligent-systems/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
print("Wifi added")
