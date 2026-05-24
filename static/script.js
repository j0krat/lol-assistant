const state = {
  meta: null,
  lang: localStorage.getItem("lolAssistantLang") || "es",
  champions: [],
  championDetails: new Map(),
  items: [],
  runes: [],
  selectedChampionId: null,
};

const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];
const threats = ["equilibrado", "asesino", "burst", "tanque", "frontline", "poke", "rango"];
const phases = ["early", "mid", "late"];
const gameStates = ["parejo", "ganando", "perdiendo"];
const objectives = ["ninguno", "dragon", "heraldo", "baron", "torre", "alma"];
const visionStates = ["alta", "media", "baja"];
const waveStates = ["neutra", "empujando hacia ti", "empujando al rival"];
const regions = ["LA1", "LA2", "NA1", "EUW1", "EUN1", "KR", "BR1", "JP1"];
const locales = { es: "es_ES", en: "en_US" };

const i18n = {
  es: {
    navDashboard: "Inicio",
    navChampions: "Campeones",
    navDraft: "Draft",
    navAdvisor: "Tiempo real",
    navAccount: "Cuenta Riot",
    loadingPatch: "Cargando parche",
    sourceTitle: "Datos base",
    sourceNote: "Riot Data Dragon. OP.GG, LeagueOfGraphs y YouTube quedan como enlaces de investigación por campeón.",
    heroEyebrow: "Coach, builds y draft",
    heroTitle: "Decide mejor antes y durante la partida.",
    heroCopy: "Explora todos los campeones, consulta planes de matchup, ajusta runas/items por amenaza enemiga y recibe decisiones rápidas para objetivos, oleadas y visión.",
    status: "Estado",
    syncing: "Sincronizando datos oficiales",
    loadedOfficial: "Datos oficiales cargados",
    riotConfigured: "Riot API configurada",
    championsLoaded: "campeones cargados",
    metricChampions: "Base de campeones",
    metricChampionsHelp: "Habilidades, roles y planes por fase",
    metricDraft: "Draft helper",
    metricDraftHelp: "Responde a picks y composición rival",
    metricAdvisor: "Tiempo real",
    metricAdvisorHelp: "Oleadas, visión, objetivos y riesgo",
    flowTitle: "Flujo recomendado",
    flow1: "Elige campeón y rol.",
    flow2: "Marca el rival o la amenaza principal.",
    flow3: "Usa la pestaña de tiempo real cuando cambie el mapa.",
    externalTitle: "Fuentes externas",
    externalCopy: "La app no copia datos privados de terceros. Te abre búsquedas directas en OP.GG, LeagueOfGraphs y YouTube para revisar tendencias del parche y guías recientes.",
    allChampions: "Todos los campeones",
    library: "Biblioteca",
    searchPlaceholder: "Buscar campeón, rol o clase",
    allRoles: "Todos los roles",
    emptyChampion: "Selecciona un campeón para ver su guía completa.",
    draftEyebrow: "Respuesta a composición",
    yourChampion: "Tu campeón",
    role: "Rol",
    laneEnemy: "Rival directo",
    laneEnemyPlaceholder: "Ej: Darius, Zed, Caitlyn",
    mainThreat: "Amenaza principal",
    enemyComp: "Composición enemiga",
    enemyCompPlaceholder: "Ej: Malphite, Jarvan IV, Orianna, Jinx, Lulu",
    draftButton: "Generar plan de draft",
    advisorEyebrow: "Decisiones en partida",
    champion: "Campeón",
    phase: "Fase",
    gameState: "Estado",
    objective: "Objetivo",
    vision: "Visión",
    wave: "Oleada",
    threatInput: "Rival o amenaza",
    threatInputPlaceholder: "Ej: Nocturne fedeado",
    context: "Contexto",
    contextPlaceholder: "Ej: Dragón en 50s, tengo flash, mi bot no tiene prio, mid enemigo desaparecido",
    advisorButton: "Pedir decisión",
    analyzing: "Analizando mapa...",
    riotEyebrow: "Riot API",
    riotId: "Riot ID",
    tag: "TAG",
    region: "Región",
    riotButton: "Consultar cuenta",
    patch: "Parche",
    guide: "Guía",
    abilities: "Habilidades",
    buildRunes: "Build y runas",
    sources: "Fuentes",
    early: "Early game",
    mid: "Mid game",
    teamfights: "Teamfights",
    basePlan: "Plan base",
    suggestedRunes: "Runas sugeridas",
    enemyAdjustments: "Ajustes por rival",
    vsBurst: "Contra burst",
    vsTanks: "Contra tanques",
    vsPoke: "Contra poke",
    buildLogic: "Build logic",
    sourceCopy: "Usa estos enlaces para contrastar winrates, builds del parche y guías recientes. Los datos oficiales de campeones vienen de Riot.",
    statsAttack: "Ataque",
    statsMagic: "Magia",
    statsDifficulty: "Dificultad",
    accountNeed: "Ingresa Riot ID y TAG.",
    checkingRiot: "Consultando Riot API...",
    level: "Nivel",
    soloq: "SoloQ",
    winrate: "Winrate",
    noRank: "Sin rank",
    apiMissing: "Configura RIOT_API_KEY en .env para usar esta sección.",
    accountError: "No se pudo consultar la cuenta.",
  },
  en: {
    navDashboard: "Home",
    navChampions: "Champions",
    navDraft: "Draft",
    navAdvisor: "Real time",
    navAccount: "Riot Account",
    loadingPatch: "Loading patch",
    sourceTitle: "Base data",
    sourceNote: "Riot Data Dragon. OP.GG, LeagueOfGraphs and YouTube are linked as champion research sources.",
    heroEyebrow: "Coach, builds and draft",
    heroTitle: "Make better decisions before and during the match.",
    heroCopy: "Explore every champion, review matchup plans, adapt runes/items to enemy threats, and get quick calls for objectives, waves and vision.",
    status: "Status",
    syncing: "Syncing official data",
    loadedOfficial: "Official data loaded",
    riotConfigured: "Riot API configured",
    championsLoaded: "champions loaded",
    metricChampions: "Champion database",
    metricChampionsHelp: "Abilities, roles and phase plans",
    metricDraft: "Draft helper",
    metricDraftHelp: "Respond to picks and enemy composition",
    metricAdvisor: "Real time",
    metricAdvisorHelp: "Waves, vision, objectives and risk",
    flowTitle: "Recommended flow",
    flow1: "Choose champion and role.",
    flow2: "Mark the lane opponent or main threat.",
    flow3: "Use the real-time tab whenever the map state changes.",
    externalTitle: "External sources",
    externalCopy: "The app does not copy private third-party data. It opens direct searches on OP.GG, LeagueOfGraphs and YouTube so you can review patch trends and recent guides.",
    allChampions: "All champions",
    library: "Library",
    searchPlaceholder: "Search champion, role or class",
    allRoles: "All roles",
    emptyChampion: "Select a champion to view the full guide.",
    draftEyebrow: "Composition response",
    yourChampion: "Your champion",
    role: "Role",
    laneEnemy: "Lane opponent",
    laneEnemyPlaceholder: "Ex: Darius, Zed, Caitlyn",
    mainThreat: "Main threat",
    enemyComp: "Enemy composition",
    enemyCompPlaceholder: "Ex: Malphite, Jarvan IV, Orianna, Jinx, Lulu",
    draftButton: "Generate draft plan",
    advisorEyebrow: "In-game decisions",
    champion: "Champion",
    phase: "Phase",
    gameState: "State",
    objective: "Objective",
    vision: "Vision",
    wave: "Wave",
    threatInput: "Enemy or threat",
    threatInputPlaceholder: "Ex: fed Nocturne",
    context: "Context",
    contextPlaceholder: "Ex: Dragon in 50s, I have flash, bot has no prio, enemy mid is missing",
    advisorButton: "Ask for decision",
    analyzing: "Analyzing map...",
    riotEyebrow: "Riot API",
    riotId: "Riot ID",
    tag: "TAG",
    region: "Region",
    riotButton: "Check account",
    patch: "Patch",
    guide: "Guide",
    abilities: "Abilities",
    buildRunes: "Build and runes",
    sources: "Sources",
    early: "Early game",
    mid: "Mid game",
    teamfights: "Teamfights",
    basePlan: "Base plan",
    suggestedRunes: "Suggested runes",
    enemyAdjustments: "Enemy adjustments",
    vsBurst: "Vs burst",
    vsTanks: "Vs tanks",
    vsPoke: "Vs poke",
    buildLogic: "Build logic",
    sourceCopy: "Use these links to compare winrates, patch builds and recent guides. Official champion data comes from Riot.",
    statsAttack: "Attack",
    statsMagic: "Magic",
    statsDifficulty: "Difficulty",
    accountNeed: "Enter Riot ID and TAG.",
    checkingRiot: "Checking Riot API...",
    level: "Level",
    soloq: "SoloQ",
    winrate: "Winrate",
    noRank: "Unranked",
    apiMissing: "Set RIOT_API_KEY in .env to use this section.",
    accountError: "Could not check the account.",
  },
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindNavigation();
  bindLanguageSwitch();
  bindForms();
  fillStaticSelects();
  applyLanguage();
  await loadData();
}

