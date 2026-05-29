import re

file_path = r'c:\Users\OWNER\Nextier\crelligent-app\src\components\landing\RecentClientStories.tsx'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Replace common mojibake
content = content.replace('â€™', "'")
content = content.replace('â€”', "-")
content = content.replace('â€œ', '"')
content = content.replace('â€', '"')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement complete.")
