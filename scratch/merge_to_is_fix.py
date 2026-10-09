import re
import sys

with open("src/app/edge/page.tsx", "r", encoding="utf-8") as f:
    edge_content = f.read()

with open("src/app/intelligent-systems/page.tsx", "r", encoding="utf-8") as f:
    is_content = f.read()

# Extract Edge Offerings
offerings_match = re.search(r'(<section className="px-6 mb-32 max-w-7xl mx-auto">\s*<h2.*?Crelligent Edge Engineering Capabilities.*?</section>)', edge_content, re.DOTALL)
offerings_html = offerings_match.group(1)

# Extract ESRE Context
esre_match = re.search(r'(<section className="px-6 mb-24 max-w-5xl mx-auto">\s*<div.*?The physical foundation of ESRE OS.*?</section>)', edge_content, re.DOTALL)
esre_html = esre_match.group(1)

# Find SECTION 2
section_2_match = re.search(r'\{/\*.*?SECTION 2', is_content)
if not section_2_match:
    print("Could not find SECTION 2")
    sys.exit(1)

section_2_idx = section_2_match.start()

new_is_content = is_content[:section_2_idx] + "\n      {/* EDGE CAPABILITIES */}\n      " + offerings_html + "\n\n      " + esre_html + "\n\n      " + is_content[section_2_idx:]

# Update the Hero copy
new_is_content = new_is_content.replace(
    'Crelligent Intelligent Systems deploys operational intelligence infrastructure',
    'Crelligent Edge and Intelligent Systems deploy operational intelligence infrastructure'
)
new_is_content = new_is_content.replace(
    'One Architecture. <span className="text-[#f59e0b]">Ten Industries.</span> The Intelligence Layer African Operations Have Never Had.',
    'We build the nervous system for your physical assets. One Edge Architecture. <span className="text-[#f59e0b]">Ten Industries.</span>'
)

with open("src/app/intelligent-systems/page.tsx", "w", encoding="utf-8") as f:
    f.write(new_is_content)

print("Merged!")
