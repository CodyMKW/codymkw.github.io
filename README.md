# codymkw.github.io

My hub: one page that shows what I'm playing, watching, listening to, and coding right now, plus a shelf of every web tool and game I've built. Plain HTML, CSS, and JavaScript. No framework, no build step.

**Live:** https://codymkw.github.io

## What's on the page

- **A console screen of live status.** Each tile pulls from a real source and glows green with a "Live" badge when it's happening right now.
  - Nintendo Switch presence (game, hours played)
  - Nintendo 3DS presence via friend code
  - Latest GitHub activity
  - Latest anime on MyAnimeList
  - Last song on Last.fm
  - Ultra Rumble map rotation and season
  - My status.cafe status
- **A status bar** with your local time and a ping reading measured from your browser.
- **A project shelf** with category filters and search (press `/` to jump to the search box).
- **Light and dark themes.** It follows your system and remembers the toggle.
- If a source is down, its tile falls back to a plain link instead of breaking.

## Repo layout

```
.
├── index.html            The hub page
├── 404.html              Not-found page
├── assets/
│   ├── css/style.css     All hub styles and design tokens
│   ├── js/
│   │   ├── config.js     Usernames, friend codes, endpoints (edit this to make it yours)
│   │   ├── feeds.js      One loader per live source
│   │   ├── projects.js   The project shelf data
│   │   └── main.js       Clock, ping, theme, tiles, filtering
│   └── img/favicon.svg
├── fonts/                Legacy fonts, kept in place in case other pages link them
└── <project folders>/    Each tool or game is a self-contained folder with its own index.html
```

The project folders (`town-ledger/`, `clip-studio/`, `frame-studio/`, and so on) stay at the repo root on purpose. Their paths are public URLs, and several of them link back to `/`.

## Where the data comes from

| Tile | Source |
|---|---|
| GitHub | GitHub's public events API |
| Switch | [nxapi presence](https://github.com/samuelthomas2774/nxapi) |
| 3DS | A Cloudflare Worker that talks to 3DSRPC |
| Anime | MyAnimeList API through a Cloudflare Worker (for CORS) |
| Music | A public Last.fm last-played proxy |
| Ultra Rumble | A Cloudflare Worker that caches map rotation data |
| Status | status.cafe |

## Run it locally

The scripts are ES modules, so opening `index.html` straight from disk won't work. Serve the folder instead:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Common edits

| I want to… | Edit |
|---|---|
| Add or hide a project | `assets/js/projects.js`. Add an object, or set `hidden: true` to keep it off the shelf. |
| Change a username, friend code, or endpoint | `assets/js/config.js` |
| Change how a tile reads its data | `assets/js/feeds.js` |
| Change colors, fonts, or spacing | The `:root` tokens at the top of `assets/css/style.css` |

## Forking it

Swap the values in `config.js`, replace the entries in `projects.js`, and update the avatar and links in `index.html`. The 3DS, Ultra Rumble, and MyAnimeList endpoints are my own Workers, so you'll need to run your own or point those tiles at other sources.

If an upstream API changes its response shape, that one tile falls back quietly. Check the browser console (look for `[hub]` warnings) if something isn't showing up.
