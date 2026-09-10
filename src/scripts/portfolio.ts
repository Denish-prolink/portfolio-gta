import { gsap } from 'gsap';
import type { portfolio as portfolioConfig, Screen } from '../config';

const config: typeof portfolioConfig = JSON.parse(document.querySelector('#portfolio-data')!.textContent!);
const screens: Screen[] = config.screens;
const $ = <T extends HTMLElement = HTMLElement>(selector: string) => document.querySelector<T>(selector)!;
const $$ = <T extends HTMLElement = HTMLElement>(selector: string) => [...document.querySelectorAll<T>(selector)];
const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const saveKey = 'after-hours:progress:v1';
const visited = new Set<string>();
let activeIndex = 0;
let soundsEnabled = false;
let audioContext: AudioContext | undefined;
let toastTimer: ReturnType<typeof setTimeout>;
let firstNavigation = true;

try {
  const saved: unknown = JSON.parse(localStorage.getItem(saveKey) || '[]');
  if (Array.isArray(saved)) saved.forEach(id => { if (typeof id === 'string' && screens.some(s => s.id === id)) visited.add(id); });
} catch { /* Storage can be unavailable or contain data from another version. */ }

function saveProgress() {
  try { localStorage.setItem(saveKey, JSON.stringify([...visited])); } catch { /* Exploration still works without persistence. */ }
}

function playSound() {
  if (!soundsEnabled) return;
  try {
    audioContext ??= new AudioContext();
    void audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(620, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(830, audioContext.currentTime + .065);
    gain.gain.setValueAtTime(.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .1);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .11);
  } catch { /* Audio is an optional enhancement. */ }
}

function showToast(title: string, message: string) {
  clearTimeout(toastTimer);
  $('#toast-title').textContent = title;
  $('#toast-message').textContent = message;
  gsap.killTweensOf('#toast');
  gsap.to('#toast', { opacity: 1, y: 0, duration: motionQuery.matches ? 0 : .3 });
  toastTimer = setTimeout(() => gsap.to('#toast', { opacity: 0, y: -8, duration: motionQuery.matches ? 0 : .3 }), 3100);
}

function updateProgress() {
  const count = visited.size;
  const level = Math.min(5, Math.ceil(count * 5 / screens.length));
  const balance = config.startMoney + Math.max(0, count - 1) * config.discoveryReward;
  $('#money').textContent = '$' + String(balance).padStart(6, '0').replace(/(\d{3})$/, ',$1');
  $('#wanted-stars').setAttribute('aria-label', `Exploration level ${level} of 5`);
  $$('#wanted-stars span').forEach((star, i) => star.classList.toggle('earned', i < level));
  $('#completion-count').textContent = `${count} / ${screens.length}`;
  $('#completion-bar').style.width = `${count / screens.length * 100}%`;
  $$('.chapter-dots button').forEach(dot => dot.classList.toggle('visited', visited.has(dot.dataset.go!)));
  $$('[data-visited]').forEach(item => {
    const done = visited.has(item.dataset.visited!);
    item.textContent = done ? 'DISCOVERED' : 'UNEXPLORED';
    item.classList.toggle('is-visited', done);
  });
}

function syncVideo() {
  $$<HTMLVideoElement>('.art-plate video').forEach(video => {
    if (video.closest('.art-plate')?.getAttribute('data-art') === screens[activeIndex].id && !document.hidden && !motionQuery.matches) {
      void video.play().catch(() => { /* The image remains visible if autoplay fails. */ });
    } else video.pause();
  });
}

