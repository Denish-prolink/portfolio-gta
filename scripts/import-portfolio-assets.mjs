import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const origin = 'https://denish-kunjadiya.vercel.app';
const assets = [
  ['/denish-kunjadiya.png', 'public/profile/denish-kunjadiya.webp'],
  ['/static/media/Denish-kunjadiya-cv.7f597d881ad6df6e8658.pdf', 'public/Denish-Kunjadiya-Resume.pdf'],
  ...Array.from({ length: 5 }, (_, index) => [`/imges/realEState/Images${index ? `-${index}` : ''}.png`, `public/projects/real-estate-${index + 1}.webp`]),
];
await mkdir('public/profile', { recursive: true });
await mkdir('public/projects', { recursive: true });
for (const [source, destination] of assets) {
  const response = await fetch(origin + source);
  if (!response.ok) throw new Error(`${source}: HTTP ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  if (destination.endsWith('.pdf')) {
    if (data.subarray(0, 5).toString() !== '%PDF-') throw new Error('Resume response is not a PDF');
    await writeFile(destination, data);
  } else {
    await sharp(data).resize({ width: 1500, withoutEnlargement: true }).webp({ quality: 88 }).toFile(destination);
  }
  console.log(`Saved ${destination}`);
}
