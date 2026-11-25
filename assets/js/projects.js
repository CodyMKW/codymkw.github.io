// The project shelf. Add a project by adding one object here.
// path   – URL path on this site (or a full URL)
// cat    – one of the keys in CATEGORIES
// hidden – true keeps it in the data but off the shelf

export const CATEGORIES = {
  nintendo: { label: 'Nintendo', color: 'var(--red)' },
  tools: { label: 'Tools', color: 'var(--blue)' },
  games: { label: 'Games', color: 'var(--yellow)' },
  stories: { label: 'Stories', color: 'var(--violet)' },
};

export const PROJECTS = [
  // Nintendo
  { name: 'Town Ledger', path: '/town-ledger/', icon: '🍃', cat: 'nintendo', desc: 'Animal Crossing (GameCube) save editor that runs in your browser.' },
  { name: 'NDSWeb', path: '/ndsweb/', icon: '📱', cat: 'nintendo', desc: 'Browser emulator launcher with NES and SNES support, rotate, and Player 2 over P2P.' },
  { name: 'Nincfg Editor', path: '/nincfg-editor/', icon: '⚙️', cat: 'nintendo', desc: 'Edit Nintendont’s nincfg.bin without a hex editor.' },
  { name: 'Bootscreen', path: '/bootscreenNintendo/', icon: '🖥️', cat: 'nintendo', desc: 'Bootscreen generator.' },
  { name: '3DS Media Manager', path: '/3dsMediaManager/', icon: '📷', cat: 'nintendo', desc: 'Manage media from your 3DS.' },
  { name: 'Switch Gallery', path: '/switch-album-gallery/', icon: '🖼️', cat: 'nintendo', desc: 'Browse and share Switch screenshots and videos peer to peer.', hidden: true },
  { name: 'Switch Chat', path: '/switch-chat/', icon: '💬', cat: 'nintendo', desc: 'Peer-to-peer chat with live Switch presence.', hidden: true },
  { name: 'BIOS Bootscreen', path: '/bootscreen3ds/', icon: '💾', cat: 'nintendo', desc: 'Old-school PC BIOS splash screen generator.', hidden: true },

  // Tools
  { name: 'BMP Converter', path: '/bmp-converter/', icon: '🔁', cat: 'tools', desc: 'Turn 3DS BMP captures into JPGs.' },
  { name: 'Switch Intro Merger', path: '/switch-intro-merger/', icon: '🎞️', cat: 'tools', desc: 'Add the Switch or Switch 2 startup intro to your clips.' },
  { name: 'Clip Studio', path: '/clip-studio/', icon: '✂️', cat: 'tools', desc: 'Convert video clips to GIFs.' },
  { name: 'Frame Studio', path: '/frame-studio/', icon: '🪟', cat: 'tools', desc: 'Trim a GIF and add overlays.' },
  { name: 'Tag Bundles', path: '/tag-bundles/', icon: '#️⃣', cat: 'tools', desc: 'Save hashtag sets and copy them in one tap.' },
  { name: 'Blog Studio', path: '/blog-studio/', icon: '📝', cat: 'tools', desc: 'Write blog posts.' },

  // Games
  { name: 'Anime Guess', path: '/anime-guess/', icon: '🎌', cat: 'games', desc: 'Guess the anime from the clues.' },
  { name: 'Poke-A-Joseph', path: '/poke-a-joseph/', icon: '👉', cat: 'games', desc: 'Poke Joseph, Cody, and Falcon.' },
  { name: 'Blossom Drop', path: '/Our-Spring-Hours-Definitive-Edition/blossom', icon: '🌸', cat: 'games', desc: 'A Suika-style merge game set in the Spring Hours world.' },
  { name: 'MHUR Main', path: '/mhur-main/', icon: '💥', cat: 'games', desc: 'Ultra Rumble character profile.' },
  { name: 'Trade Pile', path: '/game-trade-club/', icon: '🎲', cat: 'games', desc: 'Swap games with a friend.', hidden: true },
  { name: 'Kira’s Judgement', path: '/deathnote/', icon: '📓', cat: 'games', desc: 'A Death Note game.', hidden: true },
  { name: 'Codyverse Plaza', path: '/codyverse/', icon: '🌐', cat: 'games', desc: 'Community plaza archive.', hidden: true },

  // Stories
  { name: 'Our Spring Hours: Definitive Edition', path: '/Our-Spring-Hours-Definitive-Edition/', icon: '🌅', cat: 'stories', desc: 'The complete visual novel trilogy in one place.' },
];
