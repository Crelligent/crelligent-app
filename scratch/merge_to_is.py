import re
import sys

with open("src/app/edge/page.tsx", "r", encoding="utf-8") as f:
    edge_content = f.read()

with open("src/app/intelligent-systems/page.tsx", "r", encoding="utf-8") as f:
    is_content = f.read()

# Extract Edge Offerings
offerings_match = re.search(r'(<section className="px-6 mb-32 max-w-7xl mx-auto">\s*<h2.*?Crelligent Edge Engineering Capabilities.*?</section>)', edge_content, re.DOTALL)
if not offerings_match:
    print("Could not find Edge Offerings")
    sys.exit(1)
offerings_html = offerings_match.group(1)

# Extract ESRE Context
esre_match = re.search(r'(<section className="px-6 mb-24 max-w-5xl mx-auto">\s*<div.*?The physical foundation of ESRE OS.*?</section>)', edge_content, re.DOTALL)
if not esre_match:
    print("Could not find ESRE context")
    sys.exit(1)
esre_html = esre_match.group(1)

# Insert them into intelligent-systems/page.tsx right after HERO (before SECTION 2)
section_2_idx = is_content.find("{/* ⚡⚡ SECTION 2")
if section_2_idx == -1:
    print("Could not find SECTION 2")
    sys.exit(1)

# Also update the Navigation.tsx
with open("src/components/shared/Navigation.tsx", "r", encoding="utf-8") as f:
    nav_content = f.read()
nav_content = nav_content.replace("{ name: 'Edge — Physical Layer & IoT', href: '/edge' }", "{ name: 'Edge & Intelligent Systems', href: '/intelligent-systems' }")
with open("src/components/shared/Navigation.tsx", "w", encoding="utf-8") as f:
    f.write(nav_content)

# Update Footer.tsx
with open("src/components/shared/Footer.tsx", "r", encoding="utf-8") as f:
    footer_content = f.read()
footer_content = footer_content.replace("{ name: 'Foundry', href: '/foundry' },\n          { name: 'Enterprise', href: '/enterprise' },", "{ name: 'Foundry', href: '/foundry' },\n          { name: 'Enterprise', href: '/enterprise' },\n          { name: 'Intelligent Systems', href: '/intelligent-systems' },")
with open("src/components/shared/Footer.tsx", "w", encoding="utf-8") as f:
    f.write(footer_content)

# Insert the HTML
new_is_content = is_content[:section_2_idx] + "\n      {/* ⚡⚡ SECTION 1.5 - EDGE CAPABILITIES ⚡⚡ */}\n      " + offerings_html + "\n\n      " + esre_html + "\n\n      " + is_content[section_2_idx:]

with open("src/app/intelligent-systems/page.tsx", "w", encoding="utf-8") as f:
    f.write(new_is_content)

print("Merged Edge into Intelligent Systems!")