function t(key) {
  return i18n[state.lang][key] || i18n.es[key] || key;
}

function bindLanguageSwitch() {
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.addEventListener("click", async () => {
      if (button.dataset.lang === state.lang) return;
      state.lang = button.dataset.lang;
      localStorage.setItem("lolAssistantLang", state.lang);
      state.selectedChampionId = null;
      state.championDetails.clear();
      applyLanguage();
      fillStaticSelects();
      document.getElementById("championDetail").innerHTML = `<div class="empty-state">${t("emptyChampion")}</div>`;
      await loadData();
    });
  });
}

function applyLanguage() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll(".lang-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === state.lang);
  });

  const textMap = [
    ['[data-page="dashboard"]', "navDashboard"],
    ['[data-page="champions"]', "navChampions"],
    ['[data-page="draft"]', "navDraft"],
    ['[data-page="advisor"]', "navAdvisor"],
    ['[data-page="account"]', "navAccount"],
    [".source-note strong", "sourceTitle"],
    [".source-note span", "sourceNote"],
    ["#page-dashboard .eyebrow", "heroEyebrow"],
    ["#page-dashboard h1", "heroTitle"],
    [".hero-copy", "heroCopy"],
    [".hero-panel span", "status"],
    [".metric-card:nth-child(1) span", "metricChampions"],
    [".metric-card:nth-child(1) small", "metricChampionsHelp"],
    [".metric-card:nth-child(2) span", "metricDraft"],
    [".metric-card:nth-child(2) small", "metricDraftHelp"],
    [".metric-card:nth-child(3) span", "metricAdvisor"],
    [".metric-card:nth-child(3) small", "metricAdvisorHelp"],
    [".two-col > div:nth-child(1) h2", "flowTitle"],
    [".steps div:nth-child(1) span", "flow1"],
    [".steps div:nth-child(2) span", "flow2"],
    [".steps div:nth-child(3) span", "flow3"],
    [".two-col > div:nth-child(2) h2", "externalTitle"],
    [".two-col > div:nth-child(2) p", "externalCopy"],
    ["#page-champions .eyebrow", "allChampions"],
    ["#page-champions h1", "library"],
    [".empty-state", "emptyChampion"],
    ["#page-draft .eyebrow", "draftEyebrow"],
    ["#page-draft h1", "navDraft"],
    ["#page-advisor .eyebrow", "advisorEyebrow"],
    ["#page-advisor h1", "navAdvisor"],
    ["#page-account .eyebrow", "riotEyebrow"],
    ["#page-account h1", "navAccount"],
    ["#draftBtn", "draftButton"],
    ["#advisorBtn", "advisorButton"],
    ["#riotBtn", "riotButton"],
  ];

  textMap.forEach(([selector, key]) => setText(selector, t(key)));
  setText("#patchLabel", state.meta ? `${t("patch")} ${state.meta.version}` : t("loadingPatch"));
  setText("#dataStatus", state.meta ? (state.meta.riotConfigured ? t("riotConfigured") : t("loadedOfficial")) : t("syncing"));
  setText("#championCount", `${state.champions.length} ${t("championsLoaded")}`);

  document.getElementById("championSearch").placeholder = t("searchPlaceholder");
  document.getElementById("draftLaneEnemy").placeholder = t("laneEnemyPlaceholder");
  document.getElementById("draftComp").placeholder = t("enemyCompPlaceholder");
  document.getElementById("advisorEnemy").placeholder = t("threatInputPlaceholder");
  document.getElementById("advisorContext").placeholder = t("contextPlaceholder");

  setFormLabels();
  renderChampionGrid();
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setFormLabels() {
  const labels = [
    ["#draftChampion", "yourChampion"],
    ["#draftRole", "role"],
    ["#draftLaneEnemy", "laneEnemy"],
    ["#draftThreat", "mainThreat"],
    ["#draftComp", "enemyComp"],
    ["#advisorChampion", "champion"],
    ["#advisorRole", "role"],
    ["#advisorPhase", "phase"],
    ["#advisorState", "gameState"],
    ["#advisorObjective", "objective"],
    ["#advisorVision", "vision"],
    ["#advisorWave", "wave"],
    ["#advisorEnemy", "threatInput"],
    ["#advisorContext", "context"],
    ["#riotName", "riotId"],
    ["#riotTag", "tag"],
    ["#riotRegion", "region"],
  ];

  labels.forEach(([selector, key]) => {
    const field = document.querySelector(selector);
    const label = field?.closest("label");
    if (!label) return;
    const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = t(key);
  });
}

function bindNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.page));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => showPage(button.dataset.jump));
  });
}

function showPage(page) {
  document.querySelectorAll(".nav-item").forEach((button) => {
    button.classList.toggle("active", button.dataset.page === page);
  });
  document.querySelectorAll(".page").forEach((section) => {
    section.classList.toggle("active", section.id === `page-${page}`);
  });
}

function bindForms() {
  document.getElementById("championSearch").addEventListener("input", renderChampionGrid);
  document.getElementById("roleFilter").addEventListener("change", renderChampionGrid);
  document.getElementById("draftBtn").addEventListener("click", generateDraftPlan);
  document.getElementById("advisorBtn").addEventListener("click", requestAdvice);
  document.getElementById("riotBtn").addEventListener("click", loadRiotAccount);
}

function fillStaticSelects() {
  fillRoleFilter();
  fillSelect("draftRole", roles);
  fillSelect("advisorRole", roles);
  fillSelect("draftThreat", threats);
  fillSelect("advisorPhase", phases);
  fillSelect("advisorState", gameStates);
  fillSelect("advisorObjective", objectives);
  fillSelect("advisorVision", visionStates);
  fillSelect("advisorWave", waveStates);
  fillSelect("riotRegion", regions, "LA2");
}

function fillSelect(id, values, selected = values[0]) {
  const select = document.getElementById(id);
  select.innerHTML = values.map((value) => `<option value="${value}" ${value === selected ? "selected" : ""}>${label(value)}</option>`).join("");
}

function fillRoleFilter() {
  const selected = document.getElementById("roleFilter").value || "all";
  document.getElementById("roleFilter").innerHTML = `
    <option value="all" ${selected === "all" ? "selected" : ""}>${t("allRoles")}</option>
    ${roles.map((role) => `<option value="${role}" ${selected === role ? "selected" : ""}>${role}</option>`).join("")}
  `;
}

