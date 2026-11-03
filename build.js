import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* helpers */
function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function copyFile(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  ensureDir(destDir);
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    entry.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// Build to both dist and public so Vercel can serve from either folder or root
const targetDirs = [path.join(__dirname, 'dist'), path.join(__dirname, 'public')];

for (const out of targetDirs) {
  ensureDir(out);

  // Root static files
  ['index.html', 'style.css', 'script.js', 'metadata.json', 'vercel.json'].forEach(f =>
    copyFile(path.join(__dirname, f), path.join(out, f))
  );

  // Assets and modular sources
  copyDir(path.join(__dirname, 'src'), path.join(out, 'src'));
  copyDir(path.join(__dirname, 'assets'), path.join(out, 'assets'));
}

console.log('Build complete → dist/ and public/ ready');
