import { test, expect } from '@playwright/test';

test('all nine destinations update the HUD and persist unique discoveries', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#splash')).toHaveCount(0);
  await expect(page.locator('#money')).toHaveText('$001,250');
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(9);
  for (let index = 0; index < 9; index++) {
    await tabs.nth(index).click();
    await expect(tabs.nth(index)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toHaveCount(1);
    await expect(page.locator('#current-number')).toHaveText(`0${index + 1}`);
    const art = page.locator('.art-plate.active img');
    await expect.poll(() => art.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
    if ([2, 3, 7].includes(index)) {
      await expect(page.locator('.art-plate.active')).toHaveCSS('opacity', '1');
      await page.screenshot({ path: `test-results/screen-${index + 1}.jpg`, fullPage: true });
    }
  }
  await expect(page.locator('#completion-count')).toHaveText('9 / 9');
  await expect(page.locator('#money')).toHaveText('$003,250');
  await expect(page.locator('#wanted-stars .earned')).toHaveCount(5);
  await page.reload();
  await expect(page.locator('#splash')).toHaveCount(0);
  await expect(page.getByRole('tab', { name: /Outro/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#money')).toHaveText('$003,250');
  await page.getByRole('tab', { name: /Overview/ }).click();
  await expect(page.locator('#money')).toHaveText('$003,250');
  expect(errors).toEqual([]);
});

test('keyboard controls, deep links, map and project details work', async ({ page }) => {
  await page.goto('/#projects');
  await expect(page.locator('#splash')).toHaveCount(0);
  await expect(page.locator('#screen-projects')).toBeVisible();
  await page.getByRole('button', { name: 'View Reak-E-State project' }).click();
  await expect(page.locator('#project-dialog')).toBeVisible();
  await expect(page.locator('#project-title')).toHaveText('Reak-E-State');
  await expect(page.locator('#project-gallery button')).toHaveCount(5);
  await page.getByRole('button', { name: 'View screenshot 5 of 5' }).click();
  await expect(page.locator('#project-image')).toHaveAttribute('src', '/projects/real-estate-5.webp');
  await expect(page.getByRole('button', { name: 'View screenshot 5 of 5' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('link', { name: /Visit live demo/ })).toHaveAttribute('href', 'https://real-estate-crm-demo.vercel.app/default');
  await expect(page.getByRole('link', { name: /View source code/ })).toHaveAttribute('href', 'https://github.com/Denishkunjadiya/Real-Estate.git');
  await page.keyboard.press('Escape');
  await expect(page.locator('#project-dialog')).not.toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#screen-experience')).toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.locator('#screen-hero')).toBeVisible();
  await page.keyboard.press('8');
  await expect(page.locator('#screen-contact')).toBeVisible();
  await page.getByRole('button', { name: 'Open exploration map' }).click();
  await expect(page.locator('#map-dialog')).toBeVisible();
  await page.locator('#map-dialog [data-go="skills"]').click();
  await expect(page.locator('#screen-skills')).toBeVisible();
  await expect(page.locator('#map-dialog')).not.toBeVisible();
  await page.getByRole('button', { name: 'Enable navigation sounds' }).click();
  await expect(page.getByRole('button', { name: 'Mute navigation sounds' })).toHaveAttribute('aria-pressed', 'true');
});

test('mobile layout fits, tabs scroll, and every destination remains accessible', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#splash')).toHaveCount(0);
  for (const id of ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'services', 'contact', 'outro']) {
    await page.locator(`#tab-${id}`).click();
    await expect(page.locator(`#screen-${id}`)).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (id === 'contact' || id === 'about') await page.screenshot({ path: `test-results/mobile-${id}.jpg`, fullPage: true });
  }
  await page.locator('#tab-hero').click();
  await page.screenshot({ path: 'test-results/mobile.jpg', fullPage: true });
});

test('missing art and reduced motion preserve usable content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('**/art/*.webp', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#splash')).toHaveCount(0);
  await expect(page.locator('#screen-hero h1')).toBeVisible();
  await page.getByRole('button', { name: 'Explore my work' }).click();
  await expect(page.locator('#screen-projects')).toBeVisible();
  expect(await page.locator('[data-art="projects"]').evaluate(el => getComputedStyle(el).backgroundImage)).toContain('linear-gradient');
});

test('desktop composition, local clock and contact action', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('#splash')).toHaveCount(0);
  await expect(page.locator('#live-clock')).toHaveText(/\d{2}:\d{2}:\d{2}/);
  await page.screenshot({ path: 'test-results/desktop.jpg', fullPage: true });
  await page.getByRole('button', { name: 'Let’s talk' }).click();
  await page.getByRole('button', { name: 'Copy email' }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('denishkunjadiya02@gmail.com');
  await expect(page.locator('.email-link')).toHaveAttribute('href', 'mailto:denishkunjadiya02@gmail.com');
  await expect(page.getByRole('link', { name: '+91 9054695107' })).toHaveAttribute('href', 'tel:+919054695107');
  await expect(page.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', 'https://wa.me/message/OPFGNVHU7PSBH1');
  await expect(page).toHaveTitle('Denish Kunjadiya — AFTER HOURS');
  await expect(page.locator('body')).not.toContainText('Alex Morgan');
  const download = page.waitForEvent('download');
  await page.locator('#screen-contact').getByRole('link', { name: 'Download résumé' }).click();
  expect((await download).suggestedFilename()).toBe('Denish-Kunjadiya-Resume.pdf');
  const resume = await page.request.get('/Denish-Kunjadiya-Resume.pdf');
  expect(resume.ok()).toBe(true);
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-');
});
