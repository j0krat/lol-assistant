const CHAMPIONS = [
    {
        id: 'ahri',
        name: 'Ahri',
        role: 'Mago / Asesino',
        lane: 'Mid',
        emoji: '🦊',
        lore: 'La Zorra de Nueve Colas usa su magia encantadora para drenar las esencias de sus enemigos y moverse por el campo con gracia letal.',
        abilities: [
        { key: 'P', icon: '✨', name: 'Esencia de Ladrón', desc: 'Roba esencia de enemigos con hechizos, curándose al cosechar orbes.' },
        { key: 'Q', icon: '🌀', name: 'Esfera Orbe', desc: 'Lanza un orbe de energía que daña al ir y volver.' },
        { key: 'W', icon: '⚡', name: 'Fuegos Fatuos', desc: 'Pasivos que orbitan dañando y ralentizando enemigos.' },
        { key: 'E', icon: '💫', name: 'Embrujo', desc: 'Proyectil que hechiza al primer enemigo golpeado.' },
        { key: 'R', icon: '🌸', name: 'Espíritu de Zorro', desc: '3 cargas de dash + daño. Su herramienta de movilidad definitiva.' }
        ],
        favorable: [
        { emoji: '⚔️', name: 'Zed', winrate: '57%', reason: 'El embrujo niega sus shuriken' },
        { emoji: '🔥', name: 'Annie', winrate: '55%', reason: 'Movilidad superior en trades' },
        { emoji: '🌙', name: 'Veigar', winrate: '54%', reason: 'Evita su jaula con dashes' }
        ],
        counters: [
        { emoji: '🐉', name: 'Fizz', winrate: '43%', reason: 'Esquiva Q con su E acrobática' },
        { emoji: '🌪️', name: 'Yasuo', winrate: '44%', reason: 'Windwall bloquea Orbe' },
        { emoji: '🛡️', name: 'Malzahar', winrate: '45%', reason: 'Suprimir corta su combo' }
        ],
        build: {
        starter: ['🔮 Libro de Lux', '🧪 Poción'],
        core: ['💎 Liandrys', '⚡ Shadowflame', '🌀 Rabadon'],
        boots: '👟 Zapatos de Hechicero',
        situational: ['❄️ Reloj de Zhonya', '🔮 Morellonomicon', '💜 Void Staff'],
        runes: ['🌀 Electrocución', '🎯 Gusto Repentino', '🌟 Ojos Coleccionables', '🏹 Cazador Último']
        },
        playstyle: 'Ahri es una mage-assassin que prospera en el mid game. Busca trades cortos con Q→E→W en early. Una vez con nivel 6, roamea agresivamente a Bot y Top aprovechando su R. En teamfights, flanquea con R para eliminar carries blandos. Mantén tu E como herramienta de seguimiento y R como escape de emergencia.'
    },
    {
        id: 'jinx',
        name: 'Jinx',
        role: 'Tirador',
        lane: 'Bot',
        emoji: '💥',
        lore: 'Una anarquista explosiva de Zaun que ve la destrucción como arte. Su energía caótica se convierte en puro poder en el late game.',
        abilities: [
        { key: 'P', icon: '🚀', name: 'Éxito Explosivo', desc: 'Mata → velocidad de ataque masiva + velocidad de movimiento.' },
        { key: 'Q', icon: '🔫', name: 'Switcheroo!', desc: 'Alterna entre minigun (velocidad) y lanzacohetes (AoE slow).' },
        { key: 'W', icon: '⚡', name: 'Zap!', desc: 'Rayo que daña y lentifica al primer enemigo.' },
        { key: 'E', icon: '💣', name: 'Llamas Flambox', desc: 'Trampas que ralentizan y detienen enemigos.' },
        { key: 'R', icon: '🎯', name: 'Super Megacohete Mortal', desc: 'Cohete global que escala con el porcentaje de vida perdida.' }
        ],
        favorable: [
        { emoji: '🏹', name: 'Ashe', winrate: '58%', reason: 'Supera su rango en autos' },
        { emoji: '💫', name: 'Sivir', winrate: '56%', reason: 'Minigun derriba su escudo' },
        { emoji: '🌸', name: 'Xayah', winrate: '54%', reason: 'Cohetes limpian sus plumas' }
        ],
        counters: [
        { emoji: '🦁', name: 'Draven', winrate: '42%', reason: 'Daño temprano aplasta su early' },
        { emoji: '⚡', name: 'Kalista', winrate: '43%', reason: 'Movilidad imposible de seguir' },
        { emoji: '🌑', name: 'Miss Fortune', winrate: '44%', reason: 'Bully en early game' }
        ],
        build: {
        starter: ['🏹 Larga Espada', '🧪 Poción x2'],
        core: ['💀 Kraken Slayer', '⚡ Runaan', '❄️ Rapidfire Cannon'],
        boots: '👟 Greavos de Berserker',
        situational: ['🔥 Galeforce', '💥 Estatua de Shojin', '🛡️ Guardian Angel'],
        runes: ['🎯 Hacedor de Letras', '🩸 Presencia de Mente', '🏹 Leyenda: Velocidad de Ataque', '🎖️ Última Parada']
        },
        playstyle: 'Jinx es un hypercarry de late game. En early, juega segura y farmea bajo la presión del support. Con Kraken + Runaan, eres extremadamente peligrosa. Aprovecha cada takedown para activar tu pasiva y snowball. En teamfights, quédate en el backline, nunca seas la primera en entrar. Tu R global puede girar cualquier pelea en el mapa.'
    },
    {
        id: 'thresh',
        name: 'Thresh',
        role: 'Support',
        lane: 'Bot',
        emoji: '⛓️',
        lore: 'El Carcelero Encadenado recolecta almas de los caídos en el Abismo de los Gritos. Su presencia en el campo cambia el destino de una partida.',
        abilities: [
        { key: 'P', icon: '👻', name: 'Recolector de Almas', desc: 'Las almas caídas le dan armadura mágica y daño de habilidad permanentes.' },
        { key: 'Q', icon: '🎣', name: 'Condena a la Oscuridad', desc: 'Gancho que inmoviliza y puede tirar hacia él.' },
        { key: 'W', icon: '🔮', name: 'Linterna Oscura', desc: 'Lanza linterna que protege aliados o les permite relocalizar.' },
        { key: 'E', icon: '🌀', name: 'Brazos Carcomidos', desc: 'Aletazo que empuja o ralentiza según el número de golpes.' },
        { key: 'R', icon: '⚡', name: 'El Cuadro', desc: 'Crea caja de muros que lentifica y atrapa enemigos.' }
        ],
        favorable: [
        { emoji: '🐻', name: 'Braum', winrate: '56%', reason: 'Hook supera su escudo pasivo' },
        { emoji: '🌿', name: 'Soraka', winrate: '57%', reason: 'Sin movilidad para escapar Q' },
        { emoji: '🌸', name: 'Lulu', winrate: '54%', reason: 'Las cadenas superan su CC ligero' }
        ],
        counters: [
        { emoji: '💜', name: 'Blitzcrank', winrate: '44%', reason: 'Su gancho llega primero' },
        { emoji: '🔐', name: 'Nautilus', winrate: '43%', reason: 'Ancla root supera su Q' },
        { emoji: '🌊', name: 'Leona', winrate: '45%', reason: 'All-in nivel 2 aplasta' }
        ],
        build: {
        starter: ['🍄 Relic Shield', '🧪 Poción'],
        core: ['❄️ Locket', '🌿 Moonstone', '👁️ Redemption'],
        boots: '👟 Zapatos de Ímpetu',
        situational: ['🌀 Zeke\'s Convergence', '🛡️ Gargoyle', '💜 Chemtech'],
        runes: ['🌿 Fuente de Vida', '🩸 Font of Life', '🌸 Bone Plating', '🌟 Revitalize']
        },
        playstyle: 'Thresh es un support playmaker con enorme impacto en el juego. Controla el espacio con tu E y usa la linterna para salvar aliados. Tu Q es tu herramienta primaria — nunca hagas un gancho sin tener la fuga considerada. En mid-late game, manda pelea con tu R seguido de Q para aislar carries. Nunca dejes de recolectar almas.'
    },
    {
        id: 'lee-sin',
        name: 'Lee Sin',
        role: 'Jungla',
        lane: 'Jungle',
        emoji: '🥋',
        lore: 'El Monje Ciego ve el mundo a través del sonido. Su dominio del kung-fu lo convierte en el jungler más técnico del Rift.',
        abilities: [
        { key: 'P', icon: '⚡', name: 'Fuego Susurrante', desc: 'Pasiva de ataque doble con shield al usar habilidades.' },
        { key: 'Q', icon: '🎯', name: 'Resonar / Bola Sónica', desc: 'Proyectil que lanza hacia el objetivo impactado.' },
        { key: 'W', icon: '🛡️', name: 'Santuario / Devotion', desc: 'Escudo para aliados. Shield que escala con vida.' },
        { key: 'E', icon: '🌀', name: 'Templado / Crepúsculo', desc: 'Área alrededor que daña y aplica ralentización.' },
        { key: 'R', icon: '💫', name: 'Patada del Dragón', desc: 'Pateada que lanza al enemigo hacia atrás dañando a aliados golpeados.' }
        ],
        favorable: [
        { emoji: '🐺', name: 'Warwick', winrate: '60%', reason: 'Supera su 1v1 en early clears' },
        { emoji: '🌙', name: 'Amumu', winrate: '58%', reason: 'Más movilidad para contrarear' },
        { emoji: '🦔', name: 'Rammus', winrate: '56%', reason: 'Cero movilidad contra sus dives' }
        ],
        counters: [
        { emoji: '🧿', name: 'Elise', winrate: '42%', reason: 'La supera en early jungle' },
        { emoji: '🐉', name: 'Hecarim', winrate: '43%', reason: 'Su velocidad hace difícil seguirlo' },
        { emoji: '🔥', name: 'Lillia', winrate: '44%', reason: 'Kites perfectamente su Q' }
        ],
        build: {
        starter: ['🗡️ Hailblade', '🧪 Poción'],
        core: ['👊 Trinity Force', '💎 Sterak\'s Gage', '⚡ Black Cleaver'],
        boots: '👟 Greavos de Mercurio',
        situational: ['🛡️ Death\'s Dance', '🌀 Ravenous Hydra', '💉 Spear of Shojin'],
        runes: ['🌪️ Conquistador', '🩸 Triunfo', '🏹 Leyenda: Tenacidad', '🎖️ Último Parador']
        },
        playstyle: 'Lee Sin es el jungler más técnico. En early, cleareas camps con Q→doble AA→E→doble AA. Prioriza invades nivel 3 y ganks agresivos. Tu clave es el "Insec": Q a un enemigo, W a un aliado/ward detrás, R para mandar el enemigo hacia tu equipo. Domina el Ward Hop para movilidad. Caes en late game — acaba fuerte en mid game.'
    },
    {
        id: 'yone',
        name: 'Yone',
        role: 'Asesino / Luchador',
        lane: 'Mid / Top',
        emoji: '⚔️',
        lore: 'El hermano mayor de Yasuo, asesinado y resucitado para cazar azakana. Empuña dos katanas y domina tanto el mundo material como el espiritual.',
        abilities: [
        { key: 'P', icon: '🌙', name: 'Camino del Perseguidor', desc: 'Cada 2 golpes aplica una marca que se consume en el tercero para daño masivo.' },
        { key: 'Q', icon: '⚔️', name: 'Filo Mortal', desc: '3 cargas: las dos primeras físicas, la tercera hace AoE mágico.' },
        { key: 'W', icon: '🛡️', name: 'Espíritu Desplegado', desc: 'Escudo que absorbe daño y contraataca.' },
        { key: 'E', icon: '🌀', name: 'Tormenta del Alma', desc: 'Dash en espíritu que canaliza daño.' },
        { key: 'R', icon: '✨', name: 'Destino Irrevocable', desc: 'Entra al mundo espiritual, lanza a todos los enemigos al aire al regresar.' }
        ],
        favorable: [
        { emoji: '🔮', name: 'Viktor', winrate: '58%', reason: 'Movilidad superior en lane' },
        { emoji: '🌙', name: 'Veigar', winrate: '59%', reason: 'Q interrumpe su canalización' },
        { emoji: '🌸', name: 'Lissandra', winrate: '56%', reason: 'Dashes evaden su E y R' }
        ],
        counters: [
        { emoji: '🌊', name: 'Garen', winrate: '41%', reason: 'Silence corta su Q combo' },
        { emoji: '🗡️', name: 'Renekton', winrate: '42%', reason: 'Domina en early con stun' },
        { emoji: '💜', name: 'Malzahar', winrate: '43%', reason: 'Suppress cancela su R' }
        ],
        build: {
        starter: ['🗡️ Larga Espada x2'],
        core: ['💨 Kraken Slayer', '⚡ Guinsoo\'s Rageblade', '🌀 Wit\'s End'],
        boots: '👟 Zapatos de Berserker',
        situational: ['💜 Immortal Shieldbow', '🔥 Phantom Dancer', '🌟 Ravenous Hydra'],
        runes: ['⚡ Letra de Hachazos', '🩸 Triunfo', '🏹 Leyenda: Velocidad Ataque', '🎖️ Último Parador']
        },
        playstyle: 'Yone es un duelista que escala bien a mid game. En early, juega conservador — usa Q1→Q2 para poking y guarda Q3 para el knock up en trades. Con nivel 6, busca R→Q3 para eliminaciones seguras. En teamfights, usa R desde flanco para disrumpir el backline enemigo. La clave es dominar tu passive mark — nunca desperdicies el tercer golpe.'
    },
    {
        id: 'nautilus',
        name: 'Nautilus',
        role: 'Support / Tank',
        lane: 'Bot / Top',
        emoji: '⚓',
        lore: 'Un marinero que murió abandonado en las profundidades, resucitado como guardián encadenado del abismo. Lleva la culpa de aquellos que lo traicionaron.',
        abilities: [
        { key: 'P', icon: '⚓', name: 'Cobertura Costera', desc: 'Primer golpe a cada enemigo lo inmoviliza brevemente.' },
        { key: 'Q', icon: '🌊', name: 'Dredge Line', desc: 'Gancho: se lanza hacia estructuras o arrastra enemigos.' },
        { key: 'W', icon: '🛡️', name: 'Titan\'s Wrath', desc: 'Shield + daño AoE en autos.' },
        { key: 'E', icon: '🌀', name: 'Riptide', desc: 'AoE que ralentiza en zona.' },
        { key: 'R', icon: '💥', name: 'Depth Charge', desc: 'Misil que persigue y hace knock-up en área al impactar.' }
        ],
        favorable: [
        { emoji: '🌸', name: 'Soraka', winrate: '59%', reason: 'Sin escape de tu Q+R combo' },
        { emoji: '🌿', name: 'Yuumi', winrate: '60%', reason: 'CC inmenso bloquea su heal' },
        { emoji: '🌙', name: 'Janna', winrate: '56%', reason: 'Hook la atrapa fuera de posición' }
        ],
        counters: [
        { emoji: '🌊', name: 'Thresh', winrate: '44%', reason: 'Linterna salva a aliados del hook' },
        { emoji: '💥', name: 'Blitzcrank', winrate: '45%', reason: 'Hook más rápido, mismo rango' },
        { emoji: '🐉', name: 'Leona', winrate: '43%', reason: 'Más CC en all-in temprano' }
        ],
        build: {
        starter: ['🍄 Relic Shield', '🧪 Poción'],
        core: ['❄️ Sunfire Cape', '🌿 Heartsteel', '🛡️ Abyssal Mask'],
        boots: '👟 Greavos de Ímpetu',
        situational: ['💜 Warmog\'s Armor', '🌀 Gargoyle Stoneplate', '🔐 Frozen Heart'],
        runes: ['🌿 Fuente de Vida', '🩸 Font of Life', '🌸 Bone Plating', '🌟 Overgrowth']
        },
        playstyle: 'Nautilus es un engager con CC casi infinito. Posiciónate agresivamente para que tu Q sea la amenaza constante. Nivel 2 es tu power spike — Q→P para el doble inmovilización. Con R disponible, inicia desde lejos y sigue con Q. Tu trabajo es crear ventanas para tu ADC, no hacer daño. Agrupa temprano para usar tu kit completo en teamfights.'
    }
];