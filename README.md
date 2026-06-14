# CodyMKW // My Hub

A real-time personal dashboard aggregating live gaming activity, coding milestones, and media tracking into one sleek, glassmorphic interface. Serves as a central hub for my digital presence, pulling from multiple API streams to display live stats dynamically — with zero build steps or external dependencies.

---

## ✨ Features

- **Dynamic Level Badge** — Automatically computes my current "Lv." from my real birthdate, no manual updates needed.
- **Time-Aware Greeting** — Detects the visitor's local time to display distinct morning, afternoon, or evening messages.
- **Live Operational Glow** — Nintendo Switch and 3DS cards pulse green and highlight when the console is actively online.
- **Skeleton Shimmer Loading** — All feed rows display an animated shimmer while data is in-flight, then snap into place.
- **Real Ping Measurement** — Lightweight Gravatar fetch used to display a live latency reading.
- **Copy Page Link** — Clipboard button with a legacy `execCommand` fallback for older browsers.
- **Responsive Layout** — Two-column on desktop, single-column on mobile (≤820px breakpoint).
- **Curated Interest Tags** — Micro-badges for Splatoon, Animal Crossing, Ultra Rumble, and Web Dev.

---

## 📡 Live Data Feeds

| Feed | Source | Details |
|------|--------|---------|
| **GitHub** | `api.github.com/users/CodyMKW/events/public` | Fetches the most recent public event — commit, repo name, and action type |
| **Nintendo Switch** | `nxapi-presence.fancy.org.uk` | Displays current game title and lifetime hours via nxapi |
| **Nintendo 3DS** | `3dsrpc.codymkw.workers.dev` *(custom Worker)* | Broadcasts active game, Mii assets, and online state via 3DSRPC |
| **AniList** | `graphql.anilist.co` *(GraphQL)* | Pulls watch status, episode progress, and cover art |
| **Last.fm** | `lastfm-last-played.biancarosa.com.br` | Shows last listened track, artist, and album art |
| **Ultra Rumble** | `ultrarumble-api.codymkw.workers.dev` *(custom Worker)* | Checks Ranked vs. Casual map split, rotation timer, and active season |

All fetches are client-side. Every feed degrades gracefully — if an API call fails, a static fallback message is shown instead.

---

## 🛠️ Tech Stack

- **Frontend** — Vanilla HTML5, CSS3 custom properties, and async JavaScript (Fetch API). No frameworks, no build tools.
- **Backend** — Two custom Cloudflare Workers powering the 3DS and Ultra Rumble feeds.
- **Hosting** — Single static file, deployable to any static host.

---

## ⚙️ Customization

### Birthday / Level Badge
```js
const birthday = new Date('1991-01-17T00:00:00');
```

### Nintendo Switch Friend ID
```js
fetch('https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1')
```

### Nintendo 3DS Friend Code
```js
fetch('https://3dsrpc.codymkw.workers.dev/?fc=0645-5821-2438&network=nintendo')
```

### AniList / Last.fm Username
Replace `CodyMKW` in the AniList GraphQL query body and the Last.fm fetch URL.

### Interest Badges
Edit the four `.matrix-badge` elements in the HTML:
```html
<div class="matrix-badge"><span>🐙</span> Splatoon</div>
```

### Hub Status Label
```html
<div class="widget-value" style="color:var(--accent-green)">CHILLIN</div>
```

### Main Site Link
```html
<a href="https://codymkw.nekoweb.org" class="btn-prime">Visit My Main Site</a>
```

---

## 🎨 Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-main` | `#060913` | Page background |
| `--bg-card` | `rgba(10,15,30,0.75)` | Card backgrounds |
| `--accent-green` | `#00ff87` | Primary accent, live indicators |
| `--accent-cyan` | `#60efff` | Secondary accent, clock & ping |
| `--text-primary` | `#f0f4f8` | Main text |
| `--text-muted` | `#7e8c9a` | Labels and subtitles |

---

## 🔗 Links & Credits

- **Main Site** — [codymkw.nekoweb.org](https://codymkw.nekoweb.org)
- **Switch Presence** — Powered by [samuelthomas2774/nxapi](https://github.com/samuelthomas2774/nxapi)
- **3DS Presence** — Powered by [3DSRPC](https://3dsrpc.com)
- **Ultra Rumble Data** — Connected to [ultrarumble.com](https://ultrarumble.com)
- **AniList** — [anilist.co/user/CodyMKW](https://anilist.co/user/CodyMKW/)
- **Last.fm** — [last.fm/user/CodyMKW](https://www.last.fm/user/CodyMKW)
