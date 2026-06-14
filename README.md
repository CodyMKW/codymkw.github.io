# CodyMKW Hub

A real-time personal dashboard aggregating my gaming statistics, coding activity, and current interests. This hub serves as a central point for my digital presence, pulling live data from various APIs to display what I'm currently playing, coding, and watching.

## 🚀 Features

* **Live Console Presence:** Real-time status updates for both Nintendo Switch (via `nxapi`) and Nintendo 3DS (via `3dsrpc`).
* **Gaming Milestones:** Automatically tracks play hours for titles like *Animal Crossing: New Horizons*.
* **Code Activity:** Tracks the latest push/activity from my GitHub profile.
* **Anime Tracker:** Fetches my current progress on shows via the AniList GraphQL API.
* **Competitive Stats:** Displays the current map rotation for *My Hero Ultra Rumble* via a custom Cloudflare Worker API.
* **Responsive Design:** A clean, glass-morphism inspired UI that works on desktop and mobile.

## 🛠 Tech Stack

* **Frontend:** Vanilla HTML5, CSS3, and JavaScript (Fetch API).
* **Backend/Data:** * [Cloudflare Workers](https://workers.cloudflare.com/) (For API management and Proxying).
  * [AniList GraphQL API](https://anilist.co/).
  * [GitHub REST API](https://docs.github.com/en/rest).
  * Custom `3dsrpc` & `nxapi` integrations.

## 📝 API Credits

* **3DS Rich Presence:** Powered by my custom [3dsrpc](https://3dsrpc.codymkw.workers.dev/) worker.
* **Switch Presence:** Powered by [nxapi-presence](https://nxapi-presence.fancy.org.uk/).
* **Anime Data:** Powered by [AniList](https://anilist.co/).

## 👤 Author

* **Cody** - [codymkw.nekoweb.org](https://codymkw.nekoweb.org)

---
*Built with ❤️ for the gaming and dev community.*
