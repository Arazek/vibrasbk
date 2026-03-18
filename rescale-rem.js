#!/usr/bin/env node
/**
 * rescale-rem.js
 * Removes `font-size: 10px` from :root and rescales all rem values
 * from the 10px base to the standard 16px browser base.
 *
 * Formula: new_rem = old_rem * (10 / 16) = old_rem * 0.625
 *
 * Usage: node rescale-rem.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SRC_DIR = path.resolve(__dirname, 'apps/mobile-app/src');
const EXTENSIONS = ['.ts', '.css', '.scss', '.html'];

const FACTOR = 10 / 16; // 0.625

function findFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', 'dist', '.angular'].includes(entry.name)) {
      results.push(...findFiles(full));
    } else if (entry.isFile() && EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function rescale(content) {
  // 1. Remove the font-size: 10px declaration (and its comment line)
  content = content.replace(
    /\s*\/\* Base font-size: 10px[^\n]*\*\/\n\s*font-size: 10px;\n/g,
    '\n'
  );

  // 2. Rescale all rem values: match numbers like 0.2rem, 1.6rem, 20rem
  //    Skip values already inside var(...) — those reference tokens, not raw values
  content = content.replace(/\b(\d+(?:\.\d+)?)rem\b/g, (match, num) => {
    const scaled = parseFloat(num) * FACTOR;
    // Round to 4 significant decimal places, strip trailing zeros
    return `${parseFloat(scaled.toFixed(4))}rem`;
  });

  return content;
}

const files = findFiles(SRC_DIR);
let count = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = rescale(original);

  if (updated !== original) {
    const rel = path.relative(SRC_DIR, file);
    if (DRY_RUN) {
      console.log(`[dry-run] ${rel}`);
    } else {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`rescaled: ${rel}`);
    }
    count++;
  }
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Done. ${count} file(s) modified.`);
