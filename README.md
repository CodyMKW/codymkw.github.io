# codymkw.github.io

My personal little corner of the internet — a single-page dashboard that pulls together what I'm currently playing, watching, listening to, and coding into one page. No frameworks, no build step, no backend beyond a couple of tiny Cloudflare Workers. Just one HTML file doing its thing.

## What is this exactly

Basically I got tired of having my "presence" scattered across GitHub, Switch, 3DS, MyAnimeList, Last.fm, and Ultra Rumble with no single place to actually show any of it off. So this page just fetches from all of those on load and lays it out like a little live status board. If you land on it, you can see in about two seconds whether I'm currently playing something, what I last watched, what's stuck in my head music-wise, and what I've been coding lately.

Everything is client-side — the page hits each API directly in the browser, no server rendering, no database, nothing to maintain besides the two Workers that proxy the 3DS and Ultra Rumble stuff (since those don't have public browser-friendly APIs on their own).

## What's actually on it

- **A profile card** with an auto-calculated age (does the math off my real birthday so I never have to remember to update it) and a greeting that changes depending on what time it is for whoever's visiting
- **A "what I'm up to" feed** that live-pulls:
  - My latest GitHub activity (commit, repo, what kind of action it was)
  - Whether I'm online on Switch right now, and what I'm playing
  - Same deal but for 3DS, via a friend-code lookup
  - My most recently watched anime on MyAnimeList
  - Whatever I last had playing on Last.fm
  - Current Ultra Rumble map rotation and season info
  - A little status.cafe blurb if I've set one
- **Green glow + pulsing dot** on the Switch/3DS cards specifically when I'm actually online right now, so you can tell "live" apart from "last seen"
- **Shimmer/skeleton loading** on every row while it's fetching, so it doesn't just look broken for a second
- **A grid of links** to a bunch of the other random web tools and projects I've built (converters, editors, little games, whatever)
- Everything fails gracefully — if any one API is down or rate-limited, that row just falls back to a generic "check out my profile" link instead of looking broken

## How it's built

Plain HTML/CSS/JS, no dependencies, no bundler. All the live data comes from:

| What | Where from |
|---|---|
| GitHub activity | GitHub's public events API |
| Switch presence | [nxapi](https://github.com/samuelthomas2774/nxapi) |
| 3DS presence | a Worker I run that talks to 3DSRPC |
| Anime | MyAnimeList's API (via a Worker to dodge CORS) |
| Music | Last.fm, through a public last-played proxy |
| Ultra Rumble | a Worker I run that scrapes/caches map rotation data |
| Status | status.cafe |

The two Workers exist purely because those two APIs won't play nice with being called directly from a browser (CORS, auth, etc.) — everything else just gets fetched straight from the client.

## Tweaking it for yourself

If you want to fork this for your own hub, basically everything you'd want to change lives right at the top of the relevant `fetch()` calls in the `<script>` — swap out usernames/friend codes/worker URLs and you're most of the way there. The birthday used for the level badge is just a plain `Date` near the top of the script too.

## Heads up

- The 3DS and Ultra Rumble Workers are mine specifically, so if you're forking this you'll need to stand up your own or point at different data sources for those two
- No dependencies means no dependency hell, but also means if an upstream API changes its response shape, that one card just breaks quietly instead of loudly — check the console if something's not showing up right
