// Everything you'd change to make this hub yours lives in this file.

export const PROFILE = {
  name: 'CodyMKW',
  birthday: '1991-01-17T00:00:00', // used for the "Lv." badge
  mainSite: 'https://codymkw.nekoweb.org',
  avatar: 'https://www.gravatar.com/avatar/5127de8a3a295a02ff3fc55bb6b2fabe?s=512',
};

export const ENDPOINTS = {
  github: 'https://api.github.com/users/CodyMKW/events/public',
  switch: 'https://nxapi-presence.fancy.org.uk/api/presence/644cd5195d154bd5?include-splatoon3=1',
  ds: 'https://3dsrpc.codymkw.workers.dev/?fc=3189-0001-4178&network=pretendo',
  anime: 'https://mal.codymkw.workers.dev/v2/users/CodyMKW/animelist?sort=list_updated_at&limit=1&fields=list_status,alternative_titles',
  music: 'https://lastfm-last-played.biancarosa.com.br/CodyMKW/latest-song',
  rumble: 'https://ultrarumble-api.codymkw.workers.dev',
  status: 'https://status.cafe/users/codymkw/status.json',
};

export const LINKS = {
  github: 'https://github.com/CodyMKW',
  switch: 'https://github.com/samuelthomas2774/nxapi',
  ds: 'https://3dsrpc.com',
  anime: 'https://myanimelist.net/profile/CodyMKW',
  music: 'https://www.last.fm/user/CodyMKW',
  rumble: 'https://ultrarumble.com',
  status: 'https://status.cafe/users/codymkw',
};

// Used to measure "ping" — a tiny image request.
export const PING_URL = 'https://www.gravatar.com/avatar/5127de8a3a295a02ff3fc55bb6b2fabe?s=1';
