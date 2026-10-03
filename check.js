const fs = require('fs');
const path = require('path');
function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      files = files.concat(walk(p));
    } else if (p.endsWith('.tsx') || p.endsWith('.ts')) {
      files.push(p);
    }
  });
  return files;
}
const files = walk('./src');
let badImports = [];
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import.*from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    let importPath = match[1];
    if (importPath.startsWith('@/')) {
      importPath = importPath.replace('@/', './src/');
    } else if (importPath.startsWith('./') || importPath.startsWith('../')) {
      importPath = path.join(path.dirname(file), importPath);
    } else {
      continue;
    }
    if (!importPath.endsWith('.tsx') && !importPath.endsWith('.ts')) {
      for (const ext of ['.tsx', '.ts', '/index.tsx', '/index.ts']) {
        if (fs.existsSync(importPath + ext)) {
          const dirname = path.dirname(importPath + ext);
          const basename = path.basename(importPath + ext);
          const actualFiles = fs.readdirSync(dirname);
          if (!actualFiles.includes(basename)) {
            badImports.push({
              file,
              importPath,
              expected: basename,
              found: actualFiles.find(f => f.toLowerCase() === basename.toLowerCase())
            });
          }
          break;
        }
      }
    }
  }
});
console.log(JSON.stringify(badImports, null, 2));
