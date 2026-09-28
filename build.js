import fs   from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, 'dist');

/* helpers */
function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true }); }
function copyFile(src, dest) {
  if (!fs.existsSync(src)) { console.warn('  SKIP (missing):', src); return; }
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

ensureDir(dist);

// Root static files
['index.html', 'style.css', 'script.js', 'metadata.json', 'vercel.json'].forEach(f =>
  copyFile(path.join(__dirname, f), path.join(dist, f))
);

// ES module sources
copyDir(path.join(__dirname, 'src'),    path.join(dist, 'src'));
// Assets (images + video)
copyDir(path.join(__dirname, 'assets'), path.join(dist, 'assets'));
// Public
copyDir(path.join(__dirname, 'public'), path.join(dist, 'public'));

console.log('Build complete → dist/');
