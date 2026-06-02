"""
LoL Assistant - Flask backend.

Run:
    pip install flask flask-cors requests python-dotenv
    python app.py
"""

from __future__ import annotations

import os
import time
from collections import defaultdict, deque
from functools import wraps
from typing import Any

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

load_dotenv()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

app = Flask(__name__, static_folder=STATIC_DIR)
CORS(app)

RIOT_API_KEY = os.getenv("RIOT_API_KEY", "")
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "0") == "1"
DDRAGON_BASE = "https://ddragon.leagueoflegends.com"
REQUEST_TIMEOUT = 12
CACHE_TTL = 60 * 60 * 6
API_RATE_LIMIT = 120
API_RATE_WINDOW = 60
SUPPORTED_LOCALES = {"es_ES", "en_US"}

REGION_PLATFORM = {
    "LA1": "la1",
    "LA2": "la2",
    "NA1": "na1",
    "EUW1": "euw1",
    "EUN1": "eun1",
    "KR": "kr",
    "BR1": "br1",
    "JP1": "jp1",
}

REGION_ROUTING = {
    "LA1": "americas",
    "LA2": "americas",
    "NA1": "americas",
    "BR1": "americas",
    "EUW1": "europe",
    "EUN1": "europe",
    "KR": "asia",
    "JP1": "asia",
}

_cache: dict[str, tuple[float, Any]] = {}
_rate_hits: dict[str, deque[float]] = defaultdict(deque)


@app.before_request
def limit_api_requests():
    if not request.path.startswith("/api/"):
        return None

    key = request.headers.get("X-Forwarded-For", request.remote_addr or "local").split(",")[0].strip()
    now = time.time()
    hits = _rate_hits[key]
    while hits and now - hits[0] > API_RATE_WINDOW:
        hits.popleft()

    if len(hits) >= API_RATE_LIMIT:
        return jsonify({"error": "Demasiadas solicitudes. Intenta de nuevo en un momento."}), 429

    hits.append(now)
    return None


@app.errorhandler(requests.RequestException)
def handle_external_api_error(error):
    return jsonify({"error": "Servicio externo no disponible", "detail": str(error)}), 503


@app.errorhandler(KeyError)
def handle_missing_external_data(error):
    return jsonify({"error": "La respuesta externa no tenia el formato esperado", "detail": str(error)}), 502


@app.errorhandler(ValueError)
def handle_bad_request(error):
    return jsonify({"error": str(error)}), 400


def cached(key_prefix: str, ttl: int = CACHE_TTL):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            key = f"{key_prefix}:{args}:{tuple(sorted(kwargs.items()))}"
            hit = _cache.get(key)
            now = time.time()
            if hit and now - hit[0] < ttl:
                return hit[1]
            value = fn(*args, **kwargs)
            _cache[key] = (now, value)
            return value

        return wrapper

    return decorator


def fetch_json(url: str, **kwargs) -> Any:
    response = requests.get(url, timeout=REQUEST_TIMEOUT, **kwargs)
    response.raise_for_status()
    return response.json()


def requested_locale() -> str:
    locale = request.args.get("locale", "es_ES")
    if locale not in SUPPORTED_LOCALES:
        return "es_ES"
    return locale


def requested_region() -> str:
    region = request.args.get("region", "LA2").upper()
    if region not in REGION_PLATFORM:
        raise ValueError(f"Region no soportada: {region}")
    return region


@cached("ddragon-version", ttl=60 * 30)
def latest_version() -> str:
    versions = fetch_json(f"{DDRAGON_BASE}/api/versions.json")
    return versions[0]


@cached("champions")
def champion_index(locale: str = "es_ES") -> dict[str, Any]:
    version = latest_version()
    url = f"{DDRAGON_BASE}/cdn/{version}/data/{locale}/champion.json"
    return fetch_json(url)


@cached("champion-detail")
def champion_detail(champion_id: str, locale: str = "es_ES") -> dict[str, Any]:
    version = latest_version()
    url = f"{DDRAGON_BASE}/cdn/{version}/data/{locale}/champion/{champion_id}.json"
    return fetch_json(url)


@cached("items")
def item_index(locale: str = "es_ES") -> dict[str, Any]:
    version = latest_version()
    url = f"{DDRAGON_BASE}/cdn/{version}/data/{locale}/item.json"
    return fetch_json(url)


@cached("runes")
def rune_index(locale: str = "es_ES") -> list[dict[str, Any]]:
    version = latest_version()
    url = f"{DDRAGON_BASE}/cdn/{version}/data/{locale}/runesReforged.json"
    return fetch_json(url)


