/**
 * Download Simple Icons SVGs using the npm `simple-icons` package.
 * Extracts SVG paths and generates colored SVGs for local use.
 * 
 * Usage: node scripts/download-icons.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.resolve(__dirname, '../public/icons');

// Icons config: exportName (from simple-icons), color, and output filename
const icons = [
  { key: 'siReact', color: '#61DAFB', file: 'react.svg' },
  { key: 'siNextdotjs', color: '#ffffff', file: 'nextjs.svg' },
  { key: 'siAstro', color: '#FF5D01', file: 'astro.svg' },
  { key: 'siSvelte', color: '#FF3E00', file: 'svelte.svg' },
  { key: 'siNodedotjs', color: '#5FA04E', file: 'nodejs.svg' },
  { key: 'siSupabase', color: '#3FCF8E', file: 'supabase.svg' },
  { key: 'siPostgresql', color: '#4169E1', file: 'postgresql.svg' },
  { key: 'siTailwindcss', color: '#06B6D4', file: 'tailwindcss.svg' },
  { key: 'siTypescript', color: '#3178C6', file: 'typescript.svg' },
  { key: 'siFastapi', color: '#009688', file: 'fastapi.svg' },
  { key: 'siOpenstreetmap', color: '#7EBC6F', file: 'openstreetmap.svg' },
  { key: 'siLeaflet', color: '#199900', file: 'leaflet.svg' },
  { key: 'siVite', color: '#646CFF', file: 'vite.svg' },
  { key: 'siFramer', color: '#0055FF', file: 'framer.svg' },
  { key: 'siVercel', color: '#ffffff', file: 'vercel.svg' },
  { key: 'siFigma', color: '#F24E1E', file: 'figma.svg' }
];

async function downloadIcons() {
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  console.log(`🔄 Mengimpor ikon dari simple-icons package...\n`);

  const siModule = await import('simple-icons');

  let successCount = 0;

  for (const icon of icons) {
    const siIcon = siModule[icon.key];

    if (siIcon && siIcon.svg) {
      const coloredSvg = siIcon.svg.replace('<svg', `<svg fill="${icon.color}"`);
      const filePath = path.join(ICONS_DIR, icon.file);
      fs.writeFileSync(filePath, coloredSvg, 'utf8');
      successCount++;
      console.log(`  ✅ ${icon.file} (${siIcon.title})`);
    } else {
      console.error(`  ❌ ${icon.file} — key "${icon.key}" tidak ditemukan`);
    }
  }

  console.log(`\n🎉 Selesai! ${successCount}/${icons.length} ikon berhasil disimpan.`);
  console.log(`📁 Lokasi: public/icons/`);
}

downloadIcons();
