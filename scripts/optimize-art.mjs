import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const directory = new URL('../art-source/', import.meta.url);
const destination = new URL('../public/art/', import.meta.url);
for (const file of await readdir(directory)) {
  if (!file.endsWith('.png')) continue;
  const input = new URL(file, directory);
  const output = new URL(file.replace(/\.png$/, '.webp'), destination);
  await sharp(fileURLToPath(input)).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 84 }).toFile(fileURLToPath(output));
  console.log(`Optimized ${file}`);
}
