import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('https://denish-kunjadiya.vercel.app/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('body').waitFor();
  const extract = () => page.evaluate(() => ({
    title: document.title,
    text: document.body.innerText,
    links: [...document.querySelectorAll('a')].map(a => ({ text: a.innerText, href: a.href, label: a.getAttribute('aria-label') })),
    images: [...document.images].map(img => ({ alt: img.alt, src: img.src })),
    buttons: [...document.querySelectorAll('button')].map(button => ({ text: button.innerText, label: button.getAttribute('aria-label') })),
  }));
  const content = await extract();
  await mkdir('reference', { recursive: true });
  await writeFile('reference/old-portfolio.json', JSON.stringify(content, null, 2));
  await page.screenshot({ path: 'reference/old-portfolio.jpg', fullPage: true });
  console.log(JSON.stringify(content, null, 2));
  for (const route of ['/about', '/project', '/contact']) {
    await page.goto(`https://denish-kunjadiya.vercel.app${route}`, { waitUntil: 'networkidle', timeout: 60000 });
    const details = await extract();
    await writeFile(`reference/old${route.replaceAll('/', '-')}.json`, JSON.stringify(details, null, 2));
    console.log(JSON.stringify({ route, ...details }, null, 2));
  }
  await page.goto('https://denish-kunjadiya.vercel.app/project', { waitUntil: 'networkidle' });
  const projectUrls = await page.locator('a[href^="/project/"]').evaluateAll(links => [...new Set(links.map(link => link.href))]);
  for (const url of projectUrls) {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    const details = await extract();
    await writeFile(`reference/old-project-${url.split('/').pop()}.json`, JSON.stringify(details, null, 2));
    console.log(JSON.stringify({ url, ...details }, null, 2));
  }
  const scripts = await page.locator('script[src]').evaluateAll(elements => elements.map(el => el.src));
  for (const [index, url] of scripts.entries()) {
    if (!url.startsWith('https://denish-kunjadiya.vercel.app/')) continue;
    const response = await page.request.get(url);
    const source = await response.text();
    await writeFile(`reference/old-script-${index}.js`, source);
    console.log(JSON.stringify({ script: url, resumeReferences: [...source.matchAll(/.{0,100}(?:\.pdf|[Rr]esume|drive\.google).{0,150}/g)].map(match => match[0]) }));
  }
} finally {
  await browser.close();
}