async function loadData() {
  try {
    const [meta, champions, items, runes] = await Promise.all([
      fetchJson("/api/meta"),
      fetchJson(`/api/champions?locale=${locales[state.lang]}`),
      fetchJson(`/api/items?locale=${locales[state.lang]}`),
      fetchJson(`/api/runes?locale=${locales[state.lang]}`),
    ]);

    state.meta = meta;
    state.champions = champions.champions;
    state.items = items.items.filter((item) => item.purchasable && item.gold >= 300);
    state.runes = runes.trees;

    document.getElementById("patchLabel").textContent = `${t("patch")} ${meta.version}`;
    document.getElementById("dataStatus").textContent = meta.riotConfigured ? t("riotConfigured") : t("loadedOfficial");
    document.getElementById("championCount").textContent = `${state.champions.length} ${t("championsLoaded")}`;
    document.getElementById("metricChampions").textContent = state.champions.length;

    populateChampionSelects();
    applyLanguage();
  } catch (error) {
    console.error(error);
    document.getElementById("dataStatus").textContent = "No se pudo cargar Data Dragon";
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text}`);
  }
  return response.json();
}

function populateChampionSelects() {
  const options = state.champions.map((champion) => `<option value="${champion.id}">${champion.name}</option>`).join("");
  document.getElementById("draftChampion").innerHTML = options;
  document.getElementById("advisorChampion").innerHTML = options;
}

function renderChampionGrid() {
  const query = document.getElementById("championSearch").value.trim().toLowerCase();
  const role = document.getElementById("roleFilter").value;
  const grid = document.getElementById("championGrid");
  const filtered = state.champions.filter((champion) => {
    const text = `${champion.name} ${champion.title} ${champion.tags.join(" ")} ${guessRoles(champion).join(" ")}`.toLowerCase();
    const matchesQuery = !query || text.includes(query);
    const matchesRole = role === "all" || guessRoles(champion).includes(role);
    return matchesQuery && matchesRole;
  });

  grid.innerHTML = filtered.map(championCard).join("");
  grid.querySelectorAll(".champion-card").forEach((card) => {
    card.addEventListener("click", () => selectChampion(card.dataset.id));
  });
}

function championCard(champion) {
  const active = state.selectedChampionId === champion.id ? "active" : "";
  return `
    <button class="champion-card ${active}" data-id="${champion.id}">
      <img src="${champion.image}" alt="${champion.name}">
      <strong>${champion.name}</strong>
      <span>${guessRoles(champion).join(" / ")}</span>
    </button>
  `;
}

async function selectChampion(id) {
  state.selectedChampionId = id;
  renderChampionGrid();
  const detail = await getChampionDetail(id);
  renderChampionDetail(detail);
}

async function getChampionDetail(id) {
  if (state.championDetails.has(id)) {
    return state.championDetails.get(id);
  }
  const detail = await fetchJson(`/api/champions/${id}?locale=${locales[state.lang]}`);
  state.championDetails.set(id, detail);
  return detail;
}

function renderChampionDetail(champion) {
  const rolesForChampion = guessRoles(champion);
  const defaultRole = rolesForChampion[0] || "Auto";
  const profile = championProfile(champion, defaultRole);
  const sources = sourceLinks(champion.name, defaultRole);
  const spells = [
    {
      key: "P",
      name: champion.passive.name,
      description: champion.passive.description,
      image: champion.assetBase.passive,
    },
    ...champion.spells.map((spell, index) => ({
      key: ["Q", "W", "E", "R"][index],
      name: spell.name,
      description: spell.description,
      image: `${champion.assetBase.spell}${spell.image.full}`,
    })),
  ];

  document.getElementById("championDetail").innerHTML = `
    <div class="champion-splash" style="background-image: url('${champion.assetBase.splash}')">
      <div class="champion-heading">
        <div class="tag-row">${rolesForChampion.map((role) => `<span class="chip">${role}</span>`).join("")}</div>
        <h2>${champion.name}</h2>
        <p>${champion.title}</p>
      </div>
    </div>
    <div class="detail-body">
      <div class="stat-grid">
        <div class="stat"><span>${t("statsAttack")}</span><strong>${champion.info.attack}/10</strong></div>
        <div class="stat"><span>${t("statsMagic")}</span><strong>${champion.info.magic}/10</strong></div>
        <div class="stat"><span>${t("statsDifficulty")}</span><strong>${champion.info.difficulty}/10</strong></div>
      </div>
      <div class="tabs">
        <button class="tab-button active" data-tab="guide">${t("guide")}</button>
        <button class="tab-button" data-tab="spells">${t("abilities")}</button>
        <button class="tab-button" data-tab="build">${t("buildRunes")}</button>
        <button class="tab-button" data-tab="sources">${t("sources")}</button>
      </div>
      <section class="tab-panel active" id="tab-guide">
        <div class="guide-grid">
          ${profile.phases.map((phase) => `<article class="guide-card"><h3>${phase.title}</h3><p>${phase.text}</p></article>`).join("")}
        </div>
      </section>
      <section class="tab-panel" id="tab-spells">
        <div class="spell-list">
          ${spells.map(spellCard).join("")}
        </div>
      </section>
      <section class="tab-panel" id="tab-build">
        ${renderBuild(profile, champion)}
      </section>
      <section class="tab-panel" id="tab-sources">
        <p class="muted">${t("sourceCopy")}</p>
        <div class="source-row">${sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`).join("")}</div>
      </section>
    </div>
  `;

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchChampionTab(button.dataset.tab));
  });
}

function switchChampionTab(tab) {
  document.querySelectorAll(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));
  document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `tab-${tab}`));
}

function spellCard(spell) {
  return `
    <article class="spell-card">
      <img src="${spell.image}" alt="${spell.name}">
      <div>
        <h3>${spell.key} - ${spell.name}</h3>
        <p>${cleanText(spell.description)}</p>
      </div>
    </article>
  `;
}

