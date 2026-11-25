// Each feed fetches one source and returns a normalized tile:
//   { title, sub, img?, href?, live?, dimmed? }
// A feed throws if its source is unavailable; main.js then shows the fallback.

import { ENDPOINTS, LINKS } from './config.js';

async function getJSON(url, timeout = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export const feeds = {
  github: {
    fallback: { title: 'My GitHub profile', sub: 'See what I’m working on', href: LINKS.github },
    async load() {
      const data = await getJSON(ENDPOINTS.github);
      const latest = data?.[0];
      if (!latest) throw new Error('no events');
      const verbs = { PushEvent: 'Pushed to', WatchEvent: 'Starred', CreateEvent: 'Created', ForkEvent: 'Forked' };
      return {
        title: latest.repo.name,
        sub: `${verbs[latest.type] || 'Active in'} this repository`,
        href: `https://github.com/${latest.repo.name}`,
      };
    },
  },

  switch: {
    fallback: { title: 'Switch status unavailable', sub: 'Couldn’t reach the presence API', dimmed: true },
    async load() {
      const data = await getJSON(ENDPOINTS.switch);
      if (!data?.friend) throw new Error('no friend');
      const f = data.friend;
      const p = f.presence;
      if (p?.state === 'ONLINE' && p.game) {
        const hours = Math.floor((p.game.totalPlayTime || 0) / 60);
        return {
          title: p.game.name || 'Playing something on Switch',
          sub: `Online now • ${hours.toLocaleString()}+ hrs played`,
          img: p.game.imageUri || f.imageUri,
          live: true,
        };
      }
      return { title: 'Currently offline', sub: 'Not on the Switch right now', img: f.imageUri, dimmed: true };
    },
  },

  ds: {
    fallback: { title: '3DS status unavailable', sub: 'Couldn’t reach the presence API', dimmed: true },
    async load() {
      const data = await getJSON(ENDPOINTS.ds);
      if (!data) throw new Error('no data');
      const href = data.profileUrl || LINKS.ds;
      if (data.isOnline) {
        return {
          title: data.currentGame || 'Playing on 3DS',
          sub: data.currentGameActivity || 'Online right now',
          img: data.currentGameImage || data.miiImage,
          href,
          live: true,
        };
      }
      return {
        title: data.statusMessage || 'Currently offline',
        sub: data.favoriteGame ? `Favorite: ${data.favoriteGame}` : '3DS is turned off',
        img: data.miiImage,
        href,
        dimmed: true,
      };
    },
  },

  anime: {
    fallback: { title: 'MyAnimeList profile', sub: 'See my watch list', href: LINKS.anime },
    async load() {
      const data = await getJSON(ENDPOINTS.anime);
      const item = data?.data?.[0];
      if (!item) throw new Error('no entries');
      const { node, list_status: st } = item;
      const statuses = {
        watching: 'Watching right now',
        completed: 'Finished watching',
        on_hold: 'On hold',
        dropped: 'Dropped',
        plan_to_watch: 'Planning to watch',
      };
      let sub = statuses[st.status] || st.status;
      if (st.is_rewatching) sub += ' • Rewatching';
      if (st.num_episodes_watched > 0) sub += ` • Ep ${st.num_episodes_watched}`;
      return {
        title: node.alternative_titles?.en || node.title,
        sub,
        img: node.main_picture?.large || node.main_picture?.medium,
        href: `https://myanimelist.net/anime/${node.id}`,
        live: st.status === 'watching',
      };
    },
  },

  music: {
    fallback: { title: 'Last.fm profile', sub: 'See what I’ve been listening to', href: LINKS.music },
    async load() {
      const data = await getJSON(ENDPOINTS.music);
      const t = data?.track;
      if (!t) throw new Error('no track');
      const art = t.image?.find((i) => i.size === 'extralarge')?.['#text'] || t.image?.find((i) => i.size === 'large')?.['#text'];
      const artist = t.artist?.['#text'];
      const album = t.album?.['#text'];
      return {
        title: artist ? `${t.name} — ${artist}` : t.name,
        sub: `Last listened • ${album || artist || 'Last.fm'}`,
        img: art,
        href: t.url || LINKS.music,
      };
    },
  },

  rumble: {
    fallback: { title: 'Ultra Rumble maps', sub: 'Couldn’t grab the map data right now', href: LINKS.rumble },
    async load() {
      const data = await getJSON(ENDPOINTS.rumble);
      if (!data?.maps) throw new Error('no maps');
      const ranked = data.maps.find((m) => m.mode === 'Ranked Match') || data.maps[0];
      const casual = data.maps.find((m) => m.mode === 'Standard Match' || m.mode === 'Casual Match');
      const season = data.season?.name || 'Active season';
      const left = data.timeLeft || data.rotation_left;
      let sub = season;
      if (left) sub += ` • ${left} left`;
      else if (data.event) sub += ` • Event: ${data.event.name || data.event}`;
      else sub += ' • Rotation live';
      return {
        title: casual && casual.map !== ranked.map ? `Ranked: ${ranked.map} | Casual: ${casual.map}` : ranked.map,
        sub,
        img: ranked.image,
      };
    },
  },

  status: {
    fallback: { title: 'No status set', sub: 'status.cafe', href: LINKS.status },
    async load() {
      const data = await getJSON(ENDPOINTS.status);
      if (!data?.content) throw new Error('empty');
      return {
        title: `${data.face ? data.face + ' ' : ''}${data.content}`,
        sub: data.timeAgo || 'status.cafe',
      };
    },
  },
};