function navigate(index: number, options: { focus?: boolean; history?: boolean } = {}) {
  if (index < 0 || index >= screens.length) return;
  const screen = screens[index];
  const isNew = !visited.has(screen.id);
  const changed = activeIndex !== index;
  const duration = motionQuery.matches ? 0 : .65;
  activeIndex = index;
  $$<HTMLDialogElement>('dialog[open]').forEach(dialog => dialog.close());

  $$('.screen').forEach((panel, i) => {
    panel.hidden = i !== index;
    panel.classList.toggle('active', i === index);
  });
  $$<HTMLButtonElement>('[role="tab"]').forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  const tab = $<HTMLButtonElement>(`#tab-${screen.id}`);
  if (options.focus) tab.focus({ preventScroll: true });
  if (changed) {
    const tabList = $('.tab-list');
    tabList.scrollTo({ left: tab.offsetLeft - tabList.offsetLeft - tabList.clientWidth / 2 + tab.offsetWidth / 2, behavior: motionQuery.matches ? 'instant' : 'smooth' });
  }
  gsap.to(document.documentElement, { '--accent': screen.accent, duration, overwrite: true });
  $$('.art-plate').forEach((art, i) => {
    art.classList.toggle('active', i === index);
    gsap.to(art, { autoAlpha: i === index ? 1 : 0, duration, overwrite: true });
    if (i === index) art.querySelector('img')?.setAttribute('loading', 'eager');
  });
  if (changed && !motionQuery.matches) {
    const content = $(`#screen-${screen.id} .screen-content`);
    gsap.fromTo(content, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: .48, ease: 'power2.out', overwrite: true });
  }
  $('#scene-location').textContent = screen.location;
  $('#scene-time').textContent = screen.time;
  $('#current-number').textContent = String(index + 1).padStart(2, '0');
  $$('.chapter-dots button').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    if (i === index) dot.setAttribute('aria-current', 'step'); else dot.removeAttribute('aria-current');
  });
  visited.add(screen.id);
  saveProgress();
  updateProgress();
  syncVideo();
  if (options.history !== false && location.hash !== `#${screen.id}`) history.pushState(null, '', `#${screen.id}`);
  if (isNew && !firstNavigation) {
    showToast(visited.size === screens.length ? 'WORLD COMPLETE' : 'MISSION PASSED', visited.size === screens.length ? 'All 9 locations discovered. Thanks for exploring.' : `${screen.label} discovered. +$${config.discoveryReward}`);
  }
  if (changed) playSound();
  firstNavigation = false;
}

$$<HTMLButtonElement>('[role="tab"]').forEach((tab, index) => tab.addEventListener('click', () => navigate(index)));
$$<HTMLButtonElement>('[data-go]').forEach(button => button.addEventListener('click', () => {
  navigate(screens.findIndex(screen => screen.id === button.dataset.go));
  $(`#screen-${screens[activeIndex].id}`).focus({ preventScroll: true });
}));

$('.identity').addEventListener('click', event => { event.preventDefault(); navigate(0); });
document.addEventListener('keydown', event => {
  const target = event.target as HTMLElement;
  if ($$('dialog[open]').length || target.closest('input, textarea, select, [contenteditable="true"]') || event.altKey || event.ctrlKey || event.metaKey) return;
  let next = activeIndex;
  if (event.key === 'ArrowRight' || event.key === ']') next = (activeIndex + 1) % screens.length;
  else if (event.key === 'ArrowLeft' || event.key === '[') next = (activeIndex - 1 + screens.length) % screens.length;
  else if (/^[1-9]$/.test(event.key)) next = Number(event.key) - 1;
  else if (event.key === 'Home' && target.matches('[role="tab"]')) next = 0;
  else if (event.key === 'End' && target.matches('[role="tab"]')) next = screens.length - 1;
  else return;
  event.preventDefault();
  navigate(next, { focus: true });
});

function navigateFromHash() {
  const index = screens.findIndex(screen => screen.id === location.hash.slice(1));
  navigate(index >= 0 ? index : 0, { history: false });
}
window.addEventListener('popstate', navigateFromHash);
window.addEventListener('hashchange', navigateFromHash);

$('#map-button').addEventListener('click', () => {
  const map = $<HTMLIFrameElement>('#location-map');
  if (!map.getAttribute('src')) map.src = map.dataset.src!;
  $<HTMLDialogElement>('#map-dialog').showModal();
});
$('#help-button').addEventListener('click', () => $<HTMLDialogElement>('#help-dialog').showModal());
$$('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog')?.close()));
$$<HTMLDialogElement>('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
}));

