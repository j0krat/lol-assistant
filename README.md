# LoL Assistant

A lightweight self-hosted coaching tool for League of Legends built with Flask, Riot Data Dragon and the optional Riot Games API.

It provides champion guides, draft recommendations, real-time macro advice, bilingual UI support and Riot account lookup in a clean web interface.

## Features

- Champion library with official images, abilities, stats and roles.
- Spanish/English language switch.
- Draft helper for matchup and team composition planning.
- Real-time decision assistant for waves, vision and objectives.
- Optional Riot account lookup with ranked stats.
- Riot Data Dragon integration for up-to-date game data.
- External research links for OP.GG, LeagueOfGraphs and YouTube.

## Requirements

- Python 3.9+
- Riot Developer API Key, optional and required only for Riot Account features.

Get a free API key from:

```text
https://developer.riotgames.com/
```

## Installation

Clone the repository:

```bash
git clone https://github.com/j0krat/lol-assistant.git
cd lol-assistant
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure environment variables:

```bash
cp .env.example .env
```

Add your Riot API key inside `.env`:

```env
RIOT_API_KEY=YOUR_RIOT_API_KEY_HERE
FLASK_DEBUG=1
```

Run the application:

```bash
python app.py
```

Open:

```text
http://127.0.0.1:5000
```

## Project Structure

```text
lol-assistant/
├── app.py
├── requirements.txt
├── .env.example
├── .gitignore
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

## API Endpoints

- `GET /api/meta`
- `GET /api/champions?locale=es_ES`
- `GET /api/champions/<champion_id>?locale=en_US`
- `GET /api/items`
- `GET /api/runes`
- `POST /api/recommendation`
- `POST /api/chat`
- `GET /api/riot/account`
- `GET /api/riot/summoner`
- `GET /api/riot/ranked`
- `GET /api/riot/matches`
- `GET /api/riot/match/<match_id>`

## Data Sources

- Riot Data Dragon
- Riot Games API

## Security

Do not commit `.env`. The repository includes `.env.example` so other users know which variables are required without exposing secrets.

## Roadmap

- [ ] Add screenshots.
- [ ] Improve matchup/counter database.
- [ ] Add persistent cache.
- [ ] Add deeper match-history analysis.
- [ ] Add deploy configuration.

## Disclaimer

This project is not affiliated with or endorsed by Riot Games. League of Legends and all related assets belong to Riot Games, Inc.