function renderBuild(profile, champion) {
  const items = pickItems(profile.itemTags, champion);
  const runes = pickRunes(profile.runePlan);
  return `
    <h3>${t("basePlan")}</h3>
    <div class="item-grid">${items.map(itemCard).join("")}</div>
    <h3 style="margin-top:18px">${t("suggestedRunes")}</h3>
    <div class="rune-grid">${runes.map(runeCard).join("")}</div>
    <h3 style="margin-top:18px">${t("enemyAdjustments")}</h3>
    <div class="guide-grid">
      <article class="guide-card"><h3>${t("vsBurst")}</h3><p>${state.lang === "en" ? "Buy survivability before your second item if one rotation kills you." : "Compra supervivencia antes del segundo item si una rotación te mata."}</p></article>
      <article class="guide-card"><h3>${t("vsTanks")}</h3><p>${state.lang === "en" ? "Prioritize sustained damage, penetration, or anti-heal if they have heavy healing." : "Prioriza daño sostenido, penetración o anti-curación si hay mucha sanación."}</p></article>
      <article class="guide-card"><h3>${t("vsPoke")}</h3><p>${state.lang === "en" ? "Sustain, early boots, and engage windows matter more than contesting every minion." : "Sustain, botas tempranas y ventanas de engage valen más que pelear cada minion."}</p></article>
    </div>
  `;
}

function itemCard(item) {
  return `
    <article class="item-card">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>${item.description || `${item.gold} de oro`}</p>
      </div>
    </article>
  `;
}

function runeCard(rune) {
  return `
    <article class="rune-card">
      <img src="${rune.iconUrl}" alt="${rune.name}">
      <div>
        <h3>${rune.name}</h3>
        <p>${cleanText(rune.shortDesc || rune.longDesc || "")}</p>
      </div>
    </article>
  `;
}

function championProfile(champion, role) {
  const tags = champion.tags || [];
  const isMarksman = tags.includes("Marksman");
  const isMage = tags.includes("Mage");
  const isTank = tags.includes("Tank");
  const isAssassin = tags.includes("Assassin");
  const isSupport = role === "Support" || tags.includes("Support");

  let identity = state.lang === "en" ? "controls fight tempo through key cooldowns" : "controla el ritmo de la pelea con tus cooldowns clave";
  let itemTags = ["Damage", "SpellDamage", "CooldownReduction"];
  let runePlan = "burst";

  if (isMarksman) {
    identity = state.lang === "en" ? "scales through gold, clean positioning, and constant backline damage" : "escala con oro, posicionamiento limpio y daño constante desde backline";
    itemTags = ["Damage", "AttackSpeed", "CriticalStrike"];
    runePlan = "dps";
  } else if (isTank || isSupport) {
    identity = state.lang === "en" ? "creates space, absorbs engage, and protects the win condition" : "crea espacio, absorbe engage y protege la condición de victoria";
    itemTags = ["Health", "Armor", "SpellBlock"];
    runePlan = "tank";
  } else if (isAssassin) {
    identity = state.lang === "en" ? "punishes side lanes, fog of war, and carries without defensive tools" : "castiga laterales, niebla de guerra y carries sin recursos defensivos";
    itemTags = ["Damage", "ArmorPenetration", "CooldownReduction"];
    runePlan = "burst";
  } else if (isMage) {
    identity = state.lang === "en" ? "wins priority with range, controls zones, and plays around important spells" : "gana prioridad con rango, controla zonas y juega alrededor de hechizos importantes";
    itemTags = ["SpellDamage", "Mana", "CooldownReduction"];
    runePlan = "mage";
  }

  return {
    itemTags,
    runePlan,
    phases: [
      {
        title: t("early"),
        text:
          state.lang === "en"
            ? `With ${champion.name}, ${identity}. In the first levels, prioritize HP, farm, and wave control before forcing plays without information.`
            : `Con ${champion.name}, ${identity}. En los primeros niveles prioriza vida, farm y control de oleada antes de forzar jugadas sin información.`,
      },
      {
        title: t("mid"),
        text:
          state.lang === "en"
            ? "Push side waves with vision, move before your lane opponent, and prepare objectives 45 seconds in advance."
            : "Empuja oleadas laterales con visión, muévete antes que tu rival directo y prepara objetivos con 45 segundos de anticipación.",
      },
      {
        title: t("teamfights"),
        text: isTank || isSupport
          ? state.lang === "en"
            ? "Find the right engage or hold CC to stop the enemy assassin. Your value is enabling your carries."
            : "Marca el inicio correcto o guarda control para cortar al asesino rival. Tu valor está en habilitar a tus carries."
          : state.lang === "en"
            ? "Decide whether to play front-to-back, flank, or clean up fights. Do not enter before seeing the cooldowns that punish you."
            : "Define si debes jugar front-to-back, flanquear o limpiar peleas. No entres antes de ver los cooldowns que te castigan.",
      },
    ],
  };
}

function pickItems(tags, champion) {
  const candidates = state.items
    .filter((item) => tags.some((tag) => item.tags.includes(tag)))
    .filter((item) => item.gold >= 1600)
    .sort((a, b) => scoreItem(b, tags, champion) - scoreItem(a, tags, champion));

  return uniqueByName(candidates).slice(0, 6);
}

function scoreItem(item, tags, champion) {
  const tagScore = tags.filter((tag) => item.tags.includes(tag)).length * 4;
  const priceScore = item.gold >= 2500 ? 3 : 0;
  const name = item.name.toLowerCase();
  const mythicLike = /sombrero|infinito|rabadon|zhonya|kraken|sterak|corazon|jak|angel|liandry|trinidad|sunder|navori/.test(name) ? 3 : 0;
  const champBias = champion.info.magic > champion.info.attack && item.tags.includes("SpellDamage") ? 2 : 0;
  return tagScore + priceScore + mythicLike + champBias;
}

