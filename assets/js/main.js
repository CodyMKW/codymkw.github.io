import { PROFILE, PING_URL } from './config.js';
import { feeds } from './feeds.js';
import { CATEGORIES, PROJECTS } from './projects.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ── Greeting, level, clock ─────────────────────────────── */
function initProfile() {
  const now = new Date();
  const b = new Date(PROFILE.birthday);
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  $('#level').textContent = `Lv. ${age}`;

  const h = now.getHours();
  $('#greeting').textContent =
    h < 12 ? 'Good morning. Hope your day’s off to a great start.'
    : h < 18 ? 'Good afternoon. Thanks for stopping by.'
    : 'Good evening. Hope you’re having a chill night.';

  const clock = $('#clock');
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  tick();
  setInterval(tick, 1000);
}

/* ── Ping (status bar signal) ───────────────────────────── */
function initPing() {
  const label = $('#ping');
  const bars = $('#signal');
  async function probe() {
    const t0 = performance.now();
    try {
      await fetch(`${PING_URL}&t=${Date.now()}`, { cache: 'no-store', mode: 'no-cors' });
      const ms = Math.round(performance.now() - t0);
      label.textContent = `${ms} ms`;
      bars.dataset.level = ms < 120 ? '3' : ms < 300 ? '2' : '1';
    } catch {
      label.textContent = 'offline';
      bars.dataset.level = '0';
    }
  }
  probe();
  setInterval(probe, 8000);
}

/* ── Copy link ──────────────────────────────────────────── */
function initCopy() {
  const btn = $('#copy-link');
  const original = btn.textContent;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      btn.textContent = 'Link copied';
    } catch {
      btn.textContent = 'Copy failed';
    }
    setTimeout(() => (btn.textContent = original), 2000);
  });
}

/* ── Theme toggle (system by default, remembers choice) ─── */
function initTheme() {
  const root = document.documentElement;
  const btn = $('#theme-toggle');
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch {}
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const sync = () => btn.setAttribute('aria-pressed', String(isDark()));
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch {}
    sync();
  });
}

/* ── Live tiles ─────────────────────────────────────────── */
function paintTile(tile, data) {
  const title = $('.tile-title', tile);
  const sub = $('.tile-sub', tile);
  const art = $('.tile-art', tile);

  title.textContent = data.title;
  title.classList.remove('skeleton');
  sub.textContent = data.sub;

  if (data.href) tile.href = data.href;
  tile.classList.toggle('is-live', !!data.live);
  art.classList.toggle('is-dimmed', !!data.dimmed);
  $('.tile-state', tile).textContent = data.live ? 'Live' : '';

  if (data.img) {
    const img = new Image();
    img.alt = '';
    img.decoding = 'async';
    img.onload = () => art.replaceChildren(img);
    img.src = data.img;
  }
}

function initTiles() {
  $$('[data-feed]').forEach(async (tile) => {
    const feed = feeds[tile.dataset.feed];
    try {
      paintTile(tile, await feed.load());
    } catch (err) {
      console.warn(`[hub] ${tile.dataset.feed} feed failed:`, err);
      paintTile(tile, feed.fallback);
    }
  });
}

/* ── Project shelf ──────────────────────────────────────── */
function initShelf() {
  const shelf = $('#shelf');
  const chips = $('#chips');
  const search = $('#search');
  const empty = $('#empty');
  const visible = PROJECTS.filter((p) => !p.hidden);
  let activeCat = 'all';

  const counts = { all: visible.length };
  visible.forEach((p) => (counts[p.cat] = (counts[p.cat] || 0) + 1));

  const makeChip = (key, label) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.dataset.cat = key;
    b.setAttribute('aria-pressed', String(key === activeCat));
    b.textContent = `${label} ${counts[key] || 0}`;
    return b;
  };
  chips.append(makeChip('all', 'All'), ...Object.entries(CATEGORIES).map(([k, v]) => makeChip(k, v.label)));

  const cards = visible.map((p) => {
    const a = document.createElement('a');
    a.className = 'game';
    a.href = p.path;
    a.dataset.cat = p.cat;
    a.dataset.text = `${p.name} ${p.desc} ${CATEGORIES[p.cat].label}`.toLowerCase();
    a.style.setProperty('--spine', CATEGORIES[p.cat].color);

    const icon = document.createElement('span');
    icon.className = 'game-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = p.icon;

    const body = document.createElement('span');
    body.className = 'game-body';
    const name = document.createElement('strong');
    name.textContent = p.name;
    const desc = document.createElement('span');
    desc.textContent = p.desc;
    body.append(name, desc);

    a.append(icon, body);
    shelf.append(a);
    return a;
  });

  function apply() {
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((c) => {
      const ok = (activeCat === 'all' || c.dataset.cat === activeCat) && (!q || c.dataset.text.includes(q));
      c.hidden = !ok;
      if (ok) shown++;
    });
    empty.hidden = shown > 0;
  }

  chips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    activeCat = chip.dataset.cat;
    $$('.chip', chips).forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    apply();
  });
  search.addEventListener('input', apply);

  // "/" jumps to search, Esc clears it
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      search.focus();
    } else if (e.key === 'Escape' && document.activeElement === search) {
      search.value = '';
      apply();
      search.blur();
    }
  });
}

initProfile();
initPing();
initCopy();
initTheme();
initTiles();
initShelf();
