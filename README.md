# lol-assistant

A lightweight, self-hosted coaching tool for League of Legends. It combines official Riot Data Dragon data with a Flask backend to give you champion guides, draft advice, and real-time macro decisions — all in a clean web UI.

---

## Features

| Section | What it does |
|---|---|
| **Champion Library** | Browse all champions with splash art, abilities, roles, builds, runes, matchups and playstyle notes. Filter by name or lane. |
| **Draft Helper** | Describe your pick, lane opponent and enemy composition. Get a structured game plan tailored to that matchup. |
| **Real-time Advisor** | Input your current game state (phase, wave, vision, objective timers). Get immediate macro decisions and a build-adjustment checklist. |
| **Riot Account** | Look up any account by Riot ID + tag to retrieve summoner info, ranked stats and recent match IDs via the official Riot API. |

---

## Requirements

- Python 3.9+
- A free [Riot Developer API key](https://developer.riotgames.com/) (required only for the Account tab)

---

## Setup

**1. Clone the repository**

```bash
git clone https://github.com/j0krat/lol-assistant.git
cd lol-assistant
```

**2. Install dependencies**

```bash
pip install flask flask-cors requests python-dotenv
```

**3. Configure environment variables**

Copy the example file and add your Riot API key:

```bash
cp .env.example .env
```

Open `.env` and fill in your key:

```
RIOT_API_KEY=YOUR_RIOT_API_KEY_HERE
```

> The app runs without a key, but the **Riot Account** tab will return an error until one is set.

**4. Place the frontend files**

The Flask server serves static files from a `static/` folder. Copy the frontend there:

```
lol-assistant/
├── app.py
├── .env
└── static/
    ├── index.html
    ├── style.css
    ├── script.js
```

**5. Run the server**

```bash
python app.py
```

Open your browser at **http://localhost:5000**.

---

## API Endpoints

All endpoints are served by the Flask backend. The frontend calls them automatically — you do not need to use them directly. They are documented here for reference.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/meta` | Current Data Dragon version and server config |
| GET | `/api/champions` | Full champion list with images |
| GET | `/api/champions/<id>` | Single champion detail |
| GET | `/api/items` | Item catalogue (Summoner's Rift only) |
| GET | `/api/runes` | Rune tree data |
| POST | `/api/advisor` | Macro recommendation for a game state |
| POST | `/api/chat` | Plain-text coaching fallback |
| GET | `/api/riot/account` | Account PUUID by Riot ID + tag |
| GET | `/api/riot/summoner` | Summoner info by PUUID |
| GET | `/api/riot/ranked` | Ranked entries by summoner ID |
| GET | `/api/riot/matches` | Recent match IDs by PUUID |
| GET | `/api/riot/match/<id>` | Full match detail |

Supported `locale` query parameter for champion/item/rune endpoints: `es_ES` (default), `en_US`, and any locale supported by Data Dragon.

Supported regions: `LA1`, `LA2`, `NA1`, `EUW1`, `EUN1`, `KR`, `BR1`, `JP1`.

---

## How to use it

### Champion Library

1. Go to the **Campeones / Champions** tab.
2. Use the search box to find a champion by name, role or class.
3. Filter by lane with the dropdown on the right.
4. Click any card to open the full guide: abilities, favorable matchups, counters, recommended build and playstyle notes.
5. External links to OP.GG, LeagueOfGraphs and YouTube are included at the bottom of each guide for patch-specific research.

### Draft Helper

1. Go to the **Draft** tab.
2. Select your champion and role.
3. Type the enemy laner in the **Lane opponent** field.
4. Select the biggest threat in the enemy team from the dropdown.
5. Describe the full enemy composition in the text area (e.g. `Malphite, Jarvan, Orianna, Jinx, Lulu`).
6. Click **Generate draft plan**. The tool returns build adjustments, win conditions and key matchup notes.

### Real-time Advisor

Use this during a game or in review.

1. Go to the **Tiempo real / Real-time** tab.
2. Fill in your current champion, role and game phase.
3. Set wave state, vision level, next objective and your current game state (winning / even / losing).
4. Add any extra context in the free text area (e.g. `Dragon in 50s, I have flash, enemy mid MIA`).
5. Click **Request decision**. You get an immediate priority action, build logic and a macro checklist.

### Riot Account

1. Go to the **Cuenta Riot / Riot Account** tab.
2. Enter the **Riot ID** (display name), the **TAG** (e.g. `LAS`, `NA1`) and select the region.
3. Click **Query account**. The app returns summoner info, ranked tier and a list of recent match IDs.

> Requires `RIOT_API_KEY` to be set in your `.env` file.

---

## Data sources

- **Champion data, abilities, images**: [Riot Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon) — official, always up to date with the latest patch.
- **Account and match history**: [Riot Games API](https://developer.riotgames.com/) — official, requires a personal API key.
- **Build and rune suggestions**: curated in `data.js` for the six featured champions; Data Dragon for the full roster.
- **External research links**: OP.GG, LeagueOfGraphs and YouTube are linked per champion but no data is scraped from them.

Champion data is cached in memory for **6 hours** to avoid redundant requests to Data Dragon.

---

## Project structure

```
lol-assistant/
├── app.py          # Flask backend: routes, Riot API proxy, advisor logic
├── .env            # Your secrets (not committed)
├── .env.example    # Template for .env
├── .gitignore
└── static/
    ├── index.html  # App shell and page layout
    ├── style.css   # All styles (dark LoL theme)
    ├── script.js   # Frontend logic: routing, API calls, rendering
```

---

## License

This project is not affiliated with or endorsed by Riot Games. League of Legends and all related assets are property of Riot Games, Inc. Use of the Riot API is subject to the [Riot Games Developer Terms of Service](https://developer.riotgames.com/terms).
