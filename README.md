# CodyMKW Hub

A real-time, high-performance personal telemetry dashboard aggregating live gaming metrics, coding milestones, and media tracking. Designed with a sleek, modern glassmorphic interface, this hub serves as a central hub for my digital presence, utilizing multiple API streams to showcase active stats dynamically.

## 🚀 Features

* **Automated Level System:** Dynamically computes and displays my current "Lv." metric based on my real birthdate (January 17, 1991), removing the need for manual updates.
* **Temporal Greeting Engine:** Context-aware sub-headers automatically detect the visitor's localized time zone to offer distinct morning, afternoon, or evening greetings.
* **Live Operational Glow:** Status cards for the Nintendo Switch and Nintendo 3DS feature responsive glow behaviors that automatically activate when the console state switches to active/online.
* **Curated Specialty Tags:** Micro-badges emphasizing focus fields: *Splatoon*, *Animal Crossing*, *Ultra Rumble*, and *Web Dev*.
* **Multi-Platform Live Data Feeds:**
    * **GitHub Activity:** Fetches the single most recent public event, rendering accurate commit, repository names, and tracking contexts.
    * **Switch Presence:** Displays current real-time software titles and total lifetime hour logs via `nxapi`.
    * **3DS Presence:** Leverages the custom `3DSRPC` ecosystem to broadcast active hand-held operations, Mii assets, and game states.
    * **AniList Tracking:** Pulls watch state logs, episode increments, and high-fidelity cover art from the AniList GraphQL engine.
    * **Ultra Rumble Rotation:** An enhanced parser checking for split matchmaking brackets (Ranked vs. Casual), remaining cycle timers (`timeLeft`), or active seasonal milestones.

## 🛠 Tech Stack & Integrations

* **Frontend:** Responsive vanilla HTML5, procedural CSS3 variables, and raw asynchronous JavaScript (Fetch API Engine).
* **Data Pipelines:**
    * [AniList GraphQL API Core](https://anilist.co/)
    * [GitHub Public Event Stream REST API](https://docs.github.com/en/rest)
    * [3DSRPC Telemetry Engine](https://3dsrpc.com)
    * Custom *My Hero Ultra Rumble* API infrastructure.

## 📝 Link References & Credits

* **Main Project Dashboard:** Hosted via [codymkw.nekoweb.org](https://codymkw.nekoweb.org)
* **Switch Telemetry Base:** Built using framework concepts from [samuelthomas2774/nxapi](https://github.com/samuelthomas2774/nxapi)
* **Ultra Rumble Resource Hub:** Connected with references from [ultrarumble.com](https://ultrarumble.com)

---
*Built for the competitive gaming and development community.*