const projects = screens.find(screen => screen.id === 'projects')!.items!;
$$('[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[Number(button.dataset.project)];
  $('#project-title').textContent = project.title;
  $('#project-meta').textContent = project.meta;
  $('#project-description').textContent = project.description || '';
  const image = $<HTMLImageElement>('#project-image');
  image.src = project.gallery?.[0]?.src || project.image || '';
  image.alt = project.gallery?.[0]?.alt || `${project.title} screenshot`;
  $('#project-gallery').replaceChildren(...(project.gallery || []).map((shot, index) => {
    const thumbnail = document.createElement('button');
    thumbnail.type = 'button';
    thumbnail.setAttribute('aria-label', `View screenshot ${index + 1} of ${project.gallery!.length}`);
    thumbnail.setAttribute('aria-pressed', String(index === 0));
    const preview = document.createElement('img');
    preview.src = shot.src;
    preview.alt = '';
    thumbnail.append(preview);
    thumbnail.addEventListener('click', () => {
      image.src = shot.src;
      image.alt = shot.alt;
      $$('#project-gallery button').forEach(button => button.setAttribute('aria-pressed', String(button === thumbnail)));
    });
    return thumbnail;
  }));
  $('#project-features').replaceChildren(...(project.features || []).map(feature => {
    const item = document.createElement('li');
    item.textContent = feature;
    return item;
  }));
  $('#project-links').replaceChildren(...(project.links || []).map((link, index) => {
    const anchor = document.createElement('a');
    anchor.className = `button ${index === 0 ? 'primary' : 'secondary'}`;
    anchor.href = link.href;
    anchor.textContent = link.label + ' ↗';
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    return anchor;
  }));
  $('#project-tags').replaceChildren(...(project.tags || []).map(tag => { const span = document.createElement('span'); span.textContent = tag; return span; }));
  $<HTMLDialogElement>('#project-dialog').showModal();
}));

$('#copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(config.email);
    showToast('READY TO CONNECT', 'Email address copied to your clipboard.');
  } catch {
    showToast('LET’S CONNECT', `Write to ${config.email}`);
  }
});

$('#sound-button').addEventListener('click', () => {
  soundsEnabled = !soundsEnabled;
  const button = $('#sound-button');
  button.setAttribute('aria-pressed', String(soundsEnabled));
  button.setAttribute('aria-label', soundsEnabled ? 'Mute navigation sounds' : 'Enable navigation sounds');
  button.querySelector('path')?.setAttribute('d', soundsEnabled ? 'M11 5 6 9H3v6h3l5 4V5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14' : 'M11 5 6 9H3v6h3l5 4V5Zm5 4 5 6m0-6-5 6');
  button.style.color = soundsEnabled ? 'var(--accent)' : '';
  playSound();
});

$('#fullscreen-button').addEventListener('click', async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else showToast('FULLSCREEN UNAVAILABLE', 'Your browser does not support fullscreen mode.');
  } catch { showToast('FULLSCREEN UNAVAILABLE', 'Try opening the portfolio in its own browser tab.'); }
});
document.addEventListener('fullscreenchange', () => $('#fullscreen-button').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'));

function updateClock() {
  const clock = $<HTMLTimeElement>('#live-clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('en-GB', { hour12: false });
  clock.dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);
document.addEventListener('visibilitychange', () => { syncVideo(); if (!document.hidden) updateClock(); });
motionQuery.addEventListener('change', syncVideo);

// Missing images leave the configured gradient visible.
$$<HTMLImageElement>('.art-plate img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
  if (img.complete && !img.naturalWidth) img.style.display = 'none';
});
navigateFromHash();

async function finishLoading() {
  const progress = { value: 0 };
  const update = () => { $('#splash-progress').style.width = `${progress.value}%`; $('#splash-percent').textContent = `${Math.round(progress.value)}%`; };
  const heroImage = $<HTMLImageElement>('.art-plate img');
  const imageReady = heroImage.complete ? Promise.resolve() : new Promise<void>(resolve => {
    heroImage.addEventListener('load', () => resolve(), { once: true });
    heroImage.addEventListener('error', () => resolve(), { once: true });
  });
  const fontsReady = document.fonts.ready.catch(() => undefined);
  gsap.to(progress, { value: 85, duration: motionQuery.matches ? 0 : .75, onUpdate: update });
  await Promise.race([Promise.all([imageReady, fontsReady]), new Promise(resolve => setTimeout(resolve, 2500))]);
  gsap.killTweensOf(progress);
  gsap.to(progress, { value: 100, duration: motionQuery.matches ? 0 : .25, onUpdate: update, onComplete: () => {
    gsap.to('#splash', { autoAlpha: 0, duration: motionQuery.matches ? 0 : .4, delay: motionQuery.matches ? 0 : .1, onComplete: () => $('#splash').remove() });
  } });
}
void finishLoading();
