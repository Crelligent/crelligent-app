with open('src/components/shared/Navigation.tsx', 'r', encoding='utf-8') as f:
    nav = f.read()

# Fix the literal backslashes that were inserted
nav = nav.replace(r"{ name: \'Edge & Intelligent Systems\', href: \'/intelligent-systems\' }", "{ name: 'Edge & Intelligent Systems', href: '/intelligent-systems' }")

with open('src/components/shared/Navigation.tsx', 'w', encoding='utf-8') as f:
    f.write(nav)
