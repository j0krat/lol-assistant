# lol-assistant

A lightweight self-hosted coaching tool for League of Legends built with Flask and Riot's official APIs.

It provides champion guides, draft recommendations, macro advice, and Riot account lookup in a clean web interface.

---

## Features

* Champion library with abilities, builds, runes, matchups and playstyle notes
* Draft helper with matchup-based recommendations
* Real-time macro advisor for live game decisions
* Riot account lookup with ranked stats and recent matches
* Riot Data Dragon integration for up-to-date game data

---

## Requirements

* Python 3.9+
* Riot Developer API Key (optional, required for Riot Account features)

Get a free API key from:
https://developer.riotgames.com/

---

## Installation

### Clone the repository

```bash
git clone https://github.com/j0krat/lol-assistant.git
cd lol-assistant
```

### Install dependencies

```bash
pip install flask flask-cors requests python-dotenv
```

### Configure environment variables

```bash
cp .env.example .env
```

Add your Riot API key inside `.env`:

```env
RIOT_API_KEY=YOUR_API_KEY
```

---

## Project Structure

```text
lol-assistant/
├── app.py
├── .env.example
├── .gitignore
└── static/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## Run the application

```bash
python app.py
```

Open:

```text
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/champions`      | Champion list       |
| GET    | `/api/champions/<id>` | Champion details    |
| GET    | `/api/items`          | Item data           |
| GET    | `/api/runes`          | Rune data           |
| POST   | `/api/advisor`        | Real-time advice    |
| POST   | `/api/chat`           | Coaching response   |
| GET    | `/api/riot/account`   | Riot account lookup |
| GET    | `/api/riot/matches`   | Recent matches      |

---

## Data Sources

* Riot Data Dragon
* Riot Games API

---

## License

This project is not affiliated with or endorsed by Riot Games.
League of Legends and all related assets belong to Riot Games, Inc.