def riot_headers() -> dict[str, str]:
    return {"X-Riot-Token": RIOT_API_KEY}


def riot_get(url: str, **params):
    if not RIOT_API_KEY:
        return jsonify({"error": "RIOT_API_KEY no configurada en el servidor"}), 500
    response = requests.get(url, headers=riot_headers(), params=params, timeout=REQUEST_TIMEOUT)
    try:
        payload = response.json()
    except ValueError:
        payload = {"error": "Riot API devolvio una respuesta no JSON"}
    return jsonify(payload), response.status_code


@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:filename>")
def static_files(filename):
    return send_from_directory(app.static_folder, filename)


@app.route("/api/meta")
def meta():
    return jsonify(
        {
            "version": latest_version(),
            "riotConfigured": bool(RIOT_API_KEY),
            "sources": {
                "official": "Riot Data Dragon + Riot API",
                "research": ["OP.GG", "LeagueOfGraphs", "YouTube"],
            },
        }
    )


@app.route("/api/champions")
def champions():
    locale = requested_locale()
    data = champion_index(locale)
    version = latest_version()
    champions_data = []
    for champ in data["data"].values():
        champions_data.append(
            {
                "id": champ["id"],
                "key": champ["key"],
                "name": champ["name"],
                "title": champ["title"],
                "blurb": champ["blurb"],
                "tags": champ["tags"],
                "image": f"{DDRAGON_BASE}/cdn/{version}/img/champion/{champ['image']['full']}",
                "splash": f"{DDRAGON_BASE}/cdn/img/champion/splash/{champ['id']}_0.jpg",
            }
        )
    champions_data.sort(key=lambda champ: champ["name"])
    return jsonify({"version": version, "champions": champions_data})


@app.route("/api/champions/<champion_id>")
def champion(champion_id: str):
    locale = requested_locale()
    detail = champion_detail(champion_id, locale)
    version = latest_version()
    champ = next(iter(detail["data"].values()))
    champ["assetBase"] = {
        "version": version,
        "championImage": f"{DDRAGON_BASE}/cdn/{version}/img/champion/{champ['image']['full']}",
        "splash": f"{DDRAGON_BASE}/cdn/img/champion/splash/{champ['id']}_0.jpg",
        "loading": f"{DDRAGON_BASE}/cdn/img/champion/loading/{champ['id']}_0.jpg",
        "passive": f"{DDRAGON_BASE}/cdn/{version}/img/passive/{champ['passive']['image']['full']}",
        "spell": f"{DDRAGON_BASE}/cdn/{version}/img/spell/",
    }
    return jsonify(champ)


@app.route("/api/items")
def items():
    locale = requested_locale()
    data = item_index(locale)
    version = latest_version()
    payload = []
    for item_id, item in data["data"].items():
        if item.get("maps", {}).get("11") is False:
            continue
        gold = item.get("gold", {})
        payload.append(
            {
                "id": item_id,
                "name": item.get("name", ""),
                "description": item.get("plaintext") or item.get("description", ""),
                "tags": item.get("tags", []),
                "gold": gold.get("total", 0),
                "purchasable": gold.get("purchasable", False),
                "image": f"{DDRAGON_BASE}/cdn/{version}/img/item/{item['image']['full']}",
            }
        )
    return jsonify({"version": version, "items": payload})


@app.route("/api/runes")
def runes():
    locale = requested_locale()
    data = rune_index(locale)
    version = latest_version()
    for tree in data:
        tree["iconUrl"] = f"{DDRAGON_BASE}/cdn/img/{tree['icon']}"
        for slot in tree.get("slots", []):
            for rune in slot.get("runes", []):
                rune["iconUrl"] = f"{DDRAGON_BASE}/cdn/img/{rune['icon']}"
    return jsonify({"version": version, "trees": data})