function pickRunes(plan) {
  const namesByPlan = {
    burst: ["Electrocutar", "Impacto repentino", "Cazador definitivo", "Golpe bajo"],
    mage: ["Invocar a Aery", "Cometa arcano", "Banda de maná", "Trascendencia"],
    dps: ["Ataque intensificado", "Compás letal", "Presencia de ánimo", "Leyenda: Presteza"],
    tank: ["Reverberacción", "Protector", "Fuente de vida", "Revestimiento de huesos"],
  };
  const desired = namesByPlan[plan] || namesByPlan.burst;
  const allRunes = state.runes.flatMap((tree) => tree.slots.flatMap((slot) => slot.runes));
  const selected = desired.map((name) => fuzzyFindRune(allRunes, name)).filter(Boolean);
  return selected.length >= 3 ? selected : allRunes.slice(0, 4);
}

function fuzzyFindRune(runes, desired) {
  const normalized = normalize(desired);
  return runes.find((rune) => normalize(rune.name).includes(normalized) || normalized.includes(normalize(rune.name)));
}

function generateDraftPlan() {
  const champion = findChampion(document.getElementById("draftChampion").value);
  const payload = {
    lang: state.lang,
    championName: champion?.name || (state.lang === "en" ? "your champion" : "tu campeón"),
    role: document.getElementById("draftRole").value,
    enemy: document.getElementById("draftLaneEnemy").value,
    enemyStyle: document.getElementById("draftThreat").value,
    phase: "draft",
    state: "parejo",
    composition: document.getElementById("draftComp").value,
  };
  renderLocalPlan("draftResult", buildPlan(payload));
}

