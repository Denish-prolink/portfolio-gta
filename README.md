# Denish Kunjadiya — After Hours

A portfolio that feels like a console pause menu. Nine illustrated destinations, a live HUD, and a little reward for taking the scenic route. Built with Astro, TypeScript, and GSAP. Fully static; no account, database, or server required.

## Launch

Use Node.js 18.20.8, Node 20.3+, or Node 22+.

```sh
npm install
npm run dev
```

Open the local address printed in your terminal. For a production build:

```sh
npm run build
npm run preview
```

Deploy the `dist/` directory to any static host. The build command is `npm run build`; the output directory is `dist`. This template uses root-relative asset paths, so deploy at the root of a domain or subdomain. For subdirectory hosting, configure Astro's `base` and prefix the asset paths in the config accordingly.

## Make it yours

Edit **`src/config.ts`**. This is the only file you need for routine content updates:

- Name, role, brand, location, contact email, social links, availability, and headline statistics.
- Every screen's label, two-line heading, introduction, location caption, accent, and gradient fallback.
- Skills, proficiency meters, projects and their detail descriptions, experience, achievements, and services.
- Background image and optional video paths.
- Starting balance and exploration reward.

Personal content is migrated from Denish Kunjadiya's existing portfolio. The config includes his MERN stack profile, full skills list, six services, qualifications, contact details, working social links, and Reak-E-State project with screenshots, live demo, and source code. His portrait and résumé are served locally. See **CONTENT-SOURCES.md** for migration notes. Contact buttons use email, phone, and profile links; there is no form backend.

## Art plates and video

Nine original AI-generated illustrations are included in `art-source/`. The site uses optimized WebP versions in `public/art/`, totaling about 1.3 MB for all nine images. Run `node scripts/optimize-art.mjs` to regenerate the WebP files. See **`PROMPTS.md`** for the complete reusable art direction system and scene prompts.

To replace an image, place it in `public/art/` and update the corresponding screen's `image` path. Aim for a landscape image with quiet space on the left and details on the right. Every screen has a CSS gradient fallback if its image is missing or fails to load.

To add a video loop:

```ts
image: '/art/hero.webp',
video: '/art/hero-loop.mp4',
```

Videos are muted and loop only while their screen is active and the browser tab is visible. Reduced-motion preferences keep the still image instead. Failed autoplay also leaves the still image visible.

## Explore

- Click a section, use the arrow keys or brackets, or press `1`–`9`.
- Use `Tab` to move between controls. Menu tabs use standard roving focus; `Home` and `End` jump to the first and last section.
- Open the minimap to choose a destination and see discovered locations.
- Select a project for its details. `Escape` closes dialogs.
- Toggle the speaker for subtle synthesized navigation sounds. Audio is off by default.
- Use the expand button for fullscreen, where supported by your browser.

The clock uses the visitor's system time. Stars reflect the number of distinct screens explored. The money counter starts at the configured balance and awards the discovery reward for every new screen after the first. Progress saves under `after-hours:progress:v1` in localStorage. Revisiting a screen does not award duplicate money. If storage is blocked, exploration continues for the current session.

Reduced-motion preferences disable animated transitions, minimap animations, and video playback. Native dialogs provide focus trapping and Escape behavior. Without JavaScript, the content is shown as a long page.

## Checks

```sh
npm run build
npx playwright install chromium
npm test
```

The browser checks cover navigation, saved progress, project dialogs, keyboard controls, mobile overflow, and gradient fallbacks. Fonts are bundled locally; the deployed site makes no font-service requests.

### Dependency compatibility

Astro 5 is retained for the requested Node 18 compatibility. Its dependency tree currently reports upstream security advisories in `npm audit`; a clean audit is not claimed. This project builds trusted local content and images into static files, with no deployed Astro server or image endpoint. Reassess the dependencies before adding server rendering, processing untrusted images, or accepting untrusted template content. Moving to current major versions also requires a newer Node.js runtime.

Inspired by arcade and console pause-menu interfaces. Not affiliated with any game or publisher.