@app.route("/api/recommendation", methods=["POST"])
def recommendation():
    body = request.get_json() or {}
    lang = body.get("lang", "es")
    champion_name = body.get("championName", "your champion" if lang == "en" else "tu campeon")
    role = body.get("role", "Auto")
    enemy = body.get("enemy", "")
    enemy_style = body.get("enemyStyle", "equilibrado")
    game_phase = body.get("phase", "early")
    state = body.get("state", "parejo")
    objective = body.get("objective", "ninguno")
    vision = body.get("vision", "media")
    wave = body.get("wave", "neutra")
    composition = body.get("composition", "")

    play = []
    if state == "ganando":
        play.append(
            "Turn your lead into deep vision and plates; avoid fighting without a favorable wave."
            if lang == "en"
            else "Convierte tu ventaja en vision profunda y placas; evita pelear sin oleada a favor."
        )
    elif state == "perdiendo":
        play.append(
            "Cut losses: take short trades, freeze near your tower, and play around your jungler."
            if lang == "en"
            else "Reduce el intercambio a ventanas cortas, congela cerca de tu torre y juega alrededor del jungla."
        )
    else:
        play.append(
            "Look for wave priority before moving; if you do not have it, ping and conserve resources."
            if lang == "en"
            else "Busca prioridad de oleada antes de moverte; si no hay prioridad, pinguea y conserva recursos."
        )

    if enemy_style in {"asesino", "burst"}:
        play.append(
            "Buy early defense and hold one CC or escape tool for their first engage."
            if lang == "en"
            else "Compra defensa temprana y guarda una herramienta de control o escape para su primer engage."
        )
    elif enemy_style in {"tanque", "frontline"}:
        play.append(
            "Prioritize sustained damage and extended fights; do not spend your full combo on the first health bar."
            if lang == "en"
            else "Prioriza dano sostenido y peleas extendidas; no gastes todo el combo en la primera barra de vida."
        )
    elif enemy_style in {"poke", "rango"}:
        play.append(
            "Give up some minions if needed, preserve HP, and force all-in windows when they miss key spells."
            if lang == "en"
            else "Cede algunos minions si hace falta, conserva vida y fuerza all-in cuando falle su habilidad clave."
        )

    if objective != "ninguno":
        play.append(
            f"Because {objective} is available, set vision 45 seconds early and sync recalls with your team."
            if lang == "en"
            else f"Como {objective} esta disponible, prepara vision 45 segundos antes y sincroniza recall con tu equipo."
        )
    if vision == "baja":
        play.append(
            "Do not walk alone through fog. Push first, place defensive vision, then look for deeper wards."
            if lang == "en"
            else "No camines solo por niebla. Primero empuja la oleada, luego ward defensivo, luego ward profundo."
        )
    if wave == "empujando hacia ti":
        play.append(
            "The wave is coming to you: punish oversteps and avoid breaking the freeze without a reason."
            if lang == "en"
            else "La oleada viene a tu lado: castiga si el rival se adelanta y evita romper el freeze sin razon."
        )
    elif wave == "empujando al rival":
        play.append(
            "The wave is moving away: crash fast, ward the side, then choose recall, roam, or invade with jungle."
            if lang == "en"
            else "La oleada va al rival: crash rapido, ward lateral y decide entre recall, roam o invadir con tu jungla."
        )

    return jsonify(
        {
            "summary": (
                f"Plan for {champion_name} in {role}, {game_phase} phase. Enemy: {enemy or 'unknown'}."
                if lang == "en"
                else f"Plan para {champion_name} en {role}, fase {game_phase}. Rival: {enemy or 'desconocido'}."
            ),
            "actions": play[:6],
            "buildLogic": build_logic(enemy_style, lang),
            "teamNote": team_note(composition, lang),
            "sources": source_links(champion_name, role),
        }
    )


@app.route("/api/chat", methods=["POST"])
def chat_compatibility():
    body = request.get_json() or {}
    messages = body.get("messages", [])
    content = messages[-1].get("content", "") if messages else ""
    response = recommendation_text(content)
    return jsonify({"content": [{"type": "text", "text": response}]})


def build_logic(enemy_style: str, lang: str = "es") -> list[str]:
    if lang == "en":
        logic = {
            "asesino": ["Prioritize defensive boots or an early stasis item if you are fragile.", "Survival matters more than maximum damage."],
            "burst": ["Buy health/resistance before your second item if you get deleted.", "Avoid side lanes without vision."],
            "tanque": ["Look for penetration, sustained DPS, or anti-heal when needed.", "Play front-to-back."],
            "frontline": ["Do not spend CC on tanks unless it secures an objective.", "Scale toward two or three items."],
            "poke": ["Sustain, shields, or movement speed matter more than flat damage.", "Hard engage beats trading poke."],
            "rango": ["Use defensive lane tools and wave management.", "All-in after they spend mobility."],
        }
        return logic.get(enemy_style, ["Adapt boots and your second item to the enemy's main damage type.", "The best item is the one that lets you play the fight."])

    logic = {
        "asesino": ["Prioriza botas defensivas o reloj temprano si eres fragil.", "Mantente con vida sobre dano maximo."],
        "burst": ["Compra vida/resistencia antes del segundo objeto si te deletean.", "Evita side lane sin vision."],
        "tanque": ["Busca penetracion, DPS sostenido o anti-curacion si corresponde.", "Pelea front-to-back."],
        "frontline": ["No gastes CC en el tanque salvo que puedas asegurar objetivo.", "Escala a dos/tres objetos."],
        "poke": ["Sustain, escudos o velocidad de movimiento valen mas que dano plano.", "Forzar engage supera tradear poke."],
        "rango": ["Segundo aliento, Doran defensivo y wave management.", "All-in cuando gasten movilidad."],
    }
    return logic.get(enemy_style, ["Adapta botas y segundo objeto al mayor dano enemigo.", "El mejor item es el que te deja jugar la pelea."])