async function requestAdvice() {
  const button = document.getElementById("advisorBtn");
  button.disabled = true;
  button.textContent = t("analyzing");
  const champion = findChampion(document.getElementById("advisorChampion").value);
  const payload = {
    lang: state.lang,
    championName: champion?.name || (state.lang === "en" ? "your champion" : "tu campeón"),
    role: document.getElementById("advisorRole").value,
    phase: document.getElementById("advisorPhase").value,
    state: document.getElementById("advisorState").value,
    objective: document.getElementById("advisorObjective").value,
    vision: document.getElementById("advisorVision").value,
    wave: document.getElementById("advisorWave").value,
    enemy: document.getElementById("advisorEnemy").value,
    enemyStyle: inferThreat(document.getElementById("advisorEnemy").value),
    composition: document.getElementById("advisorContext").value,
  };

  try {
    const plan = await fetchJson("/api/recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    renderPlan("advisorResult", plan);
  } catch (error) {
    renderLocalPlan("advisorResult", buildPlan(payload));
  } finally {
    button.disabled = false;
    button.textContent = t("advisorButton");
  }
}

function buildPlan(payload) {
  const actions = [];
  if (payload.state === "ganando") {
    actions.push(state.lang === "en" ? "Turn your lead into plates, deep vision, or an objective. Avoid dives without a big wave." : "Convierte ventaja en placas, visión profunda o objetivo. Evita dives sin oleada grande.");
  } else if (payload.state === "perdiendo") {
    actions.push(state.lang === "en" ? "Cut losses: farm under tower, buy defense, and play with your jungler." : "Corta pérdidas: farmea bajo torre, compra defensivo y juega con tu jungla.");
  } else {
    actions.push(state.lang === "en" ? "Play for wave priority and information before moving." : "Juega por prioridad de oleada e información antes de moverte.");
  }
  if (payload.enemyStyle === "asesino" || payload.enemyStyle === "burst") {
    actions.push(state.lang === "en" ? "Hold escape/CC for their engage and do not walk alone through fog." : "Guarda escape/CC para su entrada y no camines solo por niebla.");
  }
  if (payload.enemyStyle === "tanque" || payload.enemyStyle === "frontline") {
    actions.push(state.lang === "en" ? "Do not waste damage on frontline if you cannot finish; play front-to-back." : "No desperdicies daño en frontlane si no puedes rematar; pelea front-to-back.");
  }
  if (payload.objective && payload.objective !== "ninguno") {
    actions.push(state.lang === "en" ? `Prepare ${label(payload.objective)} with synced recalls and wards 45 seconds early.` : `Prepara ${payload.objective} con recall sincronizado y wards 45 segundos antes.`);
  }
  return {
    summary: state.lang === "en" ? `Plan for ${payload.championName} in ${payload.role}. Enemy: ${payload.enemy || "unknown"}.` : `Plan para ${payload.championName} en ${payload.role}. Rival: ${payload.enemy || "desconocido"}.`,
    actions,
    buildLogic: state.lang === "en"
      ? ["Adapt boots and second item to the enemy's main damage type.", "If you cannot survive the first combo, an offensive build is not useful."]
      : ["Ajusta botas y segundo item al mayor daño enemigo.", "Si no puedes sobrevivir al primer combo, no tienes build ofensiva útil."],
    teamNote: payload.composition || (state.lang === "en" ? "Define whether your team needs engage, peel, or side-lane pressure." : "Define si tu equipo necesita engage, peel o presión lateral."),
    sources: sourceLinks(payload.championName, payload.role),
  };
}

function renderLocalPlan(id, plan) {
  renderPlan(id, plan);
}

function renderPlan(id, plan) {
  const box = document.getElementById(id);
  box.classList.add("visible");
  box.innerHTML = `
    <h3>${plan.summary}</h3>
    <ul>${plan.actions.map((action) => `<li>${action}</li>`).join("")}</ul>
    <h3 style="margin-top:16px">${t("buildLogic")}</h3>
    <ul>${plan.buildLogic.map((item) => `<li>${item}</li>`).join("")}</ul>
    <p class="muted" style="margin-top:16px">${plan.teamNote}</p>
    <div class="source-row" style="margin-top:14px">
      ${plan.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`).join("")}
    </div>
  `;
}

async function loadRiotAccount() {
  const result = document.getElementById("riotResult");
  const name = document.getElementById("riotName").value.trim();
  const tag = document.getElementById("riotTag").value.trim();
  const region = document.getElementById("riotRegion").value;

  if (!name || !tag) {
    result.classList.add("visible");
    result.innerHTML = `<p class='status-bad'>${t("accountNeed")}</p>`;
    return;
  }

  result.classList.add("visible");
  result.innerHTML = `<p>${t("checkingRiot")}</p>`;

  try {
    const account = await fetchJson(`/api/riot/account?gameName=${encodeURIComponent(name)}&tagLine=${encodeURIComponent(tag)}&region=${region}`);
    if (account.error) throw new Error(account.error);
    const summoner = await fetchJson(`/api/riot/summoner?puuid=${account.puuid}&region=${region}`);
    const ranked = await fetchJson(`/api/riot/ranked?summonerId=${summoner.id}&region=${region}`);
    const soloq = Array.isArray(ranked) ? ranked.find((queue) => queue.queueType === "RANKED_SOLO_5x5") : null;
    result.innerHTML = `
      <h3 class="status-good">${account.gameName}#${account.tagLine}</h3>
      <div class="stat-grid">
        <div class="stat"><span>${t("level")}</span><strong>${summoner.summonerLevel || "-"}</strong></div>
        <div class="stat"><span>${t("soloq")}</span><strong>${soloq ? `${soloq.tier} ${soloq.rank}` : t("noRank")}</strong></div>
        <div class="stat"><span>${t("winrate")}</span><strong>${soloq ? winrate(soloq.wins, soloq.losses) : "-"}</strong></div>
      </div>
    `;
  } catch (error) {
    result.innerHTML = `<p class="status-bad">${error.message.includes("RIOT_API_KEY") ? t("apiMissing") : t("accountError")}</p>`;
  }
}

function guessRoles(champion) {
  const tags = champion.tags || [];
  const name = champion.name;
  const map = {
    Aatrox: ["Top"], Ahri: ["Mid"], Akali: ["Mid", "Top"], Akshan: ["Mid", "Top"], Alistar: ["Support"],
    Amumu: ["Jungle", "Support"], Anivia: ["Mid"], Annie: ["Mid", "Support"], Aphelios: ["Bot"], Ashe: ["Bot", "Support"],
    AurelionSol: ["Mid"], Aurora: ["Mid", "Top"], Azir: ["Mid"], Bard: ["Support"], Belveth: ["Jungle"],
    Blitzcrank: ["Support"], Brand: ["Support", "Mid"], Braum: ["Support"], Briar: ["Jungle"], Caitlyn: ["Bot"],
    Camille: ["Top"], Cassiopeia: ["Mid"], Chogath: ["Top"], Corki: ["Mid"], Darius: ["Top"], Diana: ["Jungle", "Mid"],
    Draven: ["Bot"], DrMundo: ["Top"], Ekko: ["Jungle", "Mid"], Elise: ["Jungle"], Evelynn: ["Jungle"], Ezreal: ["Bot"],
    Fiddlesticks: ["Jungle"], Fiora: ["Top"], Fizz: ["Mid"], Galio: ["Mid", "Support"], Gangplank: ["Top"],
    Garen: ["Top"], Gnar: ["Top"], Gragas: ["Jungle", "Top"], Graves: ["Jungle"], Gwen: ["Top"], Hecarim: ["Jungle"],
    Heimerdinger: ["Support", "Mid"], Hwei: ["Mid"], Illaoi: ["Top"], Irelia: ["Top", "Mid"], Ivern: ["Jungle"],
    Janna: ["Support"], JarvanIV: ["Jungle"], Jax: ["Top", "Jungle"], Jayce: ["Top", "Mid"], Jhin: ["Bot"],
    Jinx: ["Bot"], Kaisa: ["Bot"], Kalista: ["Bot"], Karma: ["Support", "Mid"], Karthus: ["Jungle"], Kassadin: ["Mid"],
    Katarina: ["Mid"], Kayle: ["Top"], Kayn: ["Jungle"], Kennen: ["Top"], Khazix: ["Jungle"], Kindred: ["Jungle"],
    Kled: ["Top"], KogMaw: ["Bot"], KSante: ["Top"], Leblanc: ["Mid"], LeeSin: ["Jungle"], Leona: ["Support"],
    Lillia: ["Jungle", "Top"], Lissandra: ["Mid"], Lucian: ["Bot", "Mid"], Lulu: ["Support"], Lux: ["Support", "Mid"],
    Malphite: ["Top"], Malzahar: ["Mid"], Maokai: ["Support", "Jungle"], MasterYi: ["Jungle"], Milio: ["Support"],
    MissFortune: ["Bot"], MonkeyKing: ["Top", "Jungle"], Mordekaiser: ["Top"], Morgana: ["Support"], Naafiri: ["Mid"],
    Nami: ["Support"], Nasus: ["Top"], Nautilus: ["Support"], Neeko: ["Mid", "Support"], Nidalee: ["Jungle"],
    Nilah: ["Bot"], Nocturne: ["Jungle"], Nunu: ["Jungle"], Olaf: ["Top", "Jungle"], Orianna: ["Mid"], Ornn: ["Top"],
    Pantheon: ["Support", "Top"], Poppy: ["Top", "Jungle"], Pyke: ["Support"], Qiyana: ["Mid"], Quinn: ["Top"],
    Rakan: ["Support"], Rammus: ["Jungle"], RekSai: ["Jungle"], Rell: ["Support"], Renata: ["Support"], Renekton: ["Top"],
    Rengar: ["Jungle", "Top"], Riven: ["Top"], Rumble: ["Top", "Mid"], Ryze: ["Mid", "Top"], Samira: ["Bot"],
    Sejuani: ["Jungle"], Senna: ["Support", "Bot"], Seraphine: ["Support", "Bot"], Sett: ["Top", "Support"],
    Shaco: ["Jungle", "Support"], Shen: ["Top"], Shyvana: ["Jungle"], Singed: ["Top"], Sion: ["Top"], Sivir: ["Bot"],
    Skarner: ["Jungle", "Top"], Smolder: ["Bot"], Sona: ["Support"], Soraka: ["Support"], Swain: ["Support", "Mid"],
    Sylas: ["Mid"], Syndra: ["Mid"], TahmKench: ["Support", "Top"], Taliyah: ["Mid", "Jungle"], Talon: ["Mid", "Jungle"],
    Taric: ["Support"], Teemo: ["Top"], Thresh: ["Support"], Tristana: ["Bot", "Mid"], Trundle: ["Jungle", "Top"],
    Tryndamere: ["Top"], TwistedFate: ["Mid"], Twitch: ["Bot"], Udyr: ["Jungle"], Urgot: ["Top"], Varus: ["Bot"],
    Vayne: ["Bot", "Top"], Veigar: ["Mid"], Velkoz: ["Support", "Mid"], Vex: ["Mid"], Vi: ["Jungle"], Viego: ["Jungle"],
    Viktor: ["Mid"], Vladimir: ["Mid", "Top"], Volibear: ["Jungle", "Top"], Warwick: ["Jungle", "Top"], Xayah: ["Bot"],
    Xerath: ["Support", "Mid"], XinZhao: ["Jungle"], Yasuo: ["Mid", "Top"], Yone: ["Mid", "Top"], Yorick: ["Top"],
    Yuumi: ["Support"], Zac: ["Jungle"], Zed: ["Mid"], Zeri: ["Bot"], Ziggs: ["Bot", "Mid"], Zilean: ["Support"],
    Zoe: ["Mid"], Zyra: ["Support"],
  };
  if (map[champion.id]) return map[champion.id];
  if (tags.includes("Support")) return ["Support"];
  if (tags.includes("Marksman")) return ["Bot"];
  if (tags.includes("Assassin") || tags.includes("Mage")) return ["Mid"];
  if (tags.includes("Tank") || tags.includes("Fighter")) return ["Top"];
  return ["Mid"];
}

function sourceLinks(championName, role) {
  const champ = encodeURIComponent(championName.toLowerCase().replaceAll(" ", ""));
  const query = encodeURIComponent(`${championName} ${role} guide patch`);
  return [
    { label: "Riot Data Dragon", url: "https://developer.riotgames.com/docs/lol#data-dragon" },
    { label: "OP.GG", url: `https://www.op.gg/champions/${champ}/build` },
    { label: "LeagueOfGraphs", url: `https://www.leagueofgraphs.com/champions/builds/${champ}` },
    { label: "YouTube", url: `https://www.youtube.com/results?search_query=${query}` },
  ];
}

