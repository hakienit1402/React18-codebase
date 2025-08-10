#!/usr/bin/env node
// Rename project scaffold: update package.json name, index.html <title>, README title/mentions.
// Usage:
//   node scripts/rename-project.mjs --name my-new-app --title "My New App" [--dry]

import fs from 'fs';
import path from 'path';

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { dry: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--dry') { out.dry = true; continue; }
    if (a === '--name') { out.name = args[++i]; continue; }
    if (a === '--title') { out.title = args[++i]; continue; }
  }
  return out;
}

function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeFile(p, content, dry) {
  if (dry) { console.log(`[dry] write ${p}`); return; }
  fs.writeFileSync(p, content);
}

function replaceInFile(filePath, replacers, dry) {
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, 'utf8');
  let dst = src;
  for (const [pattern, replacement] of replacers) {
    dst = dst.replace(pattern, replacement);
  }
  if (dst !== src) writeFile(filePath, dst, dry);
}

async function main() {
  const { name, title, dry } = parseArgs();
  if (!name && !title) {
    console.error('Usage: node scripts/rename-project.mjs --name my-new-app --title "My New App"');
    process.exit(1);
  }

  // package.json name
  if (name) {
    const pkgPath = path.resolve('package.json');
    const pkg = readJSON(pkgPath);
    const oldName = pkg.name;
    if (oldName !== name) {
      pkg.name = name;
      writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', dry);
      console.log(`Updated package.json name: ${oldName} -> ${name}`);
    }
    // README occurrences (code examples)
    replaceInFile(
      path.resolve('README.md'),
      [new RegExp(oldName, 'g'), name],
      dry,
    );
  }

  // index.html <title>
  if (title) {
    const indexHtml = path.resolve('index.html');
    replaceInFile(
      indexHtml,
      [/\<title\>[^<]*\<\/title\>/, `<title>${title}</title>`],
      dry,
    );
    // README intro line ("Pulsar is a modern ...")
    replaceInFile(
      path.resolve('README.md'),
      [/^Pulsar\b/gm, title],
      dry,
    );
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});


