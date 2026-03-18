#!/usr/bin/env node
/**
 * tokens-replace.js
 * Replaces hardcoded font-size rem values and font-weight numeric values
 * with --lgui-fs-* and --lgui-fw-* design tokens across mobile-app/src.
 *
 * Usage: node tokens-replace.js [--dry-run]
 */
const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const SRC_DIR = path.resolve(__dirname, 'apps/mobile-app/src');
const EXTENSIONS = ['.ts', '.css', '.scss', '.html'];

// Font-size: only replace "semantic" sizes (≤ 2.2rem). Larger values (3rem+)
// are decorative emoji sizes — leave them alone.
const FONT_SIZE_MAP = {
  '2.2rem': 'var(--lgui-fs-display)',
  '1.8rem': 'var(--lgui-fs-heading)',
  '1.7rem': 'var(--lgui-fs-heading)',
  '1.6rem': 'var(--lgui-fs-subheading)',
  '1.5rem': 'var(--lgui-fs-subheading)',
  '1.4rem': 'var(--lgui-fs-body-lg)',
  '1.3rem': 'var(--lgui-fs-body)',
  '1.2rem': 'var(--lgui-fs-caption)',
  '1.1rem': 'var(--lgui-fs-micro)',
  '1rem':   'var(--lgui-fs-micro)',
};

const FONT_WEIGHT_MAP = {
  '400': 'var(--lgui-fw-regular)',
  '500': 'var(--lgui-fw-medium)',
  '600': 'var(--lgui-fw-semibold)',
  '700': 'var(--lgui-fw-bold)',
};

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

// Build regex that matches font-size with optional space, captures the value.
// Handles both `font-size: 1.3rem` and `font-size:1.3rem` (inline styles).
// Uses word boundary on the rem value to avoid partial matches.
function applyFontSize(content) {
  // Sort keys longest-first so "1.3rem" is tried before "1rem"
  const sizes = Object.keys(FONT_SIZE_MAP).sort((a, b) => b.length - a.length);
  for (const size of sizes) {
    const token = FONT_SIZE_MAP[size];
    // Escape dots for regex
    const escaped = size.replace('.', '\\.');
    const re = new RegExp(`(font-size:\\s*)${escaped}(?=\\s*[;}"'\\s])`, 'g');
    content = content.replace(re, `$1${token}`);
  }
  return content;
}

function applyFontWeight(content) {
  for (const [weight, token] of Object.entries(FONT_WEIGHT_MAP)) {
    const re = new RegExp(`(font-weight:\\s*)${weight}(?=\\s*[;!}"'\\s])`, 'g');
    content = content.replace(re, `$1${token}`);
  }
  return content;
}

const files = findFiles(SRC_DIR);
let convertedCount = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  let updated = applyFontSize(original);
  updated = applyFontWeight(updated);

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
