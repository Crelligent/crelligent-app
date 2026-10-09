with open('next.config.ts', 'r', encoding='utf-8') as f:
    config = f.read()

redirect = """      {
        source: '/edge',
        destination: '/intelligent-systems',
        permanent: true,
      },"""

config = config.replace('return [', 'return [\n' + redirect)

with open('next.config.ts', 'w', encoding='utf-8') as f:
    f.write(config)
