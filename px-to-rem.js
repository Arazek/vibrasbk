#!/usr/bin/env node
/**
 * px-to-rem.js
 * Converts all `Npx` values to `N/10rem` across mobile-app/src.
 * Relies on `font-size: 10px` being set on :root, so 1rem = 10px.
 *
 * Usage: node px-to-rem.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SRC_DIR = path.resolve(__dirname, 'apps/mobile-app/src');
const EXTENSIONS = ['.ts', '.css', '.scss', '.html'];

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

function pxToRem(num) {
  const n = parseFloat(num);
  if (n === 0) return '0';
  const rem = n / 10;
  // Up to 4 decimal places, strip trailing zeros
  return `${parseFloat(rem.toFixed(4))}rem`;
}

// Matches e.g. 16px, 1.5px, 0px — but NOT things like "v0.1px" (version strings)
// We only want to convert in CSS value contexts.
const PX_RE = /\b(\d+(?:\.\d+)?)px\b/g;

const files = findFiles(SRC_DIR);
let convertedCount = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.replace(PX_RE, (_, num) => pxToRem(num));

  if (updated !== original) {
    const rel = path.relative(SRC_DIR, file);
    if (DRY_RUN) {
      console.log(`[dry-run] would convert: ${rel}`);
    } else {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`converted: ${rel}`);
    }
    convertedCount++;
  }
}

console.log(`\n${DRY_RUN ? '[dry-run] ' : ''}Done. ${convertedCount} file(s) ${DRY_RUN ? 'would be' : 'were'} modified.`);