def team_note(composition: str, lang: str = "es") -> str:
    if lang == "en":
        if not composition:
            return "If your team lacks engage, play for picks and vision; if it already has engage, save resources for follow-up."
        return f"Composition noted: {composition}. Decide whether your job is engage, peel, or side-lane pressure."

    if not composition:
        return "Si tu equipo no tiene engage, juega por pickoffs y vision; si ya tiene engage, guarda recursos para follow-up."
    return f"Composicion anotada: {composition}. Evalua si tu rol debe iniciar, proteger al carry o jugar side lane."


def source_links(champion_name: str, role: str) -> list[dict[str, str]]:
    query = f"{champion_name} {role} build"
    encoded = requests.utils.quote(query)
    youtube = requests.utils.quote(f"{champion_name} {role} guide patch")
    return [
        {"label": "Riot Data Dragon", "url": "https://developer.riotgames.com/docs/lol#data-dragon"},
        {"label": "OP.GG", "url": f"https://www.op.gg/champions/{requests.utils.quote(champion_name.lower())}/build"},
        {"label": "LeagueOfGraphs", "url": f"https://www.leagueofgraphs.com/champions/builds/{requests.utils.quote(champion_name.lower())}"},
        {"label": "YouTube guias", "url": f"https://www.youtube.com/results?search_query={youtube}"},
        {"label": "Busqueda web", "url": f"https://www.google.com/search?q={encoded}"},
    ]


def recommendation_text(prompt: str) -> str:
    lowered = prompt.lower()
    state = "parejo"
    if "ganando" in lowered:
        state = "ganando"
    elif "perdiendo" in lowered:
        state = "perdiendo"

    if state == "ganando":
        first = "Tienes ventaja: no la conviertas en una moneda al aire."
        action = "crashea la oleada, coloca vision profunda y juega el siguiente objetivo con recall sincronizado."
    elif state == "perdiendo":
        first = "Ahora mismo tu mejor jugada es cortar perdidas."
        action = "congela cerca de torre, pide cobertura y compra el componente defensivo que responda al dano rival."
    else:
        first = "La partida esta estable: gana informacion antes de forzar."
        action = "busca prioridad de oleada, guarda cooldowns clave y pelea solo si tu equipo llega primero."
    return f"{first}\n\nDecision inmediata: {action}\n\nChecklist: oleada, vision, cooldowns enemigos, objetivo neutral y posicion del jungla."


@app.route("/api/riot/account")
def get_account():
    game_name = request.args.get("gameName", "")
    tag_line = request.args.get("tagLine", "")
    region = requested_region()
    routing = REGION_ROUTING.get(region, "americas")
    url = f"https://{routing}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}"
    return riot_get(url)


@app.route("/api/riot/summoner")
def get_summoner():
    puuid = request.args.get("puuid", "")
    region = requested_region()
    server = REGION_PLATFORM.get(region, "la2")
    url = f"https://{server}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}"
    return riot_get(url)


@app.route("/api/riot/ranked")
def get_ranked():
    summoner_id = request.args.get("summonerId", "")
    region = requested_region()
    server = REGION_PLATFORM.get(region, "la2")
    url = f"https://{server}.api.riotgames.com/lol/league/v4/entries/by-summoner/{summoner_id}"
    return riot_get(url)


@app.route("/api/riot/matches")
def get_matches():
    puuid = request.args.get("puuid", "")
    region = requested_region()
    count = request.args.get("count", 10)
    routing = REGION_ROUTING.get(region, "americas")
    url = f"https://{routing}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids"
    return riot_get(url, count=count)


@app.route("/api/riot/match/<match_id>")
def get_match(match_id: str):
    region = requested_region()
    routing = REGION_ROUTING.get(region, "americas")
    url = f"https://{routing}.api.riotgames.com/lol/match/v5/matches/{match_id}"
    return riot_get(url)


if __name__ == "__main__":
    print("LoL Assistant corriendo en http://localhost:5000")
    app.run(debug=FLASK_DEBUG, port=5000)