function findChampion(id) {
  return state.champions.find((champion) => champion.id === id);
}

function inferThreat(text) {
  const value = text.toLowerCase();
  if (/zed|talon|akali|fizz|katarina|rengar|qiyana|asesino/.test(value)) return "asesino";
  if (/veigar|syndra|annie|leblanc|burst|oneshot/.test(value)) return "burst";
  if (/sion|ornn|malphite|ksante|tanque|front/.test(value)) return "tanque";
  if (/xerath|jayce|zoe|varus|poke|rango/.test(value)) return "poke";
  return "equilibrado";
}

function cleanText(value) {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = value;
  return wrapper.textContent || wrapper.innerText || "";
}

function label(value) {
  const labels = {
    es: {
      equilibrado: "Equilibrado",
      asesino: "Asesino",
      burst: "Burst",
      tanque: "Tanque",
      frontline: "Frontline",
      poke: "Poke",
      rango: "Rango",
      early: "Early",
      mid: "Mid",
      late: "Late",
      parejo: "Parejo",
      ganando: "Ganando",
      perdiendo: "Perdiendo",
      ninguno: "Ninguno",
      dragon: "Dragón",
      heraldo: "Heraldo",
      baron: "Barón",
      torre: "Torre",
      alma: "Alma",
      alta: "Alta",
      media: "Media",
      baja: "Baja",
      neutra: "Neutra",
      "empujando hacia ti": "Empujando hacia ti",
      "empujando al rival": "Empujando al rival",
    },
    en: {
      equilibrado: "Balanced",
      asesino: "Assassin",
      burst: "Burst",
      tanque: "Tank",
      frontline: "Frontline",
      poke: "Poke",
      rango: "Range",
      early: "Early",
      mid: "Mid",
      late: "Late",
      parejo: "Even",
      ganando: "Winning",
      perdiendo: "Losing",
      ninguno: "None",
      dragon: "Dragon",
      heraldo: "Rift Herald",
      baron: "Baron",
      torre: "Tower",
      alma: "Soul",
      alta: "High",
      media: "Medium",
      baja: "Low",
      neutra: "Neutral",
      "empujando hacia ti": "Pushing to you",
      "empujando al rival": "Pushing to enemy",
    },
  };
  return labels[state.lang]?.[value] || value.charAt(0).toUpperCase() + value.slice(1);
}

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function uniqueByName(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function winrate(wins, losses) {
  const total = wins + losses;
  if (!total) return "-";
  return `${Math.round((wins / total) * 100)}%`;
}
