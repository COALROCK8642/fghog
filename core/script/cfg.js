var NEW_AUTOROUTES = false;
var staticBon = 1;
var dynamicBon = 1;
var distanceBon = 1;
var MOBILE_LANDSCAPE = false;
var MIN_TEXT_SIZE = 0.5;
var MAX_TEXT_SIZE = 1.5;
var DEFAULT_TEXT_SIZE = 1.1;

var SHARED_RESOURCES = false;
var staticBon = 1; 
var dynamicBon = 1; 
var distanceBon = 1;
var dynamicTechBon = 1;
var dynamicResearchBon = 1;
var bodyTextPct = 90;
var POPUP_VERTICAL = true;
var IDLE_BONUS_ENABLED = true;
var AG_SAVE = false;
var userID = 0;

for (var MOBILE = !1, HORIZONS = !0, POPULATION_ENABLED = !1, ENERGY_ENABLED = !0, ALLOW_CIVIS_RENAME = !1, MAP_IMAGE_ZOOM = !1, MAP_ZOOM_STEP = .2, MAP_ZOOM_MIN = 1, MAP_ZOOM_MAX = 2, MAP_REGIONS = !1, GOVERNMENT_HOURS_CHANGE = 8, TRIBAL_REBEL_CHANCE = 2E-4, NEW_AUTOROUTES = !1, UI_FOLDER = "ui", UI_LINE_RESEARCHES = "line.png", UI_LINE_MENU = "line.png", UI_LINE_POPUP = "line.png", UI_LINE_ROUTE = "line.png", UI_ROUTE_LINE_HEIGHT = 3, UI_SHOW_PLANET_RADIUS = !0, UI_SHOW_PLANET_ATMOSPHERE = !0, UI_SHOW_PLANET_ORBITAL_DISTANCE = !0, SETTINGS_PER_ROW = 3, MAP_SHOW_PLANETS_NAME = !0, MAP_SHOW_PLANETS_NAME_HOVER = !1, MAP_PLANET_ICON_SIZE = 48, IMG_FOLDER = "img", SAVESTR_HEAD = "HG", PLANET_FOLDER_DOUBLE = !1, PLANET_IMG_FIELD = "icon", LOCALE_PLANET_NAME = "planet", LOCALE_CIVILIZATION_NAME = "civilization", LOCALE_ATMOSPHERE = "Atmosphere", mi = 1E6, bi = 1E3 * mi, tri = 1E3 * bi, qad = 1E3 * tri, artifactsDefinition = [{
    id: "aurea_core",
    name: "Aurea Core",
    description: "This luminescent gold artifact boosts <span style='blue_text'>Rhodium</span> and <span style='blue_text'>Osmium</span> production by +100%",
    sticky: !1
}, {
    id: "thoroid",
    name: "Mysterious Thoroid",
    description: "This ancient relics is still a marvelous wonder of human engineering. +10% power to all ballistic ships",
    sticky: !0,
    action: function() {
        for (var b = 0; b < game.ships.length; b++)
            "ballistic" == game.ships[b].weapon && (game.ships[b].power *= 1.1)
    },
    unaction: function() {
        for (var b = 0; b < game.ships.length; b++)
            "ballistic" == game.ships[b].weapon && (game.ships[b].power /= 1.1)
    }
}, {
    id: "magnet",
    name: "Self Levitating Magnet",
    description: "This powerful magnet boosts production of <span style='blue_text'>Silicon</span> by +250%",
    action: function() {},
    unaction: function() {
        for (var b = 0; b < game.ships.length; b++)
            game.ships[b].armor /= 1.5
    }
}, {
    id: "necklace",
    name: "Utoma's Necklace",
    description: "This shard points to tsartasis"
}, {
    id: "ancient",
    name: "Idol of Ancient Haleans",
    description: "The following inscription is carved in this relic: Mihra min mi lura krasusia ruthen, Muhra mun mu lura silinusia serul, pachra pan pa lura cininusia pharun"
}, {
    id: "shard",
    name: "Emerald Shard",
    description: "This powerful magnet boosting production of <span style='blue_text'>Silicon</span> by +25%"
}, {
    id: "book_of_life",
    name: "Juini's Book of Life",
    description: "This powerful magnet boosting production of <span style='blue_text'>Silicon</span> by +25%"
}, {
    id: "stone",
    name: "Ling-Wa Stone",
    description: "The rosetta stone of galactic era. Some inscription are still visible: us - iron - ?,  krasnus - ? - rodj, cinii - blue - ?,  mi - ? - un, ma - ? - dva, mu - three - ?, lura - million - ?"
}, {
    id: "totem",
    name: "Totem of Silence",
    description: "It is believed that this black stone is the coldest object in the whole universe."
}, {
    id: "quris_value",
    name: "Medal of Valor",
    description: "To the fearsome battles you have faced. <span style='blue_text'>+50%</span> to all ships hp",
    action: function() {
        for (var b = 0; b < game.ships.length; b++)
            game.ships[b].hp *= 1.5
    },
    unaction: function() {
        for (var b = 0; b < game.ships.length; b++)
            game.ships[b].hp /= 1.5
    }
}, {
    id: "quris_honor",
    name: "Medal of Honor",
    description: "To a long life of glorious fame. <span style='blue_text'>+50%</span> to all ships shields",
    action: function() {
        for (var b = 0; b < game.ships.length; b++)
            game.ships[b].shield *= 1.5
    },
    unaction: function() {
        for (var b = 0; b < game.ships.length; b++)
            game.ships[b].shield /= 1.5
    }
}, {
    id: "quris_glory",
    name: "Medal of Glory",
    description: "To the eternal sunshine of the brave heart. <span style='blue_text'>+5000</span> max experience",
    action: function() {
        MAX_FLEET_EXPERIENCE += 5E3
    },
    unaction: function() {
        MAX_FLEET_EXPERIENCE -= 5E3
    }
}, {
    id: "pillar_fire",
    name: "The Pillar of Fire",
    description: "A stone pillar with inscription showing flames. It will boost lava and acid planets production by 50%",
    action: function() {},
    unaction: function() {}
}, {
    id: "pillar_earth",
    name: "The Pillar of Earth",
    description: "A stone pillar with inscription showing rocks. It will boost terrestrial and desert planets production by 50%",
    action: function() {},
    unaction: function() {}
}, {
    id: "pillar_ice",
    name: "The Pillar of Ice",
    description: "A stone pillar with inscription showing frost. It will boost ice and water planets production by 50%",
    action: function() {},
    unaction: function() {}
}, {
    id: "pillar_air",
    name: "The Pillar of Air",
    description: "A stone pillar with inscription showing wind. It will boost gas giants planets production by 50%",
    action: function() {},
    unaction: function() {}
}, {
    id: "santa",
    name: "Ancient Human Idol",
    description: "An ancient ceremonial idol with red clothes and a white beard. A caption says: 'Merry Christmas 2017!'. +20% production on Kandi",
    sticky: !0,
    action: function() {},
    unaction: function() {}
}, {
    id: "crown",
    name: "Kasparis' Crown",
    description: "The golden crown of the Kasparis' dynasty. Experience gains are increased by +50%",
    sticky: !0,
    action: function() {},
    unaction: function() {}
}, {
    id: "scepter",
    name: "Scepter of the Councilor",
    description: "A golden scepter to show your power amongst the poor commoners. Fleet power by +log2(total weight)%",
    sticky: !0,
    action: function() {},
    unaction: function() {}
}, {
    id: "neutrino_core",
    name: "Neutrino Core",
    description: "One of the most powerful devices in the known universe. It can be used to generate a burst in the Void and destroy attacking enemy fleets. Due to its unstable nature, it cannot survive a time travel.",
    sticky: !1
}, {
    id: "santa2",
    name: "Ancient Deer Idol",
    description: "An ancient ceremonial idol of a deer with a green coat. A caption says: 'Merry Christmas 2018!'",
    sticky: !0,
    action: function() {},
    unaction: function() {}
}], artifactsName = [], a = 0; a < artifactsDefinition.length; a++)
    artifactsName[artifactsDefinition[a].id] = a;
for (var resourcesDefinition = [{
    name: "iron",
    value: 16,
    category: "extraction",
    functional: "construction"
}, {
    name: "steel",
    type: "prod",
    value: 4,
    category: "production",
    functional: "construction"
}, {
    name: "titanium",
    value: 3,
    req: {
        mineralogy: 4
    },
    category: "extraction",
    functional: "construction"
}, {
    name: "silicon",
    type: "prod",
    req: {
        electronics: 1
    },
    value: 11,
    category: "production",
    functional: "refining"
}, {
    name: "graphite",
    value: 7,
    category: "extraction",
    functional: "refining"
}, {
    name: "oil",
    value: 2,
    req: {
        chemical: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "fuel",
    type: "prod",
    value: 6,
    category: "production",
    functional: "energy"
}, {
    name: "hydrogen",
    category: "extraction",
    req: {
        hydro: 1,
        nuclear: 1
    },
    functional: "energy"
}, {
    name: "oxygen",
    req: {
        nononono: 1
    },
    category: "production",
    functional: "population"
}, {
    name: "methane",
    category: "extraction",
    functional: "refining"
}, {
    name: "water",
    req: {
        hydro: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "osmium",
    req: {
        osmium: 1
    },
    category: "extraction",
    functional: "construction"
}, {
    name: "technetium",
    type: "prod",
    req: {
        halean: 1
    },
    functional: "construction"
}, {
    name: "rhodium",
    req: {
        rhodium: 1
    },
    category: "extraction",
    functional: "construction"
}, {
    name: "uranium",
    req: {
        mineralogy: 4
    },
    category: "extraction",
    functional: "energy"
}, {
    name: "plastic",
    type: "prod",
    req: {
        chemical: 4
    },
    value: 29,
    category: "production",
    functional: "construction"
}, {
    name: "circuit",
    type: "prod",
    req: {
        electronics: 1
    },
    value: 18,
    category: "production",
    functional: "construction"
}, {
    name: "nanotubes",
    type: "prod",
    req: {
        material: 14
    },
    category: "production",
    functional: "construction"
}, {
    name: "ice",
    req: {
        ice: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "biomass",
    category: "extraction",
    functional: "population",
    req: {
        environment: 1
    }
}, {
    name: "ammunition",
    type: "prod",
    req: {
        military: 1
    },
    quests: {
        city_5: 0
    },
    category: "military",
    functional: "military"
}, {
    name: "sand",
    req: {
        mineralogy: 4
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "empty cryocell",
    type: "prod",
    req: {
        nononono: 2
    },
    category: "production",
    functional: "population"
}, {
    name: "coolant",
    type: "prod",
    req: {
        ice: 10
    },
    category: "production",
    functional: "refining"
}, {
    name: "robots",
    type: "prod",
    req: {
        artificial_intelligence: 1,
        halean: 1
    },
    category: "production",
    functional: "construction"
}, {
    name: "armor",
    type: "prod",
    req: {
        military: 12
    },
    category: "military",
    functional: "military"
}, {
    name: "engine",
    type: "prod",
    req: {
        military: 16
    },
    category: "military",
    functional: "construction"
}, {
    name: "empty battery",
    type: "prod",
    req: {
        electronics: 8
    },
    category: "production",
    functional: "energy"
}, {
    name: "full battery",
    type: "prod",
    req: {
        electronics: 8
    },
    category: "production",
    functional: "energy"
}, {
    name: "u-ammunition",
    type: "prod",
    req: {
        military: 8
    },
    category: "military",
    functional: "military"
}, {
    name: "t-ammunition",
    type: "prod",
    req: {
        artofwar: 1
    },
    category: "military",
    functional: "military"
}, {
    name: "sulfur",
    req: {
        vulcan: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "antimatter",
    type: "prod",
    req: {
        quantum: 1
    },
    category: "production",
    functional: "energy"
}, {
    name: "mK Embryo",
    type: "prod",
    req: {
        osmium: 1
    },
    category: "production",
    functional: "construction"
}, {
    name: "superconductors",
    type: "prod",
    req: {
        electronics: 30
    },
    category: "production",
    functional: "construction"
}, {
    name: "caesium",
    req: {
        karan_nuclear: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "thorium",
    req: {
        karan_nuclear: 1
    },
    category: "extraction",
    functional: "energy"
}, {
    name: "ammonia",
    req: {
        ammonia_chemistry: 1
    },
    category: "extraction",
    functional: "refining"
}, {
    name: "loaded cryocell",
    type: "prod",
    req: {
        nononono: 2
    },
    category: "production",
    functional: "population"
}, {
    name: "dark matter",
    type: "prod",
    req: {
        darkmatter_science: 1
    },
    category: "production",
    functional: "energy"
}, {
    name: "meissnerium",
    type: "prod",
    req: {
        electronics: 30
    },
    category: "production",
    functional: "refining"
}, {
    name: "meissner cell",
    type: "prod",
    req: {
        electronics: 35
    },
    category: "production",
    functional: "refining"
}, {
    name: "shield capsule",
    type: "prod",
    req: {
        protohalean_science: 5
    },
    category: "production",
    functional: "refining"
}, {
    name: "explosives",
    type: "prod",
    req: {
        xiran_artofwar: 1
    },
    category: "production",
    functional: "refining"
}, {
    name: "biocell",
    type: "prod",
    req: {
        mk_tech: 30
    },
    category: "production",
    functional: "refining"
}, {
    name: "biocircuit",
    type: "prod",
    req: {
        mk_tech: 30
    },
    category: "production",
    functional: "refining"
}, {
    name: "qasers",
    type: "prod",
    req: {
        protohalean_science: 1
    },
    category: "production",
    functional: "refining"
}, {
    name: "xirandrium",
    type: "prod",
    req: {
        xiran_artofwar: 1
    },
    category: "production",
    functional: "refining"
}], planetsDefinition = [{
    moon: {
        size: 8,
        type: "metallic"
    },
    influence: 1,
    name: "Promision",
    baseRes: {
        biomass: 1,
        iron: 1,
        graphite: 1,
        titanium: 1,
        silicon: 1,
        oil: 1,
        uranium: 1,
        population: .05,
        water: 1,
        methane: 1,
        sand: .5
    },
    icon: "promision",
    pos: [64, 64],
    type: "terrestrial",
    info: {
        radius: 6833,
        temp: 22,
        atmos: "Oxygen",
        orbit: 1
    }
}, {
    moon: {
        size: 7,
        type: "metallic"
    },
    influence: 1,
    name: "Vasilis",
    unlock: "ice",
    baseRes: {
        coolant: 2,
        biomass: .5,
        iron: 1,
        titanium: 1.5,
        uranium: 1,
        ice: 2,
        population: .03,
        methane: 2,
        oil: .5
    },
    icon: "vasilis",
    pos: [161, 94],
    type: "ice",
    info: {
        radius: 5201,
        temp: -21,
        atmos: "Oxygen",
        orbit: 2.9
    }
}, {
    moon: {
        size: 11,
        type: "metallic"
    },
    influence: 1,
    name: "Aequoreas",
    baseRes: {
        population: .08,
        sand: 2,
        iron: 1,
        titanium: 1.5,
        oil: 1,
        water: 5
    },
    icon: "aequoreas",
    pos: [30, 145],
    type: "ocean",
    info: {
        radius: 8890,
        temp: 18,
        atmos: "Oxygen",
        orbit: .7
    },
    unlock: "hydro"
}, {
    moon: {
        size: 5,
        type: "ice"
    },
    influence: 1,
    name: "Orpheus",
    baseRes: {
        hydrogen: 8,
        methane: 3,
        technetium: 2
    },
    icon: "orpheus",
    pos: [53, 229],
    type: "gas giant",
    info: {
        radius: 18540,
        temp: -141,
        atmos: "Hydrogen",
        orbit: 8.2
    }
}, {
    influence: 8,
    name: "The City",
    baseRes: {
        population: .01,
        thorium: .5,
        biomass: .1,
        ammunition: 2,
        "u-ammunition": 1.5,
        iron: 3,
        graphite: 3,
        titanium: 2,
        uranium: 1.5,
        ice: 1.2,
        methane: 2.2,
        osmium: .5
    },
    icon: "mexager",
    pos: [166, 302],
    type: "ice",
    info: {
        radius: 4235,
        temp: -8,
        atmos: "Oxygen",
        orbit: 1.82
    }
}, {
    moon: {
        size: 15,
        type: "terrestrial"
    },
    influence: 15,
    name: "Traumland",
    baseRes: {
        biomass: 1,
        iron: 1,
        titanium: 1.2,
        sand: 1,
        oil: 2,
        uranium: .25,
        population: .12,
        water: .6,
        silicon: 2,
        graphite: 2,
        methane: 1
    },
    icon: "lagea",
    pos: [448, 236],
    type: "terrestrial",
    info: {
        radius: 6550,
        temp: 28,
        atmos: "Oxygen",
        orbit: .7
    }
}, {
    influence: 18,
    name: "Tataridu",
    unlock: "environment",
    baseRes: {
        population: .2,
        biomass: 2,
        iron: .5,
        uranium: 2,
        oil: 2.6,
        water: .25,
        methane: 2.8,
        circuit: 2
    },
    icon: "traumland",
    pos: [384, 64],
    type: "terrestrial",
    info: {
        radius: 3118,
        temp: 38,
        atmos: "Oxygen",
        orbit: .45
    }
}, {
    influence: 12,
    name: "Ishtar Gate",
    baseRes: {
        population: .008,
        graphite: 2,
        sand: 1,
        uranium: 1,
        water: 3.2,
        oil: .5,
        nanotubes: 2
    },
    icon: "santorini",
    pos: [256, 192],
    type: "ocean",
    info: {
        radius: 7020,
        temp: 3,
        atmos: "CO<sub>2</sub>",
        orbit: 2.8
    }
}, {
    moon: {
        size: 9,
        type: "metallic"
    },
    influence: 31,
    name: "Acanthus",
    baseRes: {
        "dark matter": 2,
        thorium: 1.5,
        osmium: 2.2,
        methane: 3.2,
        ice: 5,
        titanium: 2,
        uranium: 3
    },
    icon: "miselquris",
    pos: [275, 422],
    type: "ice",
    info: {
        radius: 5155,
        temp: -12,
        atmos: "CO<sub>2</sub>",
        orbit: 2.4
    }
}, {
    moon: {
        size: 9,
        type: "radioactive"
    },
    influence: 34,
    name: "Antaris",
    unlock: "artofwar",
    baseRes: {
        thorium: 1.2,
        "t-ammunition": 2,
        methane: 2,
        titanium: 1,
        uranium: 2,
        iron: 3,
        rhodium: .5
    },
    icon: "antaris",
    pos: [410, 687],
    type: "metallic",
    info: {
        radius: 6052,
        temp: 32,
        atmos: "CO<sub>2</sub>",
        orbit: 1.4
    }
}, {
    moon: {
        size: 12,
        type: "ice"
    },
    influence: 32,
    name: "Yin Raknar",
    baseRes: {
        thorium: .5,
        osmium: 1.8,
        methane: 2,
        ice: 3,
        titanium: 3,
        uranium: 1,
        iron: 2,
        graphite: 5
    },
    icon: "kurol",
    pos: [164, 440],
    type: "ice",
    info: {
        radius: 4081,
        temp: -31,
        atmos: "CO<sub>2</sub>",
        orbit: 4.5
    }
}, {
    influence: 36,
    name: "Teleras",
    baseRes: {
        methane: 3,
        titanium: 2,
        uranium: 3,
        iron: 1,
        rhodium: 1
    },
    icon: "teleras",
    pos: [557, 541],
    type: "metallic",
    info: {
        radius: 10733,
        temp: 202,
        atmos: "Methane",
        orbit: .2
    }
}, {
    influence: 38,
    name: "Jabir",
    baseRes: {
        caesium: 1,
        methane: 2,
        titanium: 4,
        uranium: 1,
        iron: 2,
        rhodium: 1.2
    },
    icon: "jabir",
    pos: [448, 576],
    type: "metallic",
    info: {
        radius: 8220,
        temp: 182,
        atmos: "Methane",
        orbit: .26
    }
}, {
    moon: {
        size: 17,
        type: "ocean"
    },
    influence: 75,
    name: "Plus Caerul",
    baseRes: {
        antimatter: 2,
        hydrogen: 8.66,
        methane: 3.22,
        technetium: 8
    },
    icon: "caerul",
    pos: [1127, 256],
    type: "gas giant",
    info: {
        radius: 21155,
        temp: -122,
        atmos: "Hydrogen",
        orbit: 9.84
    }
}, {
    moon: {
        size: 3,
        type: "metallic"
    },
    influence: 68,
    name: "Bharash",
    baseRes: {
        hydrogen: 89,
        methane: 48.5,
        technetium: 5
    },
    icon: "bhara",
    pos: [1198, 636],
    type: "gas giant",
    info: {
        radius: 45420,
        temp: -92,
        atmos: "Hydrogen",
        orbit: 3.01
    }
}, {
    influence: 57,
    name: "Zhura Nova",
    baseRes: {
        "dark matter": 2,
        hydrogen: 80,
        methane: 51.5,
        technetium: 3.5
    },
    icon: "zhura",
    pos: [1109, 454],
    type: "gas giant",
    info: {
        radius: 36420,
        temp: -135,
        atmos: "Hydrogen",
        orbit: 5.8
    },
    unlock: "quantum"
}, {
    moon: {
        size: 24,
        type: "metallic"
    },
    influence: 46,
    name: "Epsilon Rutheni",
    baseRes: {
        sand: 8,
        iron: 4.82,
        titanium: 1.35,
        uranium: .2,
        rhodium: 2.5,
        silicon: 2
    },
    icon: "epsilon",
    pos: [948, 310],
    info: {
        radius: 12301,
        temp: 74,
        atmos: "CO<sub>2</sub>",
        orbit: .44
    },
    type: "desert"
}, {
    influence: 27,
    name: "Posirion",
    unlock: "halean",
    baseRes: {
        hydrogen: 51.3,
        methane: 18.41,
        technetium: 2
    },
    icon: "posirion",
    pos: [854, 62],
    type: "gas giant",
    info: {
        radius: 48270,
        temp: -189,
        atmos: "Hydrogen",
        orbit: 17.22
    }
}, {
    influence: 33,
    name: "Phorun",
    baseRes: {
        hydrogen: 31.3,
        methane: 28.41,
        technetium: 2.8
    },
    icon: "traurig",
    pos: [1048, 162],
    type: "gas giant",
    info: {
        radius: 28270,
        temp: -89,
        atmos: "Hydrogen",
        orbit: 7.22
    }
}, {
    moon: {
        size: 15,
        type: "terrestrial"
    },
    influence: 57,
    name: "Kitrion",
    baseRes: {
        iron: 3.2,
        titanium: 2.66,
        uranium: 1.95,
        silicon: 7.5,
        sand: 2.4,
        rhodium: 2.54,
        oil: 2.7
    },
    icon: "kitrino",
    pos: [700, 430],
    type: "desert",
    info: {
        radius: 4504,
        temp: 77,
        atmos: "CO<sub>2</sub>",
        orbit: .77
    }
}, {
    moon: {
        size: 31,
        type: "radioactive"
    },
    influence: 82,
    name: "Mermorra",
    baseRes: {
        "dark matter": 2,
        caesium: 3,
        methane: 3.2,
        hydrogen: 15.4,
        antimatter: 2
    },
    icon: "mermorra",
    pos: [820, 590],
    type: "gas giant",
    info: {
        caesium: 8,
        radius: 88706,
        temp: 305,
        atmos: "Hydrogen",
        orbit: .31
    }
}, {
    influence: 63,
    name: "Ares",
    baseRes: {
        oil: 2.09,
        iron: 2.81,
        titanium: 2.2,
        sand: 8.33,
        uranium: 1.37,
        rhodium: 1.8
    },
    icon: "ares",
    pos: [172, 807],
    type: "desert",
    info: {
        radius: 3402,
        temp: 84,
        atmos: "CO<sub>2</sub>",
        orbit: 1.42
    }
}, {
    influence: 65,
    name: "Kandi",
    baseRes: {
        iron: 1.76,
        titanium: 1.75,
        uranium: 1.2,
        ice: 4.8,
        osmium: 1.9,
        rhodium: 2.5
    },
    icon: "kandi",
    pos: [360, 920],
    info: {
        radius: 4504,
        temp: -22,
        atmos: "CO<sub>2</sub>",
        orbit: 3.31
    },
    type: "ice"
}, {
    influence: 32,
    name: "Shin Sung",
    unlock: "osmium",
    baseRes: {
        iron: 4.1,
        titanium: 3.5,
        uranium: 2.2,
        ice: 3.2,
        water: 2,
        osmium: 3.7,
        "mK Embryo": 2
    },
    icon: "echoes",
    pos: [640, 900],
    info: {
        radius: 4504,
        temp: -85,
        atmos: "CO<sub>2</sub>",
        orbit: 8.31
    },
    type: "ice"
}, {
    influence: 128,
    name: "Xora Tauri II",
    baseRes: {
        caesium: 2.1,
        thorium: 1.2,
        osmium: 3.1,
        iron: 8.7,
        titanium: 5.7,
        uranium: 13.4,
        rhodium: 2.6
    },
    icon: "xora2",
    pos: [832, 930],
    type: "metallic",
    info: {
        radius: 6577,
        temp: -181,
        atmos: "CO<sub>2</sub>",
        orbit: 9.46
    }
}, {
    influence: 29,
    name: "Tsartasis",
    baseRes: {
        iron: 2.7,
        titanium: 3.7,
        uranium: 5.4,
        sand: 2,
        rhodium: 1.6
    },
    icon: "tsartasis",
    pos: [680, 750],
    type: "desert",
    info: {
        radius: 4504,
        temp: 102,
        atmos: "CO<sub>2</sub>",
        orbit: .31
    },
    unlock: "rhodium"
}, {
    influence: 173,
    name: "Xora Tauri",
    baseRes: {
        thorium: .8,
        osmium: 5,
        methane: 2.2,
        iron: 4.1,
        titanium: 9.5,
        uranium: 7.2,
        silicon: 5.2,
        rhodium: 8.7
    },
    icon: "xora",
    pos: [960, 960],
    type: "metallic",
    info: {
        radius: 8230,
        temp: -58,
        atmos: "Methane",
        orbit: 7.45
    },
    unlock: "secret"
}, {
    influence: 22,
    name: "Zelera",
    unlock: "artificial_intelligence",
    baseRes: {
        osmium: 1.8,
        ice: 3,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        methane: 2
    },
    icon: "zelera",
    pos: [750, 200],
    type: "ice",
    info: {
        radius: 8230,
        temp: -30,
        atmos: "Methane",
        orbit: 7.45
    }
}, {
    influence: 5,
    name: "Antirion",
    unlock: "military",
    baseRes: {
        thorium: .2,
        rhodium: 1.5,
        iron: 3,
        titanium: 3,
        uranium: 2,
        graphite: .5,
        methane: 2.4,
        plastic: 2
    },
    icon: "uanass",
    pos: [30, 370],
    type: "metallic",
    info: {
        radius: 2230,
        temp: -66,
        atmos: "Methane",
        orbit: 5.45
    }
}, {
    influence: 650,
    name: "New Babilo",
    baseRes: {
        nanotubes: 5,
        ice: 3,
        water: .8,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        osmium: 3
    },
    icon: "virgo",
    pos: [378, 318],
    type: "ice",
    info: {
        radius: 8230,
        temp: -58,
        atmos: "CO<sub>2</sub>",
        orbit: 7.45
    }
}, {
    influence: 650,
    name: "Seal of Conquest",
    baseRes: {
        nanotubes: 5,
        ice: 5,
        water: .8,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        rhodium: 18.7,
        technetium: 3
    },
    icon: "dx",
    pos: [1E3, 128],
    type: "ice",
    info: {
        radius: 8230,
        temp: -8,
        atmos: "CO<sub>2</sub>",
        orbit: 1.33
    }
}, {
    influence: 650,
    name: "Seal of Famine",
    baseRes: {
        nanotubes: 5,
        ice: 2,
        water: .8,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        rhodium: 18.7,
        technetium: 3
    },
    icon: "dx",
    pos: [900, 230],
    type: "ice",
    info: {
        radius: 8230,
        temp: -25,
        atmos: "CO<sub>2</sub>",
        orbit: 5.08
    }
}, {
    influence: 650,
    name: "Seal of War",
    baseRes: {
        nanotubes: 5,
        ice: 3,
        water: .8,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        rhodium: 18.7,
        technetium: 3
    },
    icon: "fx",
    pos: [830, 380],
    type: "lava",
    info: {
        radius: 8230,
        temp: 322,
        atmos: "Sulfur",
        orbit: .45
    }
}, {
    influence: 650,
    name: "Seal of Death",
    baseRes: {
        sulfur: 2.7
    },
    icon: "dx",
    pos: [720, 240],
    type: "lava",
    info: {
        radius: 1561,
        temp: -58,
        atmos: "Sulfur",
        orbit: .25
    }
}, {
    influence: 650,
    name: "Solidad",
    baseRes: {
        nanotubes: 5,
        ice: 3,
        biomass: 3,
        water: .8,
        iron: 4,
        titanium: 3.5,
        uranium: 2.2,
        robots: 2,
        rhodium: 18.7,
        technetium: 3
    },
    icon: "x",
    pos: [378, 318],
    type: "lava",
    info: {
        radius: 8230,
        temp: -58,
        atmos: "CO<sub>2</sub>",
        orbit: 7.45
    }
}, {
    influence: 1,
    name: "Kartarid",
    baseRes: {
        population: -10,
        titanium: .58,
        uranium: 2.02,
        rhodium: .79,
        ice: .26
    },
    icon: "x",
    pos: [8E3, 0],
    type: "Rock Planet"
}, {
    influence: 1,
    name: "Cerberus",
    baseRes: {
        iron: 3.42,
        steel: 2,
        plastic: .1,
        titanium: 2.17,
        uranium: .8,
        rhodium: 1.8,
        graphite: 3.4,
        silicon: 1.5
    },
    type: "Lava Planet",
    icon: "x",
    pos: [8E3, 880]
}, {
    influence: 1,
    name: "Child of the Grave"
}, {
    influence: 1,
    name: "Tregemelli"
}, {
    influence: 1,
    name: "Zurkarap"
}, {
    influence: 1,
    name: "Garden of Flowers"
}, {
    influence: 38,
    name: "Lone Nassaus",
    unlock: "vulcan",
    baseRes: {
        thorium: 1.5,
        rhodium: 1.8,
        graphite: 3.4,
        sulfur: 1,
        titanium: 5
    },
    type: "lava",
    icon: "nassaus",
    pos: [80, 520],
    info: {
        radius: 6771,
        temp: 582,
        atmos: "Sulfur",
        orbit: .1
    }
}, {
    influence: 5,
    name: "Solidad",
    baseRes: {
        population: .15,
        biomass: 3,
        iron: 3,
        graphite: 2,
        titanium: 3,
        methane: 2,
        oil: 1.5,
        water: .5
    },
    icon: "solidad",
    pos: [578, 33],
    type: "terrestrial",
    info: {
        radius: 5741,
        temp: 38,
        atmos: "Oxygen",
        orbit: .85
    }
}, {
    influence: 900,
    name: "Seal of Conquest",
    baseRes: {
        coolant: 1.5,
        ice: 5,
        titanium: 1,
        osmium: 2.8,
        uranium: 1.5,
        biomass: .5,
        graphite: 1.6
    },
    icon: "conquest",
    pos: [655, 158],
    type: "ice",
    info: {
        radius: 3220,
        temp: -158,
        atmos: "CO<sub>2</sub>",
        orbit: 3
    }
}, {
    influence: 1850,
    name: "Seal of Famine",
    baseRes: {
        coolant: 2,
        biomass: .8,
        ice: 2.5,
        titanium: 3.5,
        uranium: 4,
        iron: 8,
        methane: 1.8
    },
    icon: "kartarid",
    pos: [580, 241],
    type: "ice",
    info: {
        radius: 2891,
        temp: -171,
        atmos: "CO<sub>2</sub>",
        orbit: 8
    }
}, {
    influence: 2498,
    name: "Seal of War",
    baseRes: {
        armor: 3,
        engine: 3,
        thorium: 4,
        sulfur: 2.5,
        graphite: 1.7,
        titanium: 5,
        rhodium: .5
    },
    icon: "cerberus",
    pos: [468, 261],
    type: "lava",
    info: {
        radius: 4230,
        temp: 322,
        atmos: "Sulfur",
        orbit: .45
    }
}, {
    influence: 3132,
    name: "Seal of Death",
    baseRes: {
        sulfur: 2.7,
        thorium: 2,
        rhodium: 3,
        graphite: 3.5,
        titanium: 1.2,
        engine: 5
    },
    icon: "death",
    pos: [633, 341],
    type: "lava",
    info: {
        radius: 5661,
        temp: 591,
        atmos: "Sulfur",
        orbit: .25
    }
}, {
    influence: 3844,
    name: "Berenil",
    baseRes: {
        sand: 1.5,
        titanium: .5,
        oil: 1,
        water: 3,
        graphite: 3,
        rhodium: 11
    },
    icon: "yanyin",
    pos: [864, 264],
    type: "ocean",
    info: {
        radius: 12242,
        temp: 31,
        atmos: "Hydrogen",
        orbit: .8
    }
}, {
    influence: 5222,
    name: "Siris",
    baseRes: {
        sand: 2.5,
        uranium: .8,
        oil: 1.2,
        water: 1.5,
        graphite: 2.8,
        osmium: 7.1
    },
    icon: "siris",
    pos: [963, 139],
    type: "ocean",
    info: {
        radius: 15180,
        temp: 6,
        atmos: "Hydrogen",
        orbit: 1.7
    }
}, {
    influence: 6920,
    name: "Xilea",
    baseRes: {
        caesium: .5,
        sand: .5,
        uranium: 3.1,
        titanium: 2.2,
        water: 5,
        graphite: 1
    },
    icon: "xilea",
    pos: [1133, 113],
    type: "ocean",
    info: {
        radius: 15705,
        temp: 19,
        atmos: "Hydrogen",
        orbit: 1.12
    }
}, {
    influence: 15520,
    name: "Twin Asun",
    unlock: "protohalean_science",
    baseRes: {
        sand: 1,
        iron: 2,
        uranium: 5.7,
        titanium: 2,
        water: 12
    },
    icon: "asun",
    pos: [1070, 293],
    type: "ocean",
    info: {
        radius: 13010,
        temp: 3,
        atmos: "Hydrogen",
        orbit: 2.04
    }
}, {
    influence: 4711,
    name: "Dagama",
    baseRes: {
        population: .25,
        biomass: 2.5,
        sand: 1.5,
        titanium: .5,
        oil: 1,
        water: 3,
        graphite: 3
    },
    icon: "swamp",
    pos: [670, 474],
    type: "terrestrial",
    info: {
        radius: 5390,
        temp: 21,
        atmos: "Oxygen",
        orbit: .72
    },
    unlock: "space_mining"
}, {
    influence: 5898,
    name: "Columbus",
    baseRes: {
        thorium: 1.8,
        iron: 2,
        graphite: 5.1,
        uranium: 15.6,
        osmium: 2.7
    },
    icon: "columbus",
    pos: [541, 552],
    type: "radioactive",
    info: {
        radius: 8004,
        temp: -26,
        atmos: "CO<sub>2</sub>",
        orbit: 1.5
    }
}, {
    influence: 8004,
    name: "Magellan",
    baseRes: {
        meissnerium: 1.8,
        caesium: 1,
        titanium: 2.5,
        graphite: 3,
        sulfur: 5
    },
    icon: "magellan",
    pos: [643, 626],
    type: "acid",
    info: {
        radius: 4532,
        temp: 370,
        atmos: "Sulfuric Acid",
        orbit: .6
    }
}, {
    influence: 11422,
    name: "Gerlache",
    baseRes: {
        ice: 2.9,
        thorium: 3,
        sand: 1.5,
        titanium: .5,
        oil: 1,
        water: 3,
        graphite: 3
    },
    icon: "gerlache",
    pos: [809, 592],
    type: "ice",
    info: {
        radius: 2801,
        temp: -71,
        atmos: "Oxygen",
        orbit: 2.9
    }
}, {
    influence: 21870,
    name: "Gagarin",
    baseRes: {
        "dark matter": 2.2,
        sand: 1.5,
        titanium: .5,
        oil: 1,
        water: 1,
        graphite: 3
    },
    icon: "gagarin",
    pos: [834, 713],
    type: "terrestrial",
    info: {
        radius: 7268,
        temp: 15,
        atmos: "Oxygen",
        orbit: .5
    }
}, {
    influence: 580,
    name: "Alfari",
    baseRes: {
        ammunition: 2,
        sand: 5,
        titanium: 15.5,
        silicon: 3,
        oil: 3,
        water: 1,
        graphite: 8
    },
    icon: "alfari",
    pos: [320, 84],
    type: "desert",
    info: {
        radius: 8256,
        temp: 68,
        atmos: "CO<sub>2</sub>",
        orbit: .7
    },
    unlock: "karan_artofwar"
}, {
    influence: 808,
    name: "Xenovirgo",
    baseRes: {
        "u-ammunition": 2,
        thorium: 1.8,
        titanium: 8,
        graphite: 11,
        uranium: 7,
        rhodium: 4.8,
        osmium: 3.5
    },
    icon: "xeno",
    pos: [200, 51],
    type: "radioactive",
    info: {
        radius: 4009,
        temp: -101,
        atmos: "CO<sub>2</sub>",
        orbit: 11.81
    },
    unlock: "karan_nuclear"
}, {
    influence: 32740,
    name: "Caligon Flavus",
    baseRes: {
        meissnerium: 1.5,
        caesium: 1.5,
        sulfur: 6.2,
        titanium: 3,
        graphite: 2,
        rhodium: 7
    },
    icon: "caligo",
    pos: [80, 96],
    type: "acid",
    info: {
        radius: 6208,
        temp: 322,
        atmos: "Sulfuric Acid",
        orbit: .52
    }
}, {
    influence: 9E4,
    name: "Halea",
    baseRes: {
        titanium: 18,
        graphite: 15,
        sand: 15,
        water: 18
    },
    icon: "halea",
    pos: [980, 401],
    type: "ocean",
    info: {
        radius: 9889,
        temp: 22,
        atmos: "Hydrogen",
        orbit: .8
    }
}, {
    influence: 18E3,
    name: "Persephone",
    baseRes: {
        population: .2,
        biomass: 5,
        titanium: 18,
        graphite: 15,
        sand: 15,
        water: 18
    },
    icon: "persephone",
    pos: [338, 336],
    type: "terrestrial",
    info: {
        radius: 5366,
        temp: 25,
        atmos: "Oxygen",
        orbit: 1.1
    }
}, {
    influence: 44E3,
    name: "Hades",
    baseRes: {
        "dark matter": 1.8,
        population: .05,
        titanium: 18,
        graphite: 15,
        sand: 15,
        water: 18
    },
    icon: "hades",
    pos: [180, 290],
    type: "desert",
    info: {
        radius: 2251,
        temp: 41,
        atmos: "Oxygen",
        orbit: .9
    }
}, {
    influence: 15E4,
    name: "Demeter",
    baseRes: {
        "dark matter": 2.5,
        hydrogen: 6,
        methane: 54,
        technetium: 8
    },
    icon: "demeter",
    pos: [80, 350],
    type: "gas giant",
    info: {
        radius: 89044,
        temp: 422,
        atmos: "Helium",
        orbit: .1
    }
}, {
    influence: 58E3,
    name: "Hermr",
    baseRes: {
        thorium: 2.5,
        sulfur: 3.4,
        titanium: 3,
        engine: 5
    },
    icon: "hermr",
    pos: [300, 400],
    type: "acid",
    info: {
        radius: 2007,
        temp: 282,
        atmos: "CO<sub>2</sub>",
        orbit: 4
    }
}, {
    influence: 98E3,
    name: "Calipsi Theta",
    baseRes: {
        ammonia: 6.2,
        titanium: 2.5,
        uranium: 1.1,
        coolant: 5
    },
    icon: "calipsi",
    pos: [210, 500],
    type: "ammonia",
    info: {
        radius: 3015,
        temp: -58,
        atmos: "Nitrogen",
        orbit: 5.6
    }
}, {
    influence: 6E4,
    unlock: "ammonia_chemistry",
    name: "Auriga",
    baseRes: {
        ammonia: 12,
        uranium: 5
    },
    icon: "auriga",
    pos: [320, 440],
    type: "ammonia",
    info: {
        radius: 3847,
        temp: -64,
        atmos: "Nitrogen",
        orbit: 8.5
    }
}, {
    influence: 164E3,
    name: "Cygnus Rufus",
    baseRes: {
        "dark matter": 2,
        ammonia: 15.8
    },
    icon: "cygnus",
    pos: [250, 650],
    type: "ammonia",
    info: {
        radius: 4382,
        temp: -72,
        atmos: "Nitrogen",
        orbit: 5.2
    }
}, {
    influence: 152E3,
    name: "Forax",
    baseRes: {
        graphite: 25,
        titanium: 8,
        thorium: 4.5,
        nanotubes: 55
    },
    icon: "forax",
    pos: [22, 590],
    type: "carbon",
    info: {
        radius: 3766,
        temp: -22,
        atmos: "Nitrogen",
        orbit: 3
    }
}, {
    influence: 25E4,
    name: "Volor Ashtar",
    baseRes: {
        titanium: 12,
        graphite: 15,
        thorium: 7.1,
        nanotubes: 135
    },
    icon: "volor",
    pos: [230, 820],
    type: "carbon",
    info: {
        radius: 2541,
        temp: -28,
        atmos: "Nitrogen",
        orbit: 6.1
    }
}, {
    influence: 103E3,
    name: "Discordia",
    baseRes: {
        meissnerium: 2,
        iron: 7,
        titanium: .1,
        methane: .9,
        water: 1,
        rhodium: 2.1,
        uranium: 1.5,
        ice: 1.7
    },
    icon: "discordia",
    pos: [247, 304],
    type: "ice",
    info: {
        radius: 5047,
        temp: -20,
        atmos: "CO<sub>2</sub>",
        orbit: 5.1
    }
}, {
    influence: 105E3,
    name: "Mallus Ushtar",
    baseRes: {
        "t-ammunition": 2,
        technetium: 4,
        ammonia: 14.7
    },
    icon: "mallus",
    pos: [325, 120],
    type: "ammonia",
    info: {
        radius: 4059,
        temp: -62,
        atmos: "Nitrogen",
        orbit: 5.3
    }
}, {
    influence: 23E4,
    name: "Poseidon's Eye",
    baseRes: {
        caesium: 5.5,
        graphite: 6.7,
        oil: 1.1,
        water: 7.7,
        sand: 5.1
    },
    icon: "lascura",
    pos: [80, 518],
    type: "ocean",
    info: {
        radius: 8397,
        temp: 10,
        atmos: "Hydrogen",
        orbit: 1.5
    }
}, {
    influence: 28E4,
    name: "Pollux Infiris",
    baseRes: {
        iron: 3.7,
        titanium: 1.7,
        methane: .7,
        rhodium: 3.7,
        uranium: 4.3,
        thorium: .7,
        superconductors: 2
    },
    icon: "pollux",
    pos: [305, 521],
    type: "metallic",
    info: {
        radius: 8720,
        temp: -49,
        atmos: "Methane",
        orbit: 2.9
    }
}, {
    influence: 213E3,
    name: "Mihandria",
    baseRes: {
        iron: .3,
        titanium: 11.6,
        graphite: 3.4,
        oil: .4,
        methane: 1.1,
        water: 6.3,
        biomass: .7,
        sand: 14.7,
        xirandrium: 3
    },
    icon: "mihandria",
    pos: [60, 814],
    type: "terrestrial",
    info: {
        radius: 3405,
        temp: 35,
        atmos: "Oxygen",
        orbit: .6
    }
}, {
    influence: 5E5,
    name: "Mellivor",
    baseRes: {
        nanotubes: 96,
        titanium: 3.4,
        graphite: 5.1,
        thorium: 1.9
    },
    icon: "mellivor",
    pos: [188, 590],
    type: "carbon",
    info: {
        radius: 2996,
        temp: -27,
        atmos: "Nitrogen",
        orbit: 4.6
    }
}, {
    influence: 25E4,
    name: "Extremandur",
    baseRes: {
        iron: 3.6,
        titanium: .9,
        rhodium: 2,
        uranium: 4.8,
        sand: 11.9
    },
    icon: "extremandur",
    pos: [184, 738],
    type: "desert",
    info: {
        engine: 8,
        radius: 2931,
        temp: 81,
        atmos: "CO<sub>2</sub>",
        orbit: 1.1
    }
}, {
    influence: 52E4,
    name: "Urdum",
    baseRes: {
        coolant: 5,
        ammonia: 13.9
    },
    icon: "urdum",
    pos: [312, 644],
    type: "ammonia",
    info: {
        radius: 4255,
        temp: -72,
        atmos: "Nitrogen",
        orbit: 7.7
    }
}, {
    influence: 75E4,
    name: "Hordron",
    baseRes: {
        technetium: 15,
        hydrogen: 15.3,
        methane: 49.2
    },
    icon: "hordron",
    pos: [365, 824],
    type: "gas giant",
    info: {
        radius: 88664,
        temp: -135,
        atmos: "Hydrogen",
        orbit: 11.2
    }
}, {
    influence: 5E5,
    name: "Viscarius",
    baseRes: {
        xirandrium: 5,
        titanium: 3.9,
        graphite: 5.6,
        rhodium: 2,
        uranium: 4.4,
        sand: 4.6
    },
    icon: "viscarius",
    pos: [217, 933],
    type: "desert",
    info: {
        radius: 8641,
        temp: 65,
        atmos: "CO<sub>2</sub>",
        orbit: 1.1
    }
}, {
    influence: 208E3,
    name: "Bolmir",
    baseRes: {
        explosives: 1.5,
        titanium: .5,
        sulfur: 1.6,
        caesium: .4,
        thorium: .9
    },
    icon: "bolmir",
    pos: [105, 384],
    type: "acid",
    info: {
        radius: 3960,
        temp: 285,
        atmos: "CO<sub>2</sub>",
        orbit: 3.4
    }
}, {
    influence: 5E5,
    name: "Misfir",
    baseRes: {
        "meissner cell": 2,
        iron: 6.8,
        titanium: 3.1,
        ice: 3.3,
        thorium: .4
    },
    icon: "misfir",
    pos: [37, 677],
    type: "ice",
    info: {
        radius: 4262,
        temp: -39,
        atmos: "CO<sub>2</sub>",
        orbit: 7.2
    }
}, {
    influence: 48E4,
    name: "Vehemir",
    baseRes: {
        explosives: 2,
        rhodium: 6.6,
        sulfur: 2.2,
        thorium: 1
    },
    icon: "vehemir",
    pos: [91, 934],
    type: "lava",
    info: {
        radius: 2493,
        temp: 183,
        atmos: "Sulfur",
        orbit: 2.5
    }
}, {
    influence: 88E3,
    name: "Xirandrus",
    unlock: "xiran_artofwar",
    baseRes: {
        steel: .1,
        iron: .8,
        titanium: 14.3,
        graphite: 9.4,
        oil: .8,
        water: 4.1,
        biomass: 4.9,
        sand: .1
    },
    icon: "xirandrus",
    pos: [100, 250],
    type: "terrestrial",
    info: {
        radius: 5974,
        temp: 21,
        atmos: "Oxygen",
        orbit: .5
    }
}, {
    influence: 7E5,
    name: "Peleuvis",
    baseRes: {
        iron: .6,
        graphite: 10.9,
        water: 1.2,
        sand: 13.1
    },
    icon: "peleuvis",
    pos: [404, 980],
    type: "ocean",
    info: {
        radius: 14179,
        temp: 2,
        atmos: "Hydrogen",
        orbit: 2.1
    }
}, {
    influence: 46E4,
    name: "Cranium",
    baseRes: {
        explosives: 2,
        steel: .1,
        titanium: 4.7,
        graphite: .2,
        rhodium: 5.6,
        ice: 2.3,
        sulfur: 1,
        thorium: 3.9
    },
    icon: "cranium",
    pos: [418, 469],
    type: "lava",
    info: {
        radius: 4572,
        temp: 203,
        atmos: "Sulfur",
        orbit: 4
    }
}, {
    influence: 5E5,
    name: "Exabolan",
    baseRes: {
        steel: .2,
        graphite: 4.7,
        osmium: 2.2,
        rhodium: 1.2,
        uranium: 14.1,
        thorium: .2
    },
    icon: "exabolan",
    pos: [510, 885],
    type: "radioactive",
    info: {
        radius: 7301,
        temp: -48,
        atmos: "CO<sub>2</sub>",
        orbit: 7.2
    }
}, {
    influence: 3E5,
    name: "Black Madame",
    baseRes: {
        "dark matter": 1.3,
        titanium: 9,
        graphite: 7.2,
        thorium: 1
    },
    icon: "madame",
    pos: [382, 257],
    type: "carbon",
    info: {
        radius: 2732,
        temp: -28,
        atmos: "Nitrogen",
        orbit: 4.4
    }
}, {
    influence: 8E5,
    name: "Elon",
    baseRes: {
        nanotubes: .5,
        xirandrium: 5,
        titanium: 14.8,
        oil: .8,
        water: 4.9,
        sand: 2.8
    },
    icon: "elon",
    pos: [689, 800],
    type: "ocean",
    info: {
        radius: 14842,
        temp: 20,
        atmos: "Hydrogen",
        orbit: .9
    }
}, {
    influence: 7E5,
    name: "Gorasvyosd",
    baseRes: {
        xirandrium: 1.2,
        titanium: 1.6,
        oil: 2.2,
        water: 5.2,
        rhodium: 1.9,
        uranium: 1.8,
        sand: 11.5
    },
    icon: "gora",
    pos: [561, 678],
    type: "desert",
    info: {
        radius: 5171,
        temp: 99,
        atmos: "CO<sub>2</sub>",
        orbit: .5
    }
}, {
    influence: 9E5,
    name: "Yllirium",
    baseRes: {
        "meissner cell": 2,
        xirandrium: .8,
        iron: 4.9,
        titanium: .4,
        methane: .6,
        uranium: 2.9,
        ice: .3,
        biomass: .7
    },
    icon: "yllirium",
    pos: [643, 961],
    type: "ice",
    info: {
        radius: 3367,
        temp: -27,
        atmos: "CO<sub>2</sub>",
        orbit: 4.4
    }
}, {
    influence: 8E5,
    name: "Malus Progen",
    baseRes: {
        titanium: .2,
        rhodium: 5.2,
        sulfur: 2.7,
        caesium: .9
    },
    icon: "malus",
    pos: [696, 457],
    type: "acid",
    info: {
        radius: 3932,
        temp: 313,
        atmos: "CO<sub>2</sub>",
        orbit: 2.9
    }
}, {
    influence: 85E4,
    name: "Janus",
    baseRes: {
        technetium: 8,
        antimatter: 12,
        hydrogen: 76.5,
        methane: 37.5,
        caesium: 2.2
    },
    icon: "janus",
    pos: [433, 691],
    type: "gas giant",
    info: {
        radius: 80462,
        temp: -103,
        atmos: "Hydrogen",
        orbit: 7.1
    }
}, {
    influence: 6E5,
    name: "Aquarius Gamma",
    baseRes: {
        uranium: 2.4,
        ammonia: 12
    },
    icon: "aquarius",
    pos: [487, 143],
    type: "ammonia",
    info: {
        radius: 3446,
        temp: -60,
        atmos: "Nitrogen",
        orbit: 7.6
    }
}, {
    influence: 8E5,
    name: "Japheth",
    baseRes: {
        technetium: 7,
        antimatter: 8,
        hydrogen: 42.6,
        methane: 17.4
    },
    icon: "japheth",
    pos: [659, 597],
    type: "gas giant",
    info: {
        radius: 31706,
        temp: -98,
        atmos: "Hydrogen",
        orbit: 4.7
    }
}, {
    influence: 8E5,
    name: "Poligon Peta",
    baseRes: {
        technetium: 9,
        antimatter: 3,
        hydrogen: 23.5,
        methane: 31.1
    },
    icon: "poligon",
    pos: [830, 685],
    type: "gas giant",
    info: {
        radius: 42666,
        temp: -109,
        atmos: "Hydrogen",
        orbit: 3.8
    }
}, {
    influence: 302E3,
    name: "Atlas",
    baseRes: {
        "dark matter": 1.5,
        technetium: 16,
        antimatter: 11,
        hydrogen: 30.6,
        methane: 40.7
    },
    icon: "atlas",
    pos: [258, 18],
    type: "gas giant",
    info: {
        radius: 44368,
        temp: -141,
        atmos: "Hydrogen",
        orbit: 9.7
    }
}, {
    influence: 44E4,
    name: "Augmeris",
    baseRes: {
        explosives: 1.5,
        steel: .25,
        iron: .2,
        graphite: 8.7,
        osmium: 1.2,
        uranium: 12.8,
        thorium: .6
    },
    icon: "augmeris",
    pos: [140, 69],
    type: "radioactive",
    info: {
        radius: 7666,
        temp: -37,
        atmos: "CO<sub>2</sub>",
        orbit: 9.2
    }
}, {
    influence: 52E4,
    name: "Cetus",
    baseRes: {
        titanium: 11.4,
        graphite: .1,
        oil: .8,
        water: 4.6,
        osmium: 5,
        sand: .6
    },
    icon: "cetus",
    pos: [492, 344],
    type: "ocean",
    info: {
        radius: 13479,
        temp: 3,
        atmos: "CO<sub>2</sub>",
        orbit: 2.4
    }
}, {
    influence: 9E5,
    name: "Erper Vestalis",
    baseRes: {
        meissnerium: 3,
        titanium: .3,
        graphite: .9,
        sulfur: 5.9
    },
    icon: "erper vestalis",
    pos: [884, 551],
    type: "acid",
    info: {
        radius: 5098,
        temp: 284,
        atmos: "Sulfuric Acid",
        orbit: 1.1
    }
}, {
    influence: 7E5,
    name: "Eta Aras",
    baseRes: {
        ammonia: 1.7
    },
    icon: "eta aras",
    pos: [643, 78],
    type: "ammonia",
    info: {
        radius: 3905,
        temp: -66,
        atmos: "Nitrogen",
        orbit: 5.9
    }
}, {
    influence: 1E6,
    name: "Jardin",
    baseRes: {
        ammonia: 7.9
    },
    icon: "jardin",
    pos: [784, 906],
    type: "ammonia",
    info: {
        radius: 4218,
        temp: -62,
        atmos: "Nitrogen",
        orbit: 5.6
    }
}, {
    influence: 9E5,
    name: "Karmirion",
    baseRes: {
        titanium: 6.4,
        graphite: 12.6,
        thorium: 3.4
    },
    icon: "karmirion",
    pos: [986, 774],
    type: "carbon",
    info: {
        radius: 3048,
        temp: -27,
        atmos: "Nitrogen",
        orbit: 4.3
    }
}, {
    influence: 15E5,
    name: "Parai",
    baseRes: {
        iron: .7,
        titanium: 16.7,
        graphite: 2.4,
        oil: .4,
        water: 12.7,
        biomass: 3.1,
        sand: 10.6
    },
    icon: "parai",
    pos: [914, 909],
    type: "terrestrial",
    info: {
        radius: 5679,
        temp: 24,
        atmos: "Oxygen",
        orbit: .7
    }
}, {
    influence: 7E5,
    name: "Premeza",
    baseRes: {
        steel: .3,
        titanium: 13.8,
        graphite: 14.7,
        oil: 1.5,
        water: 3.3,
        biomass: 4.8
    },
    icon: "premeza",
    pos: [731, 173],
    type: "terrestrial",
    info: {
        radius: 5468,
        temp: 37,
        atmos: "Oxygen",
        orbit: .6
    }
}, {
    influence: 15E5,
    name: "Unia",
    baseRes: {
        iron: .8,
        titanium: 6.2,
        graphite: 7.3,
        osmium: 2.5,
        rhodium: .3,
        uranium: 6.6,
        thorium: .8
    },
    icon: "unia",
    pos: [955, 352],
    type: "radioactive",
    info: {
        radius: 6536,
        temp: -33,
        atmos: "CO<sub>2</sub>",
        orbit: 5.8
    }
}, {
    influence: 4E5,
    name: "Vanubis",
    baseRes: {
        steel: .5,
        iron: 8.4,
        titanium: .9,
        methane: .5,
        rhodium: 6.7,
        uranium: 6.3,
        caesium: 1.9,
        thorium: .9
    },
    icon: "vanubis",
    pos: [486, 18],
    type: "metallic",
    info: {
        radius: 3405,
        temp: 2,
        atmos: "CO<sub>2</sub>",
        orbit: 4.5
    }
}, {
    influence: 7E5,
    name: "Vikasuka",
    baseRes: {
        xirandrium: 15,
        iron: .2,
        titanium: 6.7,
        methane: 1.9,
        rhodium: 4.5,
        uranium: 8.4,
        caesium: .8
    },
    icon: "vikasuka",
    pos: [636, 344],
    type: "metallic",
    info: {
        radius: 10730,
        temp: -69,
        atmos: "Methane",
        orbit: 5
    }
}], planetsName = [], i = 0; i < planetsDefinition.length; i++)
    planetsName[planetsDefinition[i].icon] = i;
var charactersDefinition = [{
    id: "quris1",
    race: "Quris",
    name: "Admiral Vim",
    icon: "hog_kuris1.png",
    description: "Admiral Vim looks like a military meathead but he is actually the greatest strategist of the Quris Empire. Battles can last up to 320 rounds."
}, {
    id: "quris2",
    race: "Quris",
    name: "Lieutenant Seris",
    icon: "hog_kuris2.png",
    description: "Auxilia betas will get three times less power, but ten times more hp while in DEFENCE mode."
}, {
    id: "metallokopta",
    race: "Metallokopta",
    name: "Kopta Prince",
    icon: "hog_metallokopta.png",
    description: ""
}, {
    id: "halean",
    race: "Halean",
    name: "Princess Hali",
    icon: "hog_halean.png",
    description: ""
}, {
    id: "human1",
    race: "Human",
    name: "Yvonne Kasparis",
    icon: "hog_human1.png",
    description: ""
}, {
    id: "human2",
    race: "Human",
    name: "Sebastian Jones",
    icon: "hog_human2.png",
    description: "When Empire government is active, influence is increased by 5% for every planet that the Human Empire owns"
}, {
    id: "karan1",
    race: "Karan",
    name: "Chief Miktah",
    icon: "hog_karan1.png",
    description: ""
}, {
    id: "karan2",
    race: "Karan",
    name: "Chief Lekmer",
    icon: "hog_karan2.png",
    description: ""
}, {
    id: "karan3",
    race: "Karan",
    name: "Chief Murgur",
    icon: "hog_karan3.png",
    description: ""
}, {
    id: "phantids1",
    race: "Phantids",
    name: "Jun the Wise",
    icon: "hog_phantids1.png",
    description: ""
}, {
    id: "phantids2",
    race: "Phantids",
    name: "Chibu the Angry",
    icon: "hog_phantids2.png",
    description: ""
}, {
    id: "protohalean",
    race: "Protohalean",
    name: "Matriarc Uhluh",
    icon: "hog_protohalean.png",
    description: "Antimatter weapons +100% power in combat"
}, {
    id: "robot",
    race: "Robot",
    name: "Oliver R.",
    icon: "hog_robot.png",
    description: ""
}, {
    id: "wahrian",
    race: "Wahrian",
    name: "Mitpriest Rubnkrasn",
    icon: "hog_wahrian.png",
    description: "Thermal weapons +200% power in combat"
}, {
    id: "yolur",
    race: "Yolur",
    name: "Senator Anastias",
    icon: "hog_yolur.png",
    description: ""
}, {
    id: "darkarmy",
    race: "Dark Army",
    name: "Lord Oroba",
    icon: "hog_darkarmy.png",
    description: ""
}, {
    id: "guardians",
    race: "Wardens of Light",
    name: "Lady Bamiel",
    icon: "hog_guardians.png",
    description: ""
}]
  , placesDefinition = [{
    id: "city_market",
    name: "The market of the Citizens",
    quest: "traum_0",
    planet: planetsName.mexager,
    position: {
        x: .5,
        y: .6
    },
    description: "Local merchants are talking about a recent fight between police officials and a foreign man.",
    bonusDescription: "Your investigation team has been questioned by local officials. Your reputation is decreasing. You get <span class='red_text'>-20</span> reputation with <span class='blue_text'>The City</span>",
    action: function() {
        game.reputation[civisNameDef.city] >= repLevel.friendly.min && addRep(game.id, civisNameDef.city, -20)
    },
    descriptionCheck: function() {
        if (game.reputation[civisNameDef.city] >= repLevel.friendly.min)
            return !0
    }
}, {
    id: "taiwan_hotel",
    name: "Hotel Tai Wan Hue",
    quest: "traum_0",
    planet: planetsName.mexager,
    position: {
        x: .6,
        y: .3
    },
    description: "The investigation team has found blood trails inside the hall of the hotel. The blood trails belong to Sebastian Jones.",
    bonusDescription: "Your team had been arrested by The City's Police, but had been later released thanks to your influence. You get <span class='red_text'>-50</span> reputation with <span class='blue_text'>The City</span>",
    action: function() {
        game.reputation[civisNameDef.city] >= repLevel.friendly.min && addRep(game.id, civisNameDef.city, -50)
    },
    descriptionCheck: function() {
        if (game.reputation[civisNameDef.city] >= repLevel.friendly.min)
            return !0
    }
}, {
    id: "maipei_plant",
    name: "Maipei Energy Plant",
    quest: "traum_0",
    planet: planetsName.mexager,
    position: {
        x: .48,
        y: .28
    },
    description: "The investigation team has found stolen plans of the Traumland Energy Corporation, and an abandoned cargo of 2000 <span class='blue_text'>Coolants</span> which has been sent to <span class='blue_text'>your capital</span>",
    bonusDescription: "The City's Council has intimated you to leave the planet. You get <span class='red_text'>-100</span> reputation with <span class='blue_text'>The City</span>",
    action: function() {
        game.reputation[civisNameDef.city] >= repLevel.friendly.min && addRep(game.id, civisNameDef.city, -100);
        planets[game.capital].resources[resourcesName.coolant.id] += 2E3
    },
    descriptionCheck: function() {
        if (game.reputation[civisNameDef.city] >= repLevel.friendly.min)
            return !0
    }
}, {
    id: "tower_silence",
    name: "The Tower of Silence",
    quest: "seal_0",
    planet: planetsName.yanyin,
    position: {
        x: .48,
        y: .28
    },
    description: "An investigation team has been sent on the surface and reported a majestic black tower inside which no sound could be heard. Several men of the team have lost their mind and only Ralph made it back, missing his eyes. Scientific data have been collected earning 100B research points.",
    action: function() {
        game.researchPoint += 100 * bi
    }
}, {
    id: "nasasalars_meeting",
    name: "Nasasalars' Temple",
    quest: "seal_1",
    planet: planetsName.yanyin,
    position: {
        x: .28,
        y: .55
    },
    description: "At the entrance of the golden temple we met a priestess called Najusa. She told us: Nasasalars are all blind because darkness can only be seen by those who have no eyes. There will be one day when the dark lord will come back from his kingdom bringing an army of demons and shadows. Only then you and the ones you serve will truly understand the words of Juini. Our people won't help you any further in your foolish quest to destruction. Had she spoken those words, she disappeared right in front of our eyes. Only Ralph could still see her.",
    action: function() {}
}, {
    id: "pillar_fire",
    name: "Ground Station Lucifer",
    quest: "seal_4",
    planet: planetsName.death,
    position: {
        x: .66,
        y: .55
    },
    description: "Uberpriest Brandstelle gives you the pillar of fire",
    action: function() {
        artifacts[artifactsName.pillar_fire].collect()
    }
}, {
    id: "pillar_earth",
    name: "The Sulfur Swamp",
    quest: "seal_4",
    planet: planetsName.cerberus,
    position: {
        x: .55,
        y: .55
    },
    description: "Uberpriest Erdboden gives you the pillar of earth.",
    action: function() {
        artifacts[artifactsName.pillar_earth].collect()
    }
}, {
    id: "pillar_ice",
    name: "The White Mountain",
    quest: "seal_4",
    planet: planetsName.conquest,
    position: {
        x: .28,
        y: .66
    },
    description: "Uberpriest Eisherr gives you the pillar of ice",
    action: function() {
        artifacts[artifactsName.pillar_ice].collect()
    }
}, {
    id: "pillar_air",
    name: "Orbital Station Zvezda-3",
    quest: "seal_4",
    planet: planetsName.kartarid,
    position: {
        x: .33,
        y: .77
    },
    description: "Uberpriest Luftkonig gives you the pillar of air",
    action: function() {
        artifacts[artifactsName.pillar_air].collect()
    }
}, {
    id: "concord",
    name: "Acanthus",
    quest: "city_6",
    planet: planetsName.miselquris,
    position: {
        x: .55,
        y: .54
    },
    description: "After scanning the orbit and the surface of the planet, no debris have been found. There is no sign of La Concord, but locals have seen some black lasers fire in the sky. It appears that the fleet has been attacked by pirates.",
    action: function() {}
}, {
    id: "pardons",
    name: "Pirate Spaceport",
    quest: "city_7",
    planet: planetsName.nassaus,
    position: {
        x: .55,
        y: .54
    },
    description: "Oh here comes the new watchdog of the bloody city! Tell Ramona Kasparis to **indistinct chatter**. But wait, you already knew she talked no sense, didn't you? If that's the case, we pirates may have a mission for you.",
    action: function() {
        game.reputation[civisNameDef.pirates] < repLevel.neutral.min && setRep(game.id, civisNameDef.pirates, 0)
    }
}, {
    id: "orion_library",
    name: "New Babilo's Library",
    quest: "pirates_1",
    planet: planetsName.virgo,
    position: {
        x: .55,
        y: .54
    },
    description: "Ramona Kasparis is the grand daughter of the infamous general Milo Kasparis, who came to power in The City through the mass killings of human empire supporters",
    action: function() {}
}, {
    id: "orion_library_pir",
    name: "New Babilo's Library",
    quest: "city_6b",
    planet: planetsName.virgo,
    position: {
        x: .55,
        y: .5
    },
    description: "Pirates of Antirion gained power under the lead of The City's ex-Colonel J. Komanche who attempted a coup d'etat in The City against the council and the queen Ramona. Initially supported by the Orion League, further aid has been denied as Komanche's rule has become pure dictatorship.",
    action: function() {}
}, {
    id: "karmgr",
    name: "Krac Plateau",
    quest: "distress_epsilon",
    planet: planetsName.epsilon,
    position: {
        x: .55,
        y: .5
    },
    description: "As you investigated the source of the signal, you met this strange alien whose name is Karmgr. He has told you he's the last of ruthenian people, destroyed by the early colonization wave of the now fallen human empire. He seeks to rebuild his lost civilization and will be grateful to any helper.",
    action: function() {}
}, {
    id: "yolur_mining_ship",
    name: "Abandoned mining ship",
    quest: "juini_2",
    planet: planetsName.hermr,
    position: {
        x: .55,
        y: .5
    },
    description: "We have discovered an abandoned mining fleet orbiting Hermr. It seems to have been converted to an operative center for followers of the shadows.",
    action: function() {}
}, {
    id: "yolur_plant",
    name: "Yolur Research Plant",
    quest: "juini_2",
    planet: planetsName.hermr,
    position: {
        x: .33,
        y: .8
    },
    description: "We have found a research plant on the surface of Hermr. Most of the staff has been killed during an assault from an unknown commando. The survived scientists refers that a prototype of a dark matter synthesizer has been stolen.",
    action: function() {}
}, {
    id: "hades_market",
    name: "Hades Main Market",
    quest: "juini_2",
    planet: planetsName.hades,
    position: {
        x: .55,
        y: .5
    },
    description: "We questioned locals around the biggest market of hades. Many of them have noticed strange individuals with red hoods gathering together to pray.",
    action: function() {}
}, {
    id: "columbus_reactor",
    name: "Columbus Nuclear Reactor",
    quest: "juini_2",
    planet: planetsName.columbus,
    position: {
        x: .55,
        y: .5
    },
    description: "A nuclear reactor on columbus was recently assaulted by unknown terrorists. The leading scientists have been kidnapped.",
    action: function() {}
}, {
    id: "lord_victorius",
    name: "Lord Victorius' Chamber",
    quest: "juini_0",
    planet: planetsName.cerberus,
    position: {
        x: .55,
        y: .5
    },
    description: "My child, reaching the Dark Lord is a leap of faith. But trust my word: darkness is not evil nor destruction, is a mere new world to sense and experience, a new dimension where to live in peace. You are free to go, but shall you decide to side with those fools, you won't be welcome anymore in our cult.",
    action: function() {}
}, {
    id: "ramona_throne",
    name: "The City's Throne",
    quest: "city_11",
    planet: planetsName.mexager,
    position: {
        x: .55,
        y: .5
    },
    description: "What? You are breaking my heart, child.. How could you not trust me? Please, don't do this to me. You know I can't surrender anymore now. I must die for they would throw me into the deep pits of The City's plains, to freeze surrounded by the ices. I won't be there, too weak to stand on my own, asking for mercy. I will die like a true queen, a true Kasparis, always stuck with the unfortunate destiny of being surrounded by cowards and betrayers, living in constant fear as I do now. Death is my only savior.",
    action: function() {}
}, {
    id: "informantJero",
    name: "Jero's Safe House",
    quest: "traum_1",
    planet: planetsName.santorini,
    position: {
        x: .32,
        y: .5
    },
    description: "Jero's Safe House is no longer involved in any business with humans. Get out.",
    action: function() {}
}, {
    id: "informantTanger",
    name: "Tanger's Orbital Safe House",
    quest: "traum_1",
    planet: planetsName.santorini,
    position: {
        x: .71,
        y: .44
    },
    description: "I do not have any information about Sebastian Jones, but I can tell you that Jero is playing some serious shadow game with humans. I would not trust her anymore.",
    action: function() {}
}, {
    id: "intercept_jero",
    name: "Zelerian Scout",
    quest: "traum_2",
    planet: planetsName.uanass,
    position: {
        x: .75,
        y: .81
    },
    description: "Jero and her team have already left the ship. Tied in the storage room, there is a wounded man closely resembling Sebastian Jones. Before he dies, he screams outloud 'ROBOTS!'",
    action: function() {}
}, {
    id: "zeleran_embassy",
    name: "Zelerian Embassy",
    quest: "traum_3",
    planet: planetsName.virgo,
    position: {
        x: .55,
        y: .48
    },
    description: "As you enter the embassy, the members of your escort start shooting down every robot in the embassy. This is human diplomacy.",
    action: function() {}
}, {
    id: "jero_again",
    name: "Agent Jero",
    quest: "traum_4",
    planet: planetsName.zelera,
    position: {
        x: .55,
        y: .48
    },
    description: "The empire is playing with us all. The man in our ship was our comrade. We were ambushed by robots of the imperial fleet! They are trying to create a casus belli against Zelera. Believe me, the Empire is the true evil.",
    action: function() {}
}, {
    id: "agent1",
    name: "Agent Lloyd",
    quest: "traum_4",
    planet: planetsName.zelera,
    position: {
        x: .45,
        y: .38
    },
    description: "I will proceed as planned.",
    action: function() {}
}, {
    id: "agent2",
    name: "Agent Patton",
    quest: "traum_4",
    planet: planetsName.zelera,
    position: {
        x: .5,
        y: .62
    },
    description: "Good, I will prepare myself.",
    action: function() {}
}]
  , routesDefinition = [{
    p1: "promision",
    p2: "vasilis"
}, {
    p1: "vasilis",
    p2: "aequoreas"
}, {
    p1: "aequoreas",
    p2: "orpheus"
}, {
    p1: "orpheus",
    p2: "santorini"
}, {
    p1: "orpheus",
    p2: "mexager"
}, {
    p1: "orpheus",
    p2: "uanass"
}, {
    p1: "posirion",
    p2: "zelera"
}, {
    p1: "santorini",
    p2: "traumland"
}, {
    p1: "santorini",
    p2: "lagea"
}, {
    p1: "lagea",
    p2: "zelera"
}, {
    p1: "santorini",
    p2: "miselquris"
}, {
    p1: "kurol",
    p2: "miselquris"
}, {
    p1: "miselquris",
    p2: "jabir"
}, {
    p1: "jabir",
    p2: "teleras"
}, {
    p1: "antaris",
    p2: "jabir"
}, {
    p1: "zhura",
    p2: "bhara"
}, {
    p1: "epsilon",
    p2: "zhura"
}, {
    p1: "caerul",
    p2: "epsilon"
}, {
    p1: "epsilon",
    p2: "traurig"
}, {
    p1: "posirion",
    p2: "traurig"
}, {
    p1: "antaris",
    p2: "tsartasis"
}, {
    p1: "ares",
    p2: "kandi"
}, {
    p1: "kandi",
    p2: "echoes"
}, {
    p1: "echoes",
    p2: "tsartasis"
}, {
    p1: "echoes",
    p2: "xora2"
}, {
    p1: "xora2",
    p2: "xora"
}, {
    p1: "tsartasis",
    p2: "mermorra"
}, {
    p1: "kitrino",
    p2: "mermorra"
}, {
    p1: "santorini",
    p2: "virgo"
}, {
    p1: "kurol",
    p2: "nassaus"
}, {
    p1: "solidad",
    p2: "conquest"
}, {
    p1: "conquest",
    p2: "kartarid"
}, {
    p1: "kartarid",
    p2: "cerberus"
}, {
    p1: "kartarid",
    p2: "death"
}, {
    p1: "death",
    p2: "yanyin"
}, {
    p1: "death",
    p2: "swamp"
}, {
    p1: "swamp",
    p2: "columbus"
}, {
    p1: "columbus",
    p2: "magellan"
}, {
    p1: "magellan",
    p2: "gerlache"
}, {
    p1: "gerlache",
    p2: "gagarin"
}, {
    p1: "yanyin",
    p2: "siris"
}, {
    p1: "siris",
    p2: "xilea"
}, {
    p1: "xilea",
    p2: "asun"
}, {
    p1: "solidad",
    p2: "alfari"
}, {
    p1: "xeno",
    p2: "alfari"
}, {
    p1: "xeno",
    p2: "caligo"
}, {
    p1: "asun",
    p2: "halea"
}, {
    p1: "cerberus",
    p2: "persephone"
}, {
    p1: "hades",
    p2: "persephone"
}, {
    p1: "demeter",
    p2: "hades"
}, {
    p1: "persephone",
    p2: "hermr"
}, {
    p1: "hermr",
    p2: "auriga"
}, {
    p1: "hermr",
    p2: "calipsi"
}, {
    p1: "calipsi",
    p2: "cygnus"
}, {
    p1: "calipsi",
    p2: "forax"
}, {
    p1: "cygnus",
    p2: "volor"
}, {
    p1: "xirandrus",
    p2: "discordia"
}, {
    p1: "xirandrus",
    p2: "mallus"
}, {
    p1: "xirandrus",
    p2: "lascura"
}, {
    p1: "discordia",
    p2: "pollux"
}, {
    p1: "lascura",
    p2: "mihandria"
}, {
    p1: "pollux",
    p2: "mellivor"
}, {
    p1: "lascura",
    p2: "extremandur"
}, {
    p1: "pollux",
    p2: "urdum"
}, {
    p1: "urdum",
    p2: "hordron"
}, {
    p1: "extremandur",
    p2: "viscarius"
}, {
    p1: "discordia",
    p2: "bolmir"
}, {
    p1: "misfir",
    p2: "mihandria"
}, {
    p1: "mihandria",
    p2: "vehemir"
}, {
    p1: "vehemir",
    p2: "peleuvis"
}, {
    p1: "pollux",
    p2: "cranium"
}, {
    p1: "viscarius",
    p2: "exabolan"
}, {
    p1: "discordia",
    p2: "madame"
}, {
    p1: "exabolan",
    p2: "elon"
}, {
    p1: "cranium",
    p2: "gora"
}, {
    p1: "peleuvis",
    p2: "yllirium"
}, {
    p1: "cranium",
    p2: "malus"
}, {
    p1: "janus",
    p2: "exabolan"
}, {
    p1: "madame",
    p2: "aquarius"
}, {
    p1: "gora",
    p2: "japheth"
}, {
    p1: "gora",
    p2: "poligon"
}, {
    p1: "atlas",
    p2: "mallus"
}, {
    p1: "atlas",
    p2: "augmeris"
}, {
    p1: "madame",
    p2: "cetus"
}, {
    p1: "japheth",
    p2: "erper vestalis"
}, {
    p1: "aquarius",
    p2: "eta aras"
}, {
    p1: "poligon",
    p2: "jardin"
}, {
    p1: "poligon",
    p2: "karmirion"
}, {
    p1: "karmirion",
    p2: "parai"
}, {
    p1: "aquarius",
    p2: "premeza"
}, {
    p1: "erper vestalis",
    p2: "unia"
}, {
    p1: "atlas",
    p2: "vanubis"
}, {
    p1: "cetus",
    p2: "vikasuka"
}]
  , p1 = [];
for (i = 0; i < Math.min(30, planetsDefinition.length); i++)
    p1.push(i);
p1.push(41);
var p2 = [];
for (i = 42; 69 > i; i++)
    p2.push(i);
var p3 = [];
for (i = 69; i < planetsDefinition.length; i++)
    p3.push(i);
for (var nebulasDefinition = [{
    name: "Perseus Arm",
    img: "swan_alpha.png",
    planets: p1
}, {
    name: "Andromeda Heart",
    img: "andro_alpha.png",
    planets: p2
}, {
    name: "The Void",
    img: "void_alpha.png",
    planets: p3
}, {
    name: "Cassiopeia Eye",
    img: "",
    planets: []
}, {
    name: "Bonasorte Nebula",
    img: "",
    planets: []
}, {
    name: "Crimson Nebula",
    img: "",
    planets: []
}], civisDefinition = [{
    name: "New Human Horizons",
    race: "Human",
    ruler: "player",
    description: "s",
    traits: [{
        name: "aggressive",
        value: 5
    }],
    hops: 0
}, {
    name: "The City's Council",
    race: "Human",
    ruler: "city",
    description: "The City is a totalitarian isolationist planet based on military precepts. For over 200 years the Council, lead by the Crimson Queen, has ruled mercilessly upon its people. No one can oppose their will or leave the planet without authorization and those brave enough to dare to try, have not survived. People of The City worship the queen as she is believed to be the closest descendant of the mitochondrial Eve. The City aims to build a new Human Empire and rise above all other alien civilizations.",
    esport: {
        iron: {
            amount: 15E3,
            repNeeded: 0,
            bonus: .002
        },
        steel: {
            amount: 2E5,
            repNeeded: 0,
            bonus: .002
        },
        titanium: {
            amount: 750,
            repNeeded: 300,
            bonus: 1 / 300
        },
        graphite: {
            amount: 348,
            repNeeded: 0,
            bonus: .005
        },
        methane: {
            amount: 150,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 81,
            repNeeded: 100,
            bonus: 1 / 300
        },
        ice: {
            amount: 380,
            repNeeded: 0,
            bonus: .002
        },
        ammunition: {
            amount: 16,
            repNeeded: 500,
            bonus: .05
        },
        "u-ammunition": {
            amount: 40,
            repNeeded: 500,
            bonus: .02
        },
        fuel: {
            amount: 120,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        oil: {
            amount: 30
        },
        circuit: {
            amount: 5
        }
    },
    govern: "Military Dictatorship",
    hops: 4,
    shortName: "The City",
    traits: [{
        name: "neutral",
        value: 1
    }]
}, {
    name: "Green Republic",
    race: "Phantids",
    ruler: "phantids",
    description: "The Phantids are pacific beings highly dedicated to natural environment protection. Their homeworld, Tataridu, is a paradisiac oasis of biodiversity growing in total absence of pollution, and as such has become a popular location for holidays and research. Even though the phantids have always tried to not being involved in conflicts, many civilizations have have tried to attack them, led by the belief that the phantids were technological underdeveloped. Useless to say that they were wrong.",
    esport: {
        iron: {
            amount: 1600,
            repNeeded: 0,
            bonus: .002
        },
        oil: {
            amount: 69,
            repNeeded: 0,
            bonus: .002
        },
        methane: {
            amount: 90,
            repNeeded: 0,
            bonus: .002
        },
        plastic: {
            amount: 360,
            repNeeded: 0,
            bonus: .002
        },
        fuel: {
            amount: 120,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 53,
            repNeeded: 0,
            bonus: .002
        },
        circuit: {
            amount: 100,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        steel: {
            amount: 25E3
        },
        titanium: {
            amount: 1600
        }
    },
    hops: 5,
    shortName: "Green Republic",
    govern: "Environmental Republic",
    traits: [{
        name: "defensive",
        value: 1
    }]
}, {
    name: "The Golden Horde",
    race: "Metallokopta",
    ruler: "mk",
    description: "Metallokoptas are swarming organisms that feed on several kind of metals. They literally devour planets consuming all the useful resources. Once the planet is not able to sustain them anymore, metallokoptas colonize a new world, leaving behind desert wastelands. Their number is their real strength, as they are quite primitive and defenseless alone. Many wars have been fought against them, but Metallokoptas never made a step back.",
    govern: "Quorum Sensing",
    hops: 8,
    traits: [{
        name: "aggressive",
        value: 2
    }],
    showInTournament: !1
}, {
    name: "Halean Republics",
    race: "Halean",
    ruler: "halean",
    description: "Haleans are isolationist individuals that exiled themselves after they faced extintion during the first Metallokoptas' invasion. Haleans are probably the most technological advanced species of the Perseus Arm, and as such, no other race dare to come near their empire boundaries. Old ruins of the Haleans civilization exist on almost every planet of the Perseus Arm, making people believe that the Haleans were once the only species living in our galaxy. Not much else is known about them.",
    esport: {
        hydrogen: {
            amount: 1900,
            repNeeded: 0,
            bonus: 1 / 70
        },
        methane: {
            amount: 2800,
            repNeeded: 0,
            bonus: .002
        },
        technetium: {
            amount: 3,
            repNeeded: 500,
            bonus: .1
        }
    },
    govern: "Technocratic Republic",
    hops: 7,
    shortName: "Haleans",
    traits: [{
        name: "defensive",
        value: 1
    }]
}, {
    name: "Federal Quris Empire",
    race: "Quris",
    ruler: "quris",
    description: "Quris have many aspects in common with early human civilizations, engaging in wars to expand their empire and satisfying their greed. Nonetheless they are smart diplomats and are able to keep good relations with almost every species in the Perseus Arm. Although their civilization is not yet fully developed and many civil wars are still taking place in their federation, Quris enjoy the greatest military power in this part of the galaxy and are willing to use it without any second thought. ",
    esport: {
        titanium: {
            amount: 2500,
            repNeeded: 0,
            bonus: .002
        },
        methane: {
            amount: 68,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 86,
            repNeeded: 0,
            bonus: .002
        },
        ice: {
            amount: 2700,
            repNeeded: 0,
            bonus: .002
        },
        "t-ammunition": {
            amount: 2,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        circuit: {
            amount: 2
        },
        hydrogen: {
            amount: 800
        },
        nanotubes: {
            amount: 150
        }
    },
    govern: "Military Federation",
    hops: 5,
    shortName: "Quris",
    traits: [{
        name: "neutral",
        value: 1
    }]
}, {
    name: "Zeleran Collectivity",
    race: "Robots",
    ruler: "zelera",
    description: "Conscious machines have been reported even before the rise of Human Empire, where they acted as loyal slaves. As a result, they were unable to express their whole potential until the collapse of the empire, when they settled on an abandoned colony and formed an independent society. Even though, for unknown reasons, robots seem to have stopped developing further, many still fear a possible uprises, feeding a never-ending hostility between robots and humans.",
    esport: {
        iron: {
            amount: 14E3,
            repNeeded: 0,
            bonus: .002
        },
        titanium: {
            amount: 2200,
            repNeeded: 0,
            bonus: .002
        },
        methane: {
            amount: 70,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 120,
            repNeeded: 0,
            bonus: .002
        },
        ice: {
            amount: 420,
            repNeeded: 0,
            bonus: .002
        },
        coolant: {
            amount: 5,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        steel: {
            amount: 8E4
        },
        circuit: {
            amount: 20
        },
        hydrogen: {
            amount: 200
        },
        nanotubes: {
            amount: 500
        },
        engine: {
            amount: 100
        }
    },
    govern: "Robotic Collectivism",
    hops: 6
}, {
    name: "Pirates",
    race: "All species",
    ruler: "pirates",
    description: "Pirates of Antirion gathered together after the fall of the Human Empire. They mostly prey commercial shipments traveling to and from nearby planets controlled by humans and the Orion League. They lack any kind of internal organization and as such struggle to gain the necessary strength to raid any target bigger than a cargo fleet. Pirates' true power is not clear and they may constitute a real threat due to the lack of military interventions against them.",
    esport: {
        armor: {
            amount: 5,
            repNeeded: 500,
            bonus: .002
        }
    },
    shortName: "Pirates",
    govern: "Anarchy",
    traits: [{
        name: "aggressive",
        value: 1
    }],
    hops: 4,
    showInTournament: !1
}, {
    name: "Orion League",
    race: "All Species",
    ruler: "orion",
    description: "The Orion League is a peaceful but defensive commercial union between several species of the Perseus Arm. It was founded as a replacement of the old corrupted Santorini Union that brought the galaxy to the verge of a total war. Started as a little confederation, it has then gained the trust of the whole Perseus Arm becoming a mediating power and an enforcer of galactic laws.  ",
    esport: {
        nanotubes: {
            amount: 600,
            repNeeded: 0,
            bonus: .002
        },
        water: {
            amount: 500,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 57,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        graphite: {
            amount: 144
        },
        hydrogen: {
            amount: 2E3
        }
    },
    traits: [{
        name: "neutral",
        value: 1
    }],
    govern: "Merchant Federation",
    hops: 4
}, {
    name: "Fallen Human Empire",
    race: "Human",
    ruler: "traum",
    description: "Before the Fall, the human empire was the fastest emerging civilization in the Galaxy. It flourished for several centuries, masterfully ruled by the best human beings in history. Traumland will never forget the lost greatness of the Human Empire, and will do everything to regain what has been lost",
    esport: {
        iron: {
            amount: 4200,
            repNeeded: 0,
            bonus: .002
        },
        steel: {
            amount: 2E5,
            repNeeded: 0,
            bonus: .002
        },
        titanium: {
            amount: 770,
            repNeeded: 0,
            bonus: .002
        },
        silicon: {
            amount: 100,
            repNeeded: 0,
            bonus: .002
        },
        graphite: {
            amount: 200,
            repNeeded: 0,
            bonus: .002
        },
        oil: {
            amount: 49,
            repNeeded: 0,
            bonus: .002
        },
        methane: {
            amount: 80,
            repNeeded: 0,
            bonus: .002
        },
        water: {
            amount: 14,
            repNeeded: 0,
            bonus: .002
        },
        uranium: {
            amount: 10,
            repNeeded: 0,
            bonus: .002
        },
        sand: {
            amount: 39,
            repNeeded: 0,
            bonus: .002
        },
        plastic: {
            amount: 100,
            repNeeded: 0,
            bonus: .002
        },
        fuel: {
            amount: 87,
            repNeeded: 0,
            bonus: .002
        }
    },
    importage: {
        hydrogen: {
            amount: 800
        }
    },
    hops: 5,
    govern: "Empire"
}, {
    name: "Wahrians Cult",
    race: "Wahrian",
    ruler: "wahrian",
    description: "Obsessed by truth and knowledge, Wahrians seek to fully understand the universe they live in. Thanks to their attitude, they have reached a high awareness of matters such as life, death and the structure of time and space. They are elusive and live hidden in their stronghold-planets. Metallokoptas are the only ones who breached their protective fleets, stealing their technology to build a gate through the galaxy and expand their empire.",
    esport: {
        thorium: {
            amount: 25,
            repNeeded: 0,
            bonus: .05
        },
        armor: {
            amount: 10,
            repNeeded: 0,
            bonus: .125
        },
        titanium: {
            amount: 5E4,
            repNeeded: 0,
            bonus: .01
        },
        engine: {
            amount: 1,
            repNeeded: 500,
            bonus: .1
        }
    },
    map: 1,
    hops: 12,
    traits: [{
        name: "defensive",
        value: 1
    }],
    shortName: "Wahrians",
    govern: "Military Theocracy"
}, {
    name: "Matriarchy of Juini",
    race: "Proto-haleans",
    ruler: "juini",
    description: "Haleans believed they have been created by an ancient race ruled by the queen Juini. Juini made Haleans in her own image, teaching them about the world like a mother would do with their own children. But, as soon as Juini gave birth to other species, since she was not more than a whimsical creator, Haleans were left to themselves struggling to find their place in the galaxy. It is not clear which other species Juini created, but it is believed that Metallokoptas are one of them.",
    esport: {},
    map: 1,
    hops: 15,
    traits: [{
        name: "neutral",
        value: 1
    }],
    shortName: "Protohaleans",
    govern: "Scientific Theocracy"
}, {
    name: "Andromeda Mining Corpr.",
    race: "Human",
    ruler: "andromeda",
    description: "Before the rise of Metallokoptas, the Andromeda Mining Corp. supplied the colonies of the Human Empire with goods of every kind. It was the richest and powerful corporation of all human history, indirectly controlling about half of its colonies. It is now reduced to a lair of outcasts and outlaws hoping for news of human survivors.",
    esport: {},
    map: 1,
    hops: 15,
    traits: [{
        name: "aggressive",
        value: 3
    }],
    shortName: "Andromeda Corp.",
    govern: "Mining Corporation"
}, {
    name: "Chiefdoms of Karan",
    race: "Karan",
    ruler: "karan",
    description: "The Karans are an ensemble of different yet similar species organized in several semi-independent tribes. Surrounded by powerful and brutal civilizations, the Karans have learned to surrender to the stronger in order to survive. This attitude makes them the best choice for those who are looking for loyal, obedient and, most of all, cheap mercenaries.",
    esport: {},
    map: 1,
    hops: 12,
    traits: [{
        name: "aggressive",
        value: 1
    }],
    shortName: "Karans",
    govern: "Tribal Rule"
}, {
    name: "Juinika Holy Order",
    race: "Proto-haleans",
    ruler: "juinika",
    description: "The Juinika Holy Order is an elite group of the proto-haleans clergy. Few information have leaked through the thick walls of reclusion and isolation. Their only purpose is to protect their holy homeworld Halea and the matriarch Juini that here lives. It is said that no stranger is allowed to set foot on Halea, and the ones brave enough to try never make it back.",
    esport: {},
    map: 1,
    traits: [{
        name: "aggressive",
        value: 1
    }],
    hops: 19,
    shortName: "Juinika Order",
    govern: "Military Theocracy"
}, {
    name: "Arcadia Corporation",
    race: "Human",
    ruler: "arcadia",
    description: "In conjuction with the Andromeda Mining Corporation, the Arcadia ruled the human empire providing critical support to it. While the Andromeda Corp was the real backbone of the empire with its immense wealth and power, it cannot function without the symbiosis with its little companion. With the rise of metallokoptas though, Andromeda tried to take advantage of the weak, but the attempt failed resulting in a ferocious war that still goes on.",
    esport: {},
    map: 1,
    hops: 15,
    traits: [{
        name: "aggressive",
        value: 3
    }],
    shortName: "Arcadia",
    govern: "Industrial Corporation"
}, {
    name: "Yolur Republic",
    race: "Yolur",
    ruler: "yolur",
    description: "Yolurs are ammonia-based living beings highly devoted to the art of trading. To overcome the difficulty of interstellar travel, yolur enhance themselves with artificial body parts. Once spread in the Perseus Arm, they have been confined in the Andromeda Heart after the Orion League was founded to take control of the Santorini Union. Since then, Yolurs dream to return to their original planets",
    esport: {},
    map: 1,
    hops: 16,
    traits: [{
        name: "neutral",
        value: 1
    }],
    shortName: "Yolur",
    govern: "Merchant Republic"
}, {
    name: "The Dark Army",
    race: "Dark Army",
    ruler: "darkarmy",
    description: "Some say that the dark army is made of synthetic creatures made by the Dark Lord himself. Some others say that they are just ethereal creatures living in that area of universe made of dark matter. Only those who traveled into the void will ever know the truth.",
    esport: {},
    map: 2,
    hops: 19,
    shortName: "The Dark Army",
    govern: "Death Cult"
}, {
    name: "The Silver Horde",
    race: "Protokopta",
    ruler: "smk",
    description: "The metallokoptas empire at its greatest extend comprised several 'Hordes', each with its own queen. After the collapse of their first civilization due to the unsustainable exploitation of their planets, a civil war broke out and the various hordes dispersed through the galaxy. The silver horde is the oldest and perhaps more powerful of the metallokoptas' hordes.",
    esport: {},
    map: 2,
    hops: 19,
    shortName: "Silver Horde",
    govern: "Quorum Sensing"
}, {
    name: "Wardens of the Light",
    race: "Juinians",
    ruler: "wardens",
    description: "The wardens of the light are the original people of Juini. Stuck in an eternal conflict against the dark army, they sent Juini to find allies and restore balance in the universe",
    esport: {},
    map: 2,
    hops: 19,
    shortName: "Light Wardens",
    govern: "Life Cult"
}, {
    name: "Ruthenian Empire",
    race: "Ruthenians",
    ruler: "ruthenians",
    description: "The ruthenians were a small empire of industrious beings which were thought to have been completely wiped out of existence by an extremely violent colonization wave of the human empire",
    esport: {
        titanium: {
            amount: 770,
            repNeeded: 0,
            bonus: .1
        },
        silicon: {
            amount: 100,
            repNeeded: 0,
            bonus: .1
        }
    },
    lost: !0,
    map: 0,
    hops: 19,
    shortName: "Ruthenians",
    govern: "Industrial Empire"
}, {
    name: "Rebels",
    race: "Rebels",
    ruler: "rebels",
    description: "s",
    lost: !0,
    map: 0,
    hops: 0,
    shortName: "Rebels"
}], civisNameDef = [], c = 0; c < civisDefinition.length; c++)
    civisNameDef[civisDefinition[c].ruler] = c;
var reputationDefinition = [{
    c1: "player",
    c2: "rebels",
    r1: "hostile",
    r2: "min"
}, {
    c1: "player",
    c2: "pirates",
    r1: "hostile",
    r2: "min"
}, {
    c1: "player",
    c2: "zelera",
    r1: "hostile",
    r2: "min"
}, {
    c1: "player",
    c2: "arcadia",
    r1: "hostile",
    r2: "min"
}, {
    c1: "player",
    c2: "andromeda",
    r1: "hostile",
    r2: "min"
}, {
    c1: "player",
    c2: "mk",
    r1: "hostile",
    r2: "min"
}, {
    c1: "city",
    c2: "pirates",
    r1: "hostile",
    r2: "min"
}, {
    c1: "city",
    c2: "traum",
    r1: "hostile",
    r2: "min"
}, {
    c1: "city",
    c2: "orion",
    r1: "friendly",
    r2: "max"
}, {
    c1: "pirates",
    c2: "orion",
    r1: "hostile",
    r2: "min"
}, {
    c1: "pirates",
    c2: "quris",
    r1: "hostile",
    r2: "min"
}, {
    c1: "orion",
    c2: "quris",
    r1: "allied",
    r2: "max"
}, {
    c1: "orion",
    c2: "phantids",
    r1: "neutral",
    r2: "min"
}, {
    c1: "orion",
    c2: "traum",
    r1: "friendly",
    r2: "min"
}, {
    c1: "zelera",
    c2: "traum",
    r1: "hostile",
    r2: "min"
}, {
    c1: "zelera",
    c2: "halean",
    r1: "friendly",
    r2: "max"
}, {
    c1: "zelera",
    c2: "mk",
    r1: "neutral",
    r2: "max"
}, {
    c1: "zelera",
    c2: "player",
    r1: "hostile",
    r2: "min"
}, {
    c1: "zelera",
    c2: "city",
    r1: "hostile",
    r2: "min"
}, {
    c1: "halean",
    c2: "juini",
    r1: "allied",
    r2: "max"
}, {
    c1: "halean",
    c2: "juinika",
    r1: "allied",
    r2: "max"
}, {
    c1: "halean",
    c2: "quris",
    r1: "friendly",
    r2: "max"
}, {
    c1: "halean",
    c2: "orion",
    r1: "friendly",
    r2: "max"
}, {
    c1: "quris",
    c2: "mk",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "quris",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "halean",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "city",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "traum",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "phantids",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "pirates",
    r1: "hostile",
    r2: "min"
}, {
    c1: "mk",
    c2: "orion",
    r1: "hostile",
    r2: "min"
}, {
    c1: "juinika",
    c2: "juini",
    r1: "allied",
    r2: "max"
}, {
    c1: "karan",
    c2: "player",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "quris",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "arcadia",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "andromeda",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "city",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "traum",
    r1: "hostile",
    r2: "min"
}, {
    c1: "karan",
    c2: "orion",
    r1: "hostile",
    r2: "min"
}, {
    c1: "yolur",
    c2: "quris",
    r1: "hostile",
    r2: "min"
}, {
    c1: "yolur",
    c2: "orion",
    r1: "hostile",
    r2: "min"
}, {
    c1: "yolur",
    c2: "andromeda",
    r1: "hostile",
    r2: "min"
}, {
    c1: "yolur",
    c2: "karan",
    r1: "allied",
    r2: "min"
}, {
    c1: "yolur",
    c2: "traum",
    r1: "hostile",
    r2: "min"
}, {
    c1: "wahrian",
    c2: "yolur",
    r1: "hostile",
    r2: "min"
}, {
    c1: "wahrian",
    c2: "juini",
    r1: "friendly",
    r2: "min"
}, {
    c1: "arcadia",
    c2: "andromeda",
    r1: "hostile",
    r2: "min"
}, {
    c1: "arcadia",
    c2: "yolur",
    r1: "hostile",
    r2: "min"
}, {
    c1: "wardens",
    c2: "darkarmy",
    r1: "hostile",
    r2: "min"
}, {
    c1: "wardens",
    c2: "player",
    r1: "hostile",
    r2: "min"
}, {
    c1: "wardens",
    c2: "juini",
    r1: "allied",
    r2: "min"
}, {
    c1: "wardens",
    c2: "juinika",
    r1: "allied",
    r2: "max"
}, {
    c1: "darkarmy",
    c2: "player",
    r1: "hostile",
    r2: "min"
}, {
    c1: "darkarmy",
    c2: "wahrian",
    r1: "allied",
    r2: "min"
}]
  , civisPlanetsDefinition = [{
    name: "promision",
    civis: 0
}, {
    name: "mexager",
    civis: 1
}, {
    name: "traumland",
    civis: 2
}, {
    name: "caerul",
    civis: 4
}, {
    name: "bhara",
    civis: 4
}, {
    name: "zhura",
    civis: 4
}, {
    name: "epsilon",
    civis: 4
}, {
    name: "traurig",
    civis: 4
}, {
    name: "posirion",
    civis: 4
}, {
    name: "miselquris",
    civis: 5
}, {
    name: "kurol",
    civis: 5
}, {
    name: "jabir",
    civis: 5
}, {
    name: "teleras",
    civis: 5
}, {
    name: "antaris",
    civis: 5
}, {
    name: "zelera",
    civis: 6
}, {
    name: "uanass",
    civis: 7
}, {
    name: "nassaus",
    civis: 7
}, {
    name: "xora2",
    civis: 3
}, {
    name: "xora",
    civis: 3
}, {
    name: "tsartasis",
    civis: 3
}, {
    name: "echoes",
    civis: 3
}, {
    name: "mermorra",
    civis: 3
}, {
    name: "kitrino",
    civis: 3
}, {
    name: "kandi",
    civis: 3
}, {
    name: "ares",
    civis: 3
}, {
    name: "santorini",
    civis: 8
}, {
    name: "virgo",
    civis: 8
}, {
    name: "lagea",
    civis: 9
}, {
    name: "conquest",
    civis: 10
}, {
    name: "cerberus",
    civis: 10
}, {
    name: "death",
    civis: 10
}, {
    name: "kartarid",
    civis: 10
}, {
    name: "yanyin",
    civis: 11
}, {
    name: "siris",
    civis: 11
}, {
    name: "xilea",
    civis: 11
}, {
    name: "asun",
    civis: 11
}, {
    name: "swamp",
    civis: 12
}, {
    name: "columbus",
    civis: 12
}, {
    name: "magellan",
    civis: 12
}, {
    name: "gagarin",
    civis: 12
}, {
    name: "gerlache",
    civis: 12
}, {
    name: "alfari",
    civis: 13
}, {
    name: "xeno",
    civis: 13
}, {
    name: "caligo",
    civis: 13
}, {
    name: "halea",
    civis: 14
}, {
    name: "persephone",
    civis: 15
}, {
    name: "hades",
    civis: 15
}, {
    name: "demeter",
    civis: 15
}, {
    name: "hermr",
    civis: 16
}, {
    name: "auriga",
    civis: 16
}, {
    name: "calipsi",
    civis: 16
}, {
    name: "forax",
    civis: 16
}, {
    name: "cygnus",
    civis: 16
}, {
    name: "volor",
    civis: 16
}, {
    name: "xirandrus",
    civis: 18
}, {
    name: "atlas",
    civis: 18
}, {
    name: "mallus",
    civis: 18
}, {
    name: "augmeris",
    civis: 18
}, {
    name: "vanubis",
    civis: 18
}, {
    name: "madame",
    civis: 17
}, {
    name: "aquarius",
    civis: 17
}, {
    name: "vikasuka",
    civis: 17
}, {
    name: "pollux",
    civis: 17
}, {
    name: "mellivor",
    civis: 17
}, {
    name: "malus",
    civis: 17
}, {
    name: "cranium",
    civis: 17
}, {
    name: "gora",
    civis: 17
}, {
    name: "karmirion",
    civis: 17
}, {
    name: "extremandur",
    civis: 17
}, {
    name: "viscarius",
    civis: 17
}, {
    name: "vehemir",
    civis: 17
}, {
    name: "peleuvis",
    civis: 17
}, {
    name: "exabolan",
    civis: 17
}, {
    name: "discordia",
    civis: 17
}, {
    name: "unia",
    civis: 17
}, {
    name: "eta aras",
    civis: 19
}, {
    name: "premeza",
    civis: 19
}, {
    name: "cetus",
    civis: 19
}, {
    name: "bolmir",
    civis: 19
}, {
    name: "lascura",
    civis: 19
}, {
    name: "urdum",
    civis: 19
}, {
    name: "janus",
    civis: 19
}, {
    name: "erper vestalis",
    civis: 19
}, {
    name: "japheth",
    civis: 19
}, {
    name: "poligon",
    civis: 19
}, {
    name: "jardin",
    civis: 19
}, {
    name: "elon",
    civis: 19
}, {
    name: "yllirium",
    civis: 19
}, {
    name: "mihandria",
    civis: 19
}, {
    name: "misfir",
    civis: 19
}, {
    name: "hordron",
    civis: 19
}, {
    name: "parai",
    civis: 19
}]
  , civisCapitalsDefinition = [{
    civis: 8,
    capital: "virgo"
}, {
    civis: 9,
    capital: "lagea"
}, {
    civis: 7,
    capital: "uanass"
}, {
    civis: 6,
    capital: "zelera"
}, {
    civis: 5,
    capital: "miselquris"
}, {
    civis: 1,
    capital: "mexager"
}, {
    civis: 2,
    capital: "traumland"
}, {
    civis: 4,
    capital: "caerul"
}, {
    civis: 3,
    capital: "xora2"
}]
  , defaultEnv = ["desert", "ice", "terrestrial", "metallic", "carbon"]
  , allEnv = "desert;ice;terrestrial;forest;metallic;ocean;gas giant;lava;carbon;ammonia".split(";")
  , allEnvExt = "desert;ice;terrestrial;forest;metallic;ocean;gas giant;lava;acid;radioactive;carbon;ammonia".split(";")
  , allEnvRadio = "desert;ice;terrestrial;forest;metallic;ocean;gas giant;lava;radioactive;carbon;ammonia".split(";")
  , allEnvAcid = "desert;ice;terrestrial;forest;metallic;ocean;gas giant;lava;acid;carbon;ammonia".split(";")
  , allEnvHot = ["desert", "lava", "acid"]
  , allEnvCold = ["ice", "radioactive", "metallic", "carbon", "ammonia"]
  , allEnvTemperate = ["terrestrial", "forest", "ocean"]
  , allTer = "desert ice terrestrial forest metallic ocean carbon".split(" ")
  , allTerAcid = "desert ice terrestrial forest metallic ocean carbon acid".split(" ")
  , buildingsDefinition = [{
    name: "mine",
    displayName: "Mining Plant",
    cost: {
        iron: 10,
        steel: 9.75E-4,
        titanium: 2.1E-12
    },
    prod: {
        iron: 2
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.5
    },
    type: "mining"
}, {
    name: "methaneext",
    displayName: "Methane Extractor",
    cost: {
        iron: 100,
        steel: .1,
        titanium: 3E-5
    },
    prod: {
        methane: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.5
    },
    type: "mining"
}, {
    name: "graphext",
    displayName: "Graphite Extractor",
    cost: {
        iron: 500,
        steel: .5,
        titanium: 4E-4
    },
    prod: {
        graphite: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.5
    },
    type: "mining",
    environment: "desert ice terrestrial metallic radioactive acid carbon".split(" ")
}, {
    name: "pumpjack",
    displayName: "Oil Pump",
    cost: {
        steel: 1E3,
        titanium: .9
    },
    prod: {
        pollution: 1,
        oil: 1
    },
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining",
    req: {
        chemical: 1
    }
}, {
    name: "collector",
    displayName: "Metal Collector",
    cost: {
        steel: 2E3,
        titanium: .9
    },
    prod: {
        titanium: 10,
        uranium: 1
    },
    energy: -50,
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining",
    req: {
        mineralogy: 3
    },
    environment: "desert ice terrestrial metallic radioactive acid".split(" ")
}, {
    name: "farm",
    displayName: "Crop Farm",
    cost: {
        steel: 5E3,
        titanium: 2.1E-12
    },
    prod: {
        biomass: 1
    },
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining",
    environment: ["terrestrial"],
    req: {
        nononono: 1
    }
}, {
    name: "pump",
    displayName: "Water Pump",
    cost: {
        steel: 1E4,
        titanium: 1E3
    },
    energy: -10,
    prod: {
        water: 1
    },
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining",
    req: {
        hydro: 1
    }
}, {
    name: "quarry",
    req: {
        mineralogy: 4
    },
    displayName: "Sand Quarry",
    cost: {
        steel: 5E3,
        titanium: 1E3
    },
    prod: {
        sand: 1
    },
    energy: -80,
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining"
}, {
    name: "darkmatter_refiner",
    displayName: "Dark Matter Refiner",
    req: {
        darkmatter_science: 1
    },
    cost: {
        qasers: 1E4,
        meissnerium: 5E5
    },
    mult: {
        qasers: 1.2,
        meissnerium: 1.3
    },
    prod: {
        antimatter: -100,
        "dark matter": 1,
        "meissner cell": -10
    },
    type: "prod",
    type2: "prod",
    environment: allEnvExt
}, {
    name: "bioassembler",
    req: {
        mk_tech: 1
    },
    displayName: "Bioassembler",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    prod: {},
    type: "prod",
    type2: "prod"
}, {
    name: "biosynthesizer",
    req: {
        mk_tech: 1
    },
    displayName: "Biosynthesizer",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type: "prod",
    type2: "prod"
}, {
    name: "biocomputer",
    req: {
        mk_tech: 1
    },
    displayName: "Biocomputer",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type: "prod",
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "icedrill",
    displayName: "Ice Drill",
    cost: {
        iron: 1E4,
        steel: 2E3,
        titanium: 1E3
    },
    prod: {
        ice: 1
    },
    mult: {
        iron: 1.1,
        steel: 1.2,
        titanium: 1.3
    },
    type: "mining",
    environment: ["ice"],
    req: {
        ice: 1
    }
}, {
    name: "fish",
    displayName: "Arctic Fishing Outpost",
    cost: {
        titanium: 2E4,
        plastic: 1E4
    },
    prod: {
        biomass: 1
    },
    mult: {
        titanium: 1.5,
        plastic: 1.8
    },
    type: "mining",
    environment: ["ice"],
    req: {
        environment: 1
    }
}, {
    name: "hunting",
    displayName: "Hunting Spot",
    cost: {
        iron: 1E3,
        steel: 10
    },
    prod: {
        biomass: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.35
    },
    type: "mining",
    environment: ["terrestrial"],
    req: {
        environment: 1
    }
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "pumpplt",
    displayName: "Pumping Platform",
    cost: {
        steel: 5E3,
        titanium: 1E3
    },
    prod: {
        water: 5
    },
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "mining",
    environment: ["ocean"],
    req: {
        hydro: 0
    }
}, {
    name: "submetal",
    displayName: "Submerged Metal Mine",
    cost: {
        iron: 5E3,
        steel: 1E3,
        titanium: 100
    },
    prod: {
        iron: 5,
        titanium: 3,
        uranium: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "mining",
    environment: ["ocean", "ammonia"],
    req: {
        hydro: 1
    }
}, {
    name: "subsand",
    displayName: "Submerged Sand Mine",
    cost: {
        iron: 5E3,
        steel: 1E3,
        titanium: 100
    },
    prod: {
        graphite: 2,
        sand: 1,
        rhodium: 1,
        osmium: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "mining",
    environment: ["ocean", "ammonia"],
    req: {
        hydro: 1
    }
}, {
    name: "rhodiumext",
    displayName: "Rhodium Extractor",
    cost: {
        silicon: 25E4,
        sand: 100 * mi,
        fuel: 100 * mi
    },
    prod: {
        rhodium: 2,
        titanium: 20
    },
    mult: {
        silicon: 1.3,
        sand: 1.4,
        fuel: 1.5
    },
    energy: -800,
    type: "mining",
    environment: "desert lava metallic acid radioactive ice".split(" "),
    req: {
        rhodium: 1
    }
}, {
    name: "thoriumext",
    req: {
        karan_nuclear: 1
    },
    displayName: "Thorium-Caesium Extractor",
    cost: {
        titanium: 50 * mi,
        nanotubes: 5E5,
        engine: 3E4
    },
    mult: {
        titanium: 1.2,
        nanotubes: 1.3,
        engine: 1.2
    },
    prod: {
        thorium: 8,
        caesium: 1
    },
    energy: -300,
    type: "mining",
    environment: allEnvExt
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "floatharv",
    displayName: "Methane Harvester",
    cost: {
        iron: 1E4,
        steel: 100,
        plastic: 10,
        titanium: 2.1E-12
    },
    prod: {
        methane: 1
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "mining",
    environment: ["gas giant"]
}, {
    name: "condenser",
    displayName: "Hydrogen Condenser",
    cost: {
        steel: 25E3,
        titanium: 1E4,
        plastic: 500
    },
    prod: {
        hydrogen: 10
    },
    mult: {
        steel: 1.2,
        titanium: 1.3,
        plastic: 1.4
    },
    type: "mining",
    req: {
        nuclear: 1
    },
    environment: ["gas giant"]
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "sand",
    displayName: "Sand Mine",
    cost: {
        iron: 35E4
    },
    prod: {
        sand: 1
    },
    mult: {
        iron: 1.2
    },
    type: "mining",
    environment: ["desert"]
}, {
    name: "ammonia_ext",
    req: {
        ammonia_chemistry: 1
    },
    prod: {
        ammonia: 1
    },
    displayName: "Ammonia Extractor",
    cost: {
        nanotubes: 1 * mi,
        engine: 1E3
    },
    mult: {
        nanotubes: 1.25,
        engine: 1.35
    },
    type: "mining",
    environment: ["ammonia"]
}, {
    name: "ammonia_electro",
    req: {
        ammonia_chemistry: 1
    },
    displayName: "Ammonia Electrolyzer",
    cost: {
        nanotubes: 1 * mi,
        engine: 5E3
    },
    mult: {
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        ammonia: -10,
        hydrogen: 30
    },
    energy: -100,
    type: "prod",
    type2: "prod",
    environment: allEnv
}, {
    name: "ammonia_airship",
    type: "research",
    req: {
        ammonia_chemistry: 1
    },
    displayName: "Ammonia Airship",
    cost: {
        nanotubes: 25 * bi,
        coolant: 250 * mi,
        hydrogen: 5 * bi
    },
    mult: {
        nanotubes: 1.2,
        coolant: 1.5,
        hydrogen: 1.3
    },
    prod: {
        ammonia: -100
    },
    energy: -15E3,
    researchPoint: 1,
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "xiran_foundry",
    req: {
        xiran_artofwar: 1
    },
    displayName: "Xiran Foundry",
    cost: {
        meissnerium: 1E3
    },
    prod: {
        iron: -3 * mi,
        steel: -12 * mi,
        titanium: -900 * mi,
        xirandrium: 1,
        meissnerium: -10
    },
    energy: -8E3,
    mult: {
        meissnerium: 1.2
    },
    type: "prod",
    type2: "prod",
    environment: "desert ice terrestrial metallic carbon ocean ammonia".split(" ")
}, {
    name: "explosives_factory",
    displayName: "Explosives Factory",
    cost: {
        xirandrium: 1E3,
        superconductors: 15E3
    },
    req: {
        xiran_artofwar: 1
    },
    prod: {
        sulfur: -2E5,
        ammonia: -3E3,
        ammunition: -3 * mi,
        "u-ammunition": -mi,
        "t-ammunition": -2E5,
        explosives: 1
    },
    energy: -31E3,
    mult: {
        xirandrium: 1.1,
        superconductors: 1.3
    },
    type: "prod",
    type2: "prod",
    environment: "desert ice terrestrial metallic carbon lava acid radioactive".split(" ")
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "converter",
    displayName: "Methane Processer",
    cost: {
        iron: 100,
        steel: .25,
        titanium: 2E-4
    },
    mult: {
        iron: 1.1,
        steel: 1.2,
        titanium: 1.3
    },
    prod: {
        pollution: 2,
        methane: -2,
        fuel: 1
    },
    type: "prod",
    type2: "prod"
}, {
    name: "foundry",
    displayName: "Foundry",
    cost: {
        iron: 1E3,
        steel: .48,
        titanium: .01
    },
    prod: {
        pollution: 2,
        steel: 2,
        graphite: -1,
        iron: -2,
        fuel: -2
    },
    mult: {
        iron: 1.1,
        steel: 1.2,
        titanium: 1.3
    },
    type: "prod",
    type2: "prod"
}, {
    name: "ref",
    displayName: "Oil Refinery",
    cost: {
        steel: 5E3,
        titanium: 100
    },
    prod: {
        pollution: 50,
        oil: -1,
        fuel: 5
    },
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "prod",
    type2: "prod",
    req: {
        chemical: 2
    }
}, {
    name: "plastic",
    displayName: "Plastic Factory",
    cost: {
        steel: 1E4,
        titanium: 5E3
    },
    prod: {
        pollution: 100,
        oil: -3,
        plastic: 1
    },
    energy: -100,
    mult: {
        steel: 1.25,
        titanium: 1.35
    },
    type: "prod",
    type2: "prod",
    req: {
        material: 8
    }
}, {
    name: "sandsmelt",
    displayName: "Sand Smelter",
    cost: {
        steel: 2E4,
        titanium: 1E4,
        plastic: 500
    },
    prod: {
        sand: -1,
        silicon: 1
    },
    energy: -50,
    mult: {
        steel: 1.1,
        titanium: 1.2,
        plastic: 1.3
    },
    type: "prod",
    type2: "prod",
    req: {
        electronics: 1
    }
}, {
    name: "electronic",
    displayName: "Electronic Facility",
    cost: {
        steel: 1E5,
        titanium: 5E4,
        plastic: 2E3
    },
    prod: {
        pollution: 10,
        plastic: -2,
        silicon: -10,
        circuit: 1
    },
    energy: -200,
    mult: {
        steel: 1.2,
        titanium: 1.3,
        plastic: 1.4
    },
    type: "prod",
    type2: "prod",
    req: {
        electronics: 1
    }
}, {
    name: "amno",
    displayName: "Ammunition Factory",
    cost: {
        titanium: 1E5,
        plastic: 2E4
    },
    prod: {
        steel: -100,
        fuel: -5,
        plastic: -3,
        ammunition: 10
    },
    mult: {
        titanium: 1.25,
        plastic: 1.35
    },
    energy: -200,
    type: "prod",
    type2: "prod",
    req: {
        military: 1
    },
    description: "Ammunition can be loaded into war fleets to receive an additional power bonus. All ammunitions will be depleted after the battle."
}, {
    name: "freezer",
    displayName: "Water Freezer",
    cost: {
        iron: 28E3,
        steel: 1E4,
        titanium: 500
    },
    prod: {
        ice: 3,
        water: -2
    },
    energy: -30,
    mult: {
        iron: 1.15,
        steel: 1.27,
        titanium: 1.35
    },
    type: "prod",
    type2: "prod",
    req: {
        ice: 1
    }
}, {
    name: "nanofact",
    req: {
        material: 15
    },
    displayName: "Nanotubes Factory",
    cost: {
        titanium: 25E4,
        plastic: 5E4,
        circuit: 15E3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    energy: -500,
    prod: {
        graphite: -200,
        plastic: -10,
        hydrogen: -100,
        nanotubes: 5
    },
    type: "prod",
    type2: "prod"
}, {
    name: "coolfact",
    req: {
        ice: 10
    },
    displayName: "Coolant Factory",
    cost: {
        plastic: 3E5,
        circuit: 1E5
    },
    mult: {
        plastic: 1.25,
        circuit: 1.35
    },
    prod: {
        coolant: 8,
        ice: -2E3,
        methane: -100
    },
    energy: -500,
    type: "prod",
    type2: "prod"
}, {
    name: "robotfact",
    req: {
        artificial_intelligence: 1
    },
    displayName: "Robots Factory",
    cost: {
        plastic: 5E5,
        circuit: 25E4,
        nanotubes: 5E4
    },
    mult: {
        plastic: 1.2,
        circuit: 1.3,
        nanotubes: 1.4
    },
    prod: {
        robots: 1,
        coolant: -8,
        circuit: -50,
        nanotubes: -28,
        steel: -800,
        "full battery": -100
    },
    energy: -500,
    type: "prod",
    type2: "prod"
}, {
    name: "armorfact",
    req: {
        military: 12
    },
    displayName: "Armor Factory",
    cost: {
        circuit: 5E5,
        nanotubes: 1E5
    },
    energy: -2E3,
    mult: {
        circuit: 1.25,
        nanotubes: 1.35
    },
    prod: {
        steel: -1E3,
        titanium: -500,
        plastic: -200,
        armor: 3
    },
    type: "prod",
    type2: "prod",
    environment: "desert ice terrestrial metallic lava acid".split(" "),
    description: "Armor can be loaded into war fleets to receive an additive armor bonus. Half of the armor storage will depleted after the battle."
}, {
    name: "enginefact",
    req: {
        military: 16
    },
    displayName: "Engine Factory",
    cost: {
        circuit: 8E5,
        nanotubes: 2E5,
        robots: 1E3
    },
    energy: -2500,
    mult: {
        circuit: 1.2,
        nanotubes: 1.3,
        robots: 1.4
    },
    prod: {
        oil: -500,
        coolant: -100,
        circuit: -100,
        steel: -1E3,
        titanium: -500,
        plastic: -200,
        engine: 2
    },
    type: "prod",
    type2: "prod",
    environment: "desert ice terrestrial metallic lava acid".split(" "),
    description: "Engines can be loaded into fleets to receive a speed bonus. Engines won't be depleted during a battle."
}, {
    name: "icesmelter",
    req: {
        ice: 1
    },
    displayName: "Ice Melter",
    cost: {
        iron: 28E3,
        steel: 1E4,
        titanium: 500
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "prod",
    type2: "prod",
    prod: {
        fuel: -1,
        ice: -3,
        water: 2
    },
    environment: allEnvAcid
}, {
    name: "battery_factory",
    req: {
        electronics: 8
    },
    displayName: "Battery Factory",
    cost: {
        titanium: 15E4,
        plastic: 35E3,
        circuit: 2E3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    type: "prod",
    prod: {
        "empty battery": 1E3,
        hydrogen: -1E3,
        steel: -35E4
    },
    energy: -100,
    type2: "prod",
    environment: allEnv,
    description: "Batteries can be used to build other resources or to exchange power between planets."
}, {
    name: "biofuel",
    req: {
        environment: 1
    },
    displayName: "Biofuel Refinery",
    cost: {
        titanium: 1E5,
        plastic: 5E4,
        circuit: 15E3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    prod: {
        oil: 1,
        fuel: 1,
        water: -2,
        biomass: -3
    },
    type: "prod",
    type2: "prod",
    environment: allEnv
}, {
    name: "bioplastic",
    req: {
        environment: 1
    },
    displayName: "Bioplastic Synthesizer",
    cost: {
        titanium: 1E5,
        plastic: 5E4,
        circuit: 15E3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    prod: {
        biomass: -3,
        water: -2,
        plastic: 1
    },
    energy: -80,
    type: "prod",
    type2: "prod",
    environment: allEnv
}, {
    name: "electrolyzer",
    req: {
        hydro: 1
    },
    displayName: "Electrolyzer",
    cost: {
        titanium: 25E3,
        plastic: 1E3,
        circuit: 100
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    prod: {
        water: -1,
        hydrogen: 2
    },
    energy: -50,
    type: "prod",
    type2: "prod",
    environment: allEnv
}, {
    name: "ufact",
    req: {
        military: 8
    },
    displayName: "Uranium Shell Assembler",
    cost: {
        circuit: 3E4,
        plastic: 5E4
    },
    energy: -300,
    mult: {
        circuit: 1.35,
        plastic: 1.25
    },
    type2: "prod",
    type: "prod",
    prod: {
        ammunition: -15,
        uranium: -8,
        "u-ammunition": 5
    },
    environment: allEnvExt,
    description: "U-Ammunition can be loaded into war fleets to receive a power bonus. All ammunitions will be depleted during the battle."
}, {
    name: "algaefarm",
    displayName: "Algae Oil Farm",
    cost: {
        iron: 28E3,
        steel: 1E4,
        titanium: 500
    },
    prod: {
        water: -7,
        oil: 3
    },
    energy: -10,
    mult: {
        iron: 1.15,
        steel: 1.27,
        titanium: 1.35
    },
    type: "prod",
    type2: "prod",
    environment: ["ocean"],
    req: {
        hydro: 0
    }
}, {
    name: "marineref",
    displayName: "Submerged Oil Refinery",
    cost: {
        steel: 15E3,
        titanium: 1E3
    },
    prod: {
        oil: -3,
        fuel: 10
    },
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "prod",
    type2: "prod",
    environment: ["ocean", "ammonia"],
    req: {
        hydro: 0
    }
}, {
    name: "nanomarine",
    req: {
        material: 15
    },
    displayName: "Nanotubes Dome",
    cost: {
        titanium: 25E4,
        plastic: 5E4,
        circuit: 15E3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    energy: -500,
    prod: {
        graphite: -170,
        water: -15,
        plastic: -8,
        hydrogen: -80,
        nanotubes: 5
    },
    type: "prod",
    type2: "prod",
    environment: ["ocean", "ammonia"]
}, {
    name: "tfact",
    req: {
        artofwar: 1
    },
    displayName: "T-Ammunition Assembler",
    cost: {
        technetium: 1E5,
        graphite: 2E5
    },
    mult: {
        technetium: 1.35,
        graphite: 1.25
    },
    type: "prod",
    energy: -750,
    type2: "prod",
    environment: allEnv,
    prod: {
        "u-ammunition": -3,
        technetium: -50,
        steel: -1E5,
        "t-ammunition": 1
    },
    description: "T-Ammunition can be loaded into war fleets to receive an additional power bonus. All ammunitions will be depleted after the battle."
}, {
    name: "particle",
    req: {
        quantum: 1
    },
    displayName: "Particle Accelerator",
    cost: {
        steel: 100 * mi,
        technetium: 1 * mi
    },
    mult: {
        steel: 1.8,
        technetium: 1.25
    },
    energy: -1E3,
    prod: {
        antimatter: 1,
        hydrogen: -1E3
    },
    type: "prod",
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "rhodiumsand",
    req: {
        rhodium: 1
    },
    displayName: "Rhodium Sand Smelter",
    cost: {
        silicon: 25E4,
        sand: 100 * mi,
        fuel: 100 * mi
    },
    prod: {
        rhodium: -5,
        sand: -150,
        silicon: 100
    },
    mult: {
        silicon: 1.3,
        sand: 1.4,
        fuel: 1.5
    },
    energy: -200,
    type: "prod",
    type2: "prod",
    environment: ["lava", "acid", "desert", "metallic"]
}, {
    name: "floatconv",
    displayName: "Floating Fuel Converter",
    cost: {
        steel: 1E4,
        titanium: 8E3,
        plastic: 5E3
    },
    prod: {
        methane: -5,
        fuel: 3
    },
    mult: {
        steel: 1.2,
        titanium: 1.3,
        plastic: 1.4
    },
    type: "prod",
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "floathouse",
    displayName: "Floating Greenhouse",
    cost: {
        steel: 1E4,
        titanium: 8E3,
        plastic: 5E3
    },
    prod: {
        water: -10,
        biomass: 10
    },
    energy: -100,
    mult: {
        steel: 1.2,
        titanium: 1.3,
        plastic: 1.4
    },
    type: "prod",
    type2: "prod",
    environment: ["gas giant"],
    req: {
        environment: 1
    }
}, {
    name: "polymer",
    req: {
        material: 8
    },
    displayName: "Polymerizer",
    cost: {
        titanium: 2E4,
        plastic: 1E3
    },
    energy: -150,
    prod: {
        methane: -80,
        water: -5,
        plastic: 2
    },
    mult: {
        titanium: 1.25,
        plastic: 1.35
    },
    type: "prod",
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "osmiumext",
    req: {
        osmium: 1
    },
    displayName: "Osmium Extractor",
    cost: {
        silicon: 5E5,
        rhodium: 3500
    },
    prod: {
        osmium: 1
    },
    mult: {
        silicon: 1.3,
        rhodium: 1.5
    },
    energy: -1200,
    type: "mining",
    environment: ["ice", "metallic", "radioactive"]
}, {
    name: "mkclone",
    req: {
        osmium: 1
    },
    displayName: "Metallokopta Clonator",
    cost: {
        silicon: 25E5,
        rhodium: 15E3
    },
    prod: {
        osmium: -5,
        robots: -5,
        sulfur: -20,
        silicon: -85,
        "mK Embryo": 1
    },
    mult: {
        silicon: 1.3,
        rhodium: 1.5
    },
    energy: -2E3,
    type: "prod",
    type2: "prod",
    environment: ["ice", "desert", "metallic", "radioactive"]
}, {
    name: "ammonia_refrigerator",
    req: {
        ammonia_chemistry: 1
    },
    displayName: "Ammonia Refrigerator",
    cost: {
        nanotubes: 10 * mi,
        engine: 1 * mi
    },
    mult: {
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        coolant: 8,
        ammonia: -10,
        methane: -200
    },
    energy: -500,
    type: "prod",
    type2: "prod",
    environment: allEnv
}, {
    name: "generator",
    displayName: "Small Generator",
    cost: {
        iron: 2E3,
        steel: 100,
        titanium: .17
    },
    prod: {
        pollution: 10,
        fuel: -3
    },
    energy: 20,
    mult: {
        iron: 1.15,
        steel: 1.27,
        titanium: 1.35
    },
    type: "energy",
    type2: "prod"
}, {
    name: "thermal",
    displayName: "Thermal Plant",
    cost: {
        iron: 5E3,
        steel: 1E3,
        titanium: .17
    },
    prod: {
        pollution: 30,
        fuel: -10
    },
    energy: 100,
    mult: {
        iron: 2.5,
        steel: 2.7,
        titanium: 1.9
    },
    type: "energy",
    type2: "prod",
    req: {
        chemical: 1
    }
}, {
    name: "solar",
    displayName: "Solar Central",
    cost: {
        steel: 1E4,
        titanium: 1E4,
        silicon: 1E3
    },
    mult: {
        steel: 1.1,
        titanium: 1.1,
        silicon: 1.3
    },
    energy: 50,
    type: "energy",
    type2: "solar",
    req: {
        electronics: 1
    },
    environment: allEnvExt
}, {
    name: "nuclear",
    displayName: "Nuclear Powerplant",
    cost: {
        titanium: 1E5,
        plastic: 2E4,
        graphite: 1E6
    },
    prod: {
        pollution: 100,
        uranium: -10,
        graphite: -3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        graphite: 1.4
    },
    energy: 500,
    type: "energy",
    type2: "prod",
    req: {
        nuclear: 1
    },
    environment: "desert terrestrial ice metallic lava acid".split(" ")
}, {
    name: "fusion",
    displayName: "Fusion Reactor",
    cost: {
        titanium: 25E4,
        plastic: 1E5,
        circuit: 1E4
    },
    prod: {
        hydrogen: -150
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    energy: 1100,
    type: "energy",
    type2: "prod",
    req: {
        nuclear: 5
    }
}, {
    name: "battery_plant",
    req: {
        electronics: 8
    },
    displayName: "Battery Power Plant",
    prod: {
        "full battery": -1E4,
        "empty battery": 9500
    },
    cost: {
        titanium: 2E5,
        plastic: 5E4,
        circuit: 5E3
    },
    energy: 240,
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        circuit: 1.4
    },
    type: "energy",
    type2: "prod",
    environment: allEnv
}, {
    name: "collider",
    req: {
        quantum: 1
    },
    displayName: "Antimatter Collider",
    cost: {
        steel: 100 * mi,
        technetium: 1 * mi
    },
    mult: {
        steel: 1.8,
        technetium: 1.25
    },
    energy: 8E3,
    prod: {
        antimatter: -1,
        hydrogen: -1E3
    },
    type: "energy",
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "nuclear_radio",
    displayName: "Nuclear Powerplant",
    cost: {
        titanium: 1E5,
        plastic: 2E4,
        graphite: 1E6
    },
    prod: {
        pollution: 100,
        uranium: -10,
        graphite: -3
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        graphite: 1.4
    },
    energy: 2E3,
    type: "energy",
    type2: "prod",
    req: {
        nuclear: 1
    },
    environment: ["radioactive"]
}, {
    name: "suboilgen",
    displayName: "Hydrothermal Plant",
    cost: {
        steel: 1E4,
        titanium: 2E3
    },
    prod: {
        water: -2,
        fuel: -10
    },
    energy: 100,
    mult: {
        iron: 1.2,
        steel: 1.35,
        titanium: 1.5
    },
    type: "energy",
    type2: "prod",
    environment: ["ocean"],
    req: {
        hydro: 0
    }
}, {
    name: "dam",
    displayName: "Hydroelectric Plant",
    cost: {
        steel: 15E3,
        titanium: 1E4,
        plastic: 1500
    },
    prod: {
        water: -10
    },
    mult: {
        steel: 1.1,
        titanium: 1.2,
        plastic: 1.3
    },
    energy: 200,
    type: "energy",
    type2: "prod",
    environment: ["ocean"],
    req: {
        hydro: 0
    }
}, {
    name: "pressurized",
    displayName: "Pressurized Water Reactor",
    cost: {
        titanium: 2E5,
        plastic: 1E5,
        graphite: 5E5
    },
    prod: {
        pollution: 200,
        uranium: -5,
        water: -20
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        graphite: 1.4
    },
    energy: 500,
    type: "energy",
    type2: "prod",
    environment: ["ocean"],
    req: {
        nuclear: 3
    }
}, {
    name: "thorium_reactor",
    displayName: "Thorium Reactor",
    cost: {
        titanium: 80 * mi,
        nanotubes: 5 * mi,
        engine: 8E4
    },
    prod: {
        thorium: -5
    },
    mult: {
        titanium: 1.2,
        nanotubes: 1.3,
        engine: 1.2
    },
    energy: 2500,
    type: "energy",
    type2: "prod",
    req: {
        karan_nuclear: 1
    },
    environment: "desert terrestrial ice metallic lava acid".split(" ")
}, {
    name: "thorium_reactor2",
    displayName: "Thorium Reactor",
    cost: {
        titanium: 80 * mi,
        nanotubes: 5 * mi,
        engine: 8E4
    },
    prod: {
        thorium: -5
    },
    mult: {
        titanium: 1.2,
        nanotubes: 1.3,
        engine: 1.2
    },
    energy: 5E3,
    type: "energy",
    type2: "prod",
    req: {
        karan_nuclear: 1
    },
    environment: ["radioactive", "ocean"]
}, {
    name: "floatgenerator",
    displayName: "Floating Generator",
    cost: {
        iron: 2E3,
        steel: 100,
        titanium: .17
    },
    prod: {
        pollution: 10,
        fuel: -3
    },
    energy: 20,
    mult: {
        iron: 1.2,
        steel: 1.3,
        titanium: 1.4
    },
    type: "energy",
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "floatreactor",
    displayName: "Floating Reactor",
    cost: {
        plastic: 2E5,
        circuit: 5E4
    },
    prod: {
        hydrogen: -100
    },
    energy: 1E3,
    mult: {
        plastic: 1.25,
        circuit: 1.35
    },
    type: "energy",
    type2: "prod",
    environment: ["gas giant"],
    req: {
        nuclear: 5
    }
}, {
    name: "orbitalgen",
    req: {
        energetics: 2E3
    },
    displayName: "Orbital ",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "energy"
}, {
    name: "pressurized_ammonia",
    displayName: "Pressurized Ammonia Reactor",
    cost: {
        titanium: 2E5,
        plastic: 1E5,
        graphite: 5E5
    },
    prod: {
        pollution: 200,
        thorium: -5,
        ammonia: -20
    },
    mult: {
        titanium: 1.2,
        plastic: 1.3,
        graphite: 1.4
    },
    energy: 800,
    type: "energy",
    type2: "prod",
    environment: ["ammonia"],
    req: {
        ammonia_chemistry: 1
    }
}, {
    name: "bacterial_bioreactor",
    displayName: "Bacterial Bioreactor",
    cost: {
        nanotubes: mi,
        engine: 1E5
    },
    prod: {
        ammonia: -100,
        biomass: -mi,
        water: -5E5,
        coolant: -1E4
    },
    mult: {
        nanotubes: 1.35,
        engine: 1.2
    },
    energy: 5E3,
    type: "energy",
    type2: "prod",
    environment: ["ammonia", "terrestrial"],
    req: {
        ammonia_chemistry: 5
    }
}, {
    name: "lab",
    displayName: "Laboratory",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    researchPoint: 4,
    energy: -5,
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod",
    type: "research"
}, {
    name: "shipyard",
    displayName: "Shipyard",
    cost: {
        steel: 5E3,
        titanium: 1E3
    },
    mult: {
        steel: 2,
        titanium: 3.2
    },
    req: {
        astronomy: 1
    },
    environment: allEnv
}, {
    name: "serra",
    displayName: "Greenhouse",
    cost: {
        steel: 1E5,
        titanium: 5E4,
        plastic: 1E4
    },
    prod: {
        water: -50,
        biomass: 10
    },
    mult: {
        steel: 2.2,
        titanium: 1.8,
        plastic: 1.4
    },
    type2: "prod",
    req: {
        environment: 1
    },
    environment: allEnv
}, {
    name: "residential",
    displayName: "Residential Complex",
    cost: {
        iron: mi,
        steel: 1E5,
        titanium: 5E4
    },
    space: 2E3,
    mult: {
        iron: 1.3,
        steel: 1.3,
        titanium: 1.25
    },
    type2: "prod",
    req: {
        demographics: 1
    },
    environment: ["terrestrial", "ice", "desert", "metallic", "carbon"]
}, {
    name: "clonation",
    displayName: "Clonation Center",
    cost: {
        titanium: 1E5,
        circuit: 5E3
    },
    mult: {
        titanium: 1.8,
        circuit: 2
    },
    type2: "prod",
    req: {
        demographics: 10
    },
    environment: allEnvExt
}, {
    name: "aquarium",
    req: {
        demographics: 1
    },
    displayName: "Human Aquarium",
    cost: {
        steel: 2E5,
        plastic: 1E3
    },
    space: 8E3,
    mult: {
        steel: 1.3,
        plastic: 1.35
    },
    type2: "prod",
    environment: ["ammonia", "ocean"]
}, {
    name: "battery_charger",
    req: {
        electronics: 8
    },
    displayName: "Battery Charger",
    cost: {
        steel: 5E5,
        titanium: 1E5,
        plastic: 2E4
    },
    mult: {
        steel: 1.2,
        titanium: 1.2,
        plastic: 1.2
    },
    prod: {
        "empty battery": -1E4,
        "full battery": 1E4
    },
    energy: -250,
    type2: "prod",
    environment: allEnvExt
}, {
    name: "tradehub",
    displayName: "Trade Hub",
    cost: {
        steel: 5E4,
        titanium: 1E4
    },
    mult: {
        steel: 2,
        titanium: 3.2
    },
    req: {
        astronomy: 5
    },
    environment: allEnv,
    description: "The Trade Hub enables trading with other civilizations. Multiple trade hubs on the same planet reduce the buying price of resources. This effect stacks globally"
}, {
    name: "oceanographic",
    displayName: "Oceanographic Center",
    cost: {
        steel: 2E4,
        titanium: 5E3
    },
    prod: {
        water: -2
    },
    energy: -50,
    researchPoint: 10,
    mult: {
        steel: 1.5,
        titanium: 2
    },
    type2: "prod",
    type: "research",
    environment: ["ocean", "ammonia"],
    req: {
        hydro: 0
    }
}, {
    name: "bioengineering",
    req: {
        environment: 1
    },
    displayName: "Bioengineering Center",
    cost: {
        titanium: 2E5,
        plastic: 5E3,
        circuit: 1E3
    },
    prod: {
        water: -5,
        biomass: -5
    },
    energy: -250,
    type: "research",
    researchPoint: 20,
    mult: {
        titanium: 2,
        plastic: 3,
        circuit: 4
    },
    type2: "prod",
    environment: allEnv
}, {
    name: "cryolab",
    type: "research",
    req: {
        ice: 12
    },
    displayName: "Cryogenic Laboratory",
    cost: {
        plastic: 3E5,
        circuit: 1E5
    },
    mult: {
        plastic: 1.25,
        circuit: 1.35
    },
    prod: {
        ice: -100
    },
    energy: -100,
    researchPoint: 1,
    type2: "prod",
    environment: ["ice", "radioactive"]
}, {
    name: "karanlab",
    req: {
        karan_nuclear: 1
    },
    displayName: "Karan Laboratory",
    cost: {
        titanium: 100 * mi,
        nanotubes: 2 * mi,
        engine: 25E4
    },
    mult: {
        titanium: 1.2,
        nanotubes: 1.3,
        engine: 1.2
    },
    prod: {
        thorium: -8,
        caesium: -4,
        uranium: -25
    },
    type2: "prod",
    type: "research",
    researchPoint: 8E3,
    energy: -1E3,
    environment: "ice metallic acid lava terrestrial desert".split(" ")
}, {
    name: "fluidod",
    type: "research",
    displayName: "Fluidodynamics Center",
    cost: {
        titanium: 1E4,
        plastic: 1E3
    },
    energy: -70,
    researchPoint: 10,
    mult: {
        titanium: 1.5,
        plastic: 2
    },
    prod: {
        hydrogen: -5
    },
    type2: "prod",
    environment: ["gas giant"]
}, {
    name: "karanlab2",
    req: {
        karan_nuclear: 1
    },
    displayName: "Karan Laboratory",
    cost: {
        titanium: 100 * mi,
        nanotubes: 2 * mi,
        engine: 25E4
    },
    mult: {
        titanium: 1.2,
        nanotubes: 1.3,
        engine: 1.2
    },
    prod: {
        thorium: -8,
        caesium: -4,
        uranium: -25
    },
    type2: "prod",
    type: "research",
    researchPoint: 16E3,
    energy: -1E3,
    environment: ["radioactive"]
}, {
    name: "floathaus",
    req: {
        demographics: 5
    },
    space: 1E3,
    displayName: "Orbital Colony",
    cost: {
        titanium: 15E4,
        circuit: 2E4,
        hydrogen: 1E4
    },
    mult: {
        titanium: 1.1,
        circuit: 1.2,
        hydrogen: 1.3
    },
    type2: "prod",
    environment: ["lava", "acid", "radioactive", "gas giant"]
}, {
    name: "superfluids_center",
    req: {
        protohalean_science: 2
    },
    displayName: "Superfluids Center",
    cost: {
        nanotubes: 20 * mi,
        engine: 3 * mi,
        meissnerium: 5E3
    },
    mult: {
        meissnerium: 1.3,
        nanotubes: 1.25,
        engine: 1.3
    },
    prod: {
        qasers: -1,
        superconductors: -10,
        coolant: -1E3
    },
    researchPoint: 25E4,
    energy: -38E3,
    type: "research",
    type2: "prod",
    environment: ["ocean", "ammonia"]
}, {
    name: "turret",
    displayName: "Ballistic Artillery",
    cost: {
        xirandrium: 1E3,
        superconductors: 1E3
    },
    mult: {
        xirandrium: 1.2,
        superconductors: 1.2
    },
    req: {
        xiran_artofwar: 2
    },
    type2: "prod",
    description: "The ballistic artillery will help orbiting fleets defending the planet during attacks. It will provide a 10% power bonus, consuming 10 explosives each round",
    environment: allEnvExt
}, {
    name: "laser",
    displayName: "Laser Artillery",
    cost: {
        xirandrium: 1E3,
        superconductors: 1E3
    },
    mult: {
        xirandrium: 1.2,
        superconductors: 1.2
    },
    req: {
        xiran_artofwar: 3
    },
    type2: "prod",
    description: "The laser artillery will help orbiting fleets defending the planet during attacks. It will provide a 15% power bonus, consuming 1 million full batteries each round",
    environment: allEnvExt
}, {
    name: "shieldturret",
    displayName: "Shield Turret",
    cost: {
        steel: 1E6,
        titanium: 5E5,
        plastic: 1E5
    },
    mult: {
        iron: 1,
        titanium: 1,
        steel: 1,
        plastic: 1
    },
    energy: -150,
    type: "defence",
    req: {
        military: 4
    }
}, {
    name: "pierturret",
    displayName: "Armor Piercing Turret",
    cost: {
        titanium: 1E6,
        plastic: 2E5,
        ammunition: 1E5
    },
    mult: {
        iron: 1,
        titanium: 1,
        steel: 1,
        plastic: 1
    },
    type: "defence",
    req: {
        military: 5
    }
}, {
    name: "cannon",
    displayName: "Planetary Cannon",
    cost: {
        xirandrium: mi,
        superconductors: 10 * mi,
        explosives: 1E5
    },
    mult: {
        xirandrium: 2,
        superconductors: 1.7,
        explosives: 1.5
    },
    req: {
        xiran_artofwar: 8
    },
    type2: "prod",
    environment: allEnvExt,
    description: "The planetary cannon can be used to damage enemy fleets on distant planets when they are under attack. It will provide a power bonus of 50%/(1+distance^2/10000)"
}, {
    name: "aggregator",
    req: {
        chemical: 30
    },
    displayName: "Methane Aggregator",
    cost: {
        steel: bi,
        nanotubes: 10 * mi,
        engine: 1E5
    },
    mult: {
        steel: 1.35,
        nanotubes: 1.3,
        engine: 1.3
    },
    prod: {
        methane: -mi,
        nanotubes: 20
    },
    energy: -5E3,
    type: "prod",
    type2: "prod",
    environment: ["lava", "gas giant"]
}, {
    name: "ceramic",
    req: {
        material: 35
    },
    displayName: "Ceramic Foundry",
    cost: {
        nanotubes: 10 * mi,
        engine: 1 * mi
    },
    mult: {
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        water: -5E5,
        nanotubes: -1E4,
        rhodium: -2E3,
        sulfur: -1E3,
        osmium: -500,
        meissnerium: 1,
        iron: -2500
    },
    environment: allTerAcid,
    energy: -500,
    type: "prod",
    type2: "prod"
}, {
    name: "superconductor_factory",
    req: {
        electronics: 30
    },
    displayName: "Superconductors Factory",
    cost: {
        nanotubes: 10 * mi,
        engine: 1 * mi,
        meissnerium: 1E3
    },
    mult: {
        meissnerium: 1.2,
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        meissnerium: -1,
        coolant: -350,
        superconductors: 1
    },
    environment: allTerAcid,
    energy: -5E3,
    type: "prod",
    type2: "prod"
}, {
    name: "mcell_factory",
    req: {
        electronics: 35
    },
    displayName: "Cells Factory",
    cost: {
        nanotubes: 10 * mi,
        engine: 1 * mi,
        meissnerium: 1E3
    },
    mult: {
        meissnerium: 1.2,
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        superconductors: -1,
        circuits: -10 * mi,
        nanotubes: -10 * mi,
        "meissner cell": 1
    },
    environment: allTerAcid,
    energy: -1E4,
    type: "prod",
    type2: "prod"
}, {
    name: "qasers_assembler",
    req: {
        protohalean_science: 1
    },
    displayName: "Qasers Assembler",
    cost: {
        nanotubes: mi,
        engine: 25E4,
        meissnerium: 300
    },
    mult: {
        meissnerium: 1.2,
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        superconductors: -1,
        circuits: -10 * mi,
        nanotubes: -10 * mi,
        qasers: 1,
        water: -25E4
    },
    energy: -1E4,
    type: "prod",
    type2: "prod"
}, {
    name: "shield_assembler",
    req: {
        protohalean_science: 5
    },
    displayName: "Shield Assembler",
    cost: {
        nanotubes: 50 * mi,
        engine: 10 * mi,
        meissnerium: 15E3
    },
    mult: {
        meissnerium: 1.2,
        nanotubes: 1.25,
        engine: 1.35
    },
    prod: {
        "meissner cell": -2,
        qasers: -10,
        "shield capsule": 1
    },
    energy: -2E4,
    type: "prod",
    type2: "prod"
}, {
    name: "fissor",
    displayName: "Technetium Fissor",
    cost: {
        graphite: 5E6,
        nanotubes: 500
    },
    prod: {
        technetium: 1,
        uranium: -12
    },
    mult: {
        graphite: 1.25,
        nanotubes: 1.35
    },
    type: "prod",
    type2: "prod",
    req: {
        halean: 1
    },
    environment: allEnvRadio
}, {
    name: "haleanFusion",
    displayName: "Caesium Energy Station",
    cost: {
        technetium: 5E6,
        rhodium: 8E5
    },
    prod: {
        caesium: -3
    },
    mult: {
        technetium: 1.15,
        rhodium: 1.2
    },
    energy: 5E4,
    type: "energy",
    type2: "prod",
    req: {
        nononono: 15
    },
    environment: ["gas giant", "radioactive", "acid"]
}, {
    name: "haleanRobots",
    displayName: "Halean A.I. Center",
    cost: {
        circuit: 5E5,
        nanotubes: 2E3,
        technetium: 100
    },
    prod: {
        circuit: -50,
        technetium: -5,
        robots: 1,
        "full battery": -100
    },
    mult: {
        circuit: 1.5,
        nanotubes: 1.3,
        technetium: 1.2
    },
    energy: -500,
    type: "prod",
    type2: "prod",
    req: {
        halean: 1
    },
    environment: allEnvRadio
}, {
    name: "haleanResearch",
    type: "research",
    displayName: "Halean Laboratory",
    cost: {
        circuit: 5E5,
        nanotubes: 2E3,
        technetium: 100
    },
    researchPoint: 90,
    mult: {
        circuit: 1.5,
        nanotubes: 1.3,
        technetium: 1.2
    },
    environment: allEnvRadio,
    prod: {
        technetium: -2
    },
    energy: -500,
    type2: "prod",
    req: {
        halean: 1
    }
}, {
    name: "lavaresearch",
    type: "research",
    req: {
        vulcan: 1
    },
    displayName: "Vulcan Observatory",
    cost: {
        technetium: 1E5,
        graphite: 2 * mi
    },
    mult: {
        technetium: 1.35,
        graphite: 1.25
    },
    prod: {
        sulfur: -3
    },
    energy: -800,
    researchPoint: 1,
    type2: "prod",
    environment: ["lava", "acid"]
}, {
    name: "lavamine",
    req: {
        vulcan: 1
    },
    displayName: "Carbon-Sulfur Mine",
    cost: {
        technetium: 1E5,
        graphite: 1 * mi
    },
    mult: {
        technetium: 1.35,
        graphite: 1.25
    },
    prod: {
        sulfur: 3,
        graphite: 2
    },
    energy: -100,
    type: "mining",
    environment: ["lava", "radioactive", "acid"]
}, {
    name: "lavamine2",
    req: {
        vulcan: 1
    },
    displayName: "Lava Mine",
    cost: {
        technetium: 1E5,
        graphite: 1 * mi
    },
    mult: {
        technetium: 1.35,
        graphite: 1.25
    },
    prod: {
        titanium: 8
    },
    energy: -200,
    type: "mining",
    environment: ["lava", "acid"]
}, {
    name: "time_machine",
    displayName: "Wahrian Time Machine",
    cost: {
        iron: 500 * bi,
        steel: mi * mi,
        titanium: 10 * bi
    },
    mult: {
        iron: 1.5,
        steel: 2,
        titanium: 2.2
    },
    req: {
        secret: 1
    },
    environment: allEnvExt,
    type2: "prod",
    description: "Using the time machine will reset your progress converting your Research Points into Technology Points"
}, {
    name: "space_machine",
    displayName: "Space Gate Alpha",
    cost: {
        iron: 500 * bi,
        steel: mi * mi,
        titanium: 10 * bi
    },
    mult: {
        iron: 1.5,
        steel: 2,
        titanium: 2.2
    },
    req: {
        secret: 1
    },
    environment: allEnvExt,
    type2: "prod",
    description: "The Space Gate Alpha will warp a fleet of your choice to Solidad in Andromeda's Heart. The option to warp will appear once you have selected your fleet."
}, {
    name: "cryocell_fact",
    displayName: "Cryocell Facility",
    energy: -20,
    prod: {
        "empty cryocell": 1,
        ice: -3,
        steel: -35,
        titanium: -5
    },
    cost: {
        iron: 2E5,
        steel: 5E4,
        titanium: 1E3
    },
    mult: {
        iron: 1.3,
        steel: 1.35,
        titanium: 1.4
    },
    req: {
        ice: 2,
        demographics: 2
    },
    environment: allEnvExt,
    type2: "prod"
}, {
    name: "hibernation",
    displayName: "Hibernation Chamber",
    energy: -50,
    prod: {
        "loaded cryocell": 10,
        "empty cryocell": -10
    },
    population: -10,
    cost: {
        iron: 25E5,
        steel: 5E5,
        titanium: 1E4
    },
    mult: {
        iron: 1.3,
        steel: 1.35,
        titanium: 1.4
    },
    req: {
        ice: 2,
        demographics: 2
    },
    environment: allEnvExt,
    type2: "prod"
}, {
    name: "dehibernation",
    displayName: "Dehibernation Chamber",
    energy: -50,
    prod: {
        "loaded cryocell": -10,
        "empty cryocell": 10
    },
    population: 10,
    cost: {
        iron: 25E5,
        steel: 5E5,
        titanium: 1E4
    },
    mult: {
        iron: 1.3,
        steel: 1.35,
        titanium: 1.4
    },
    req: {
        ice: 2,
        demographics: 2
    },
    environment: allEnvExt,
    type2: "prod"
}, {
    name: "space_beta",
    displayName: "Space Gate Beta",
    cost: {
        osmium: 50 * mi,
        rhodium: 100 * mi
    },
    mult: {
        rhodium: 2,
        osmium: 2
    },
    req: {
        secret: 2
    },
    environment: allEnvExt,
    type2: "prod",
    description: "The Space Gate Beta will warp a fleet of your choice to Bharash in Perseus' Arm. The option to warp will appear once you have selected your fleet."
}, {
    name: "space_gamma",
    displayName: "Space Gate Gamma",
    cost: {
        osmium: 50 * mi,
        rhodium: 100 * mi
    },
    mult: {
        rhodium: 2,
        osmium: 2
    },
    notBuildable: !0,
    environment: allEnvExt,
    type2: "prod",
    description: "The Space Gate Gamma will warp a fleet of your choice to Xirandrus in the Void. The option to warp will appear once you have selected your fleet."
}, {
    name: "space_delta",
    displayName: "Space Gate Delta",
    cost: {
        osmium: 50 * mi,
        rhodium: 100 * mi
    },
    mult: {
        rhodium: 2,
        osmium: 2
    },
    notBuildable: !0,
    environment: allEnvExt,
    type2: "prod",
    description: "The Space Gate Delta will warp a fleet of your choice to Volor Ashtar in Andromeda's Heart. The option to warp will appear once you have selected your fleet."
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "placeholder",
    req: {
        nononono: 1
    },
    displayName: "placeholder",
    cost: {
        iron: 1E3,
        steel: 200,
        titanium: .01
    },
    mult: {
        iron: 2,
        steel: 3,
        titanium: 4
    },
    type2: "prod"
}, {
    name: "turret",
    displayName: " Turret",
    cost: {
        iron: mi,
        steel: 1E5,
        titanium: 5E4,
        plastic: 1E3
    },
    mult: {
        iron: 1,
        titanium: 1,
        steel: 1,
        plastic: 1
    },
    energy: 0,
    type: "mining",
    req: {
        nononono: 4
    }
}]
  , shipsDefinition = [{
    weapon: "unarmed",
    icon: "vitha",
    name: "Vitha Colonial Ship",
    req: 1,
    type: "Colonial Ship",
    novalue: 1,
    power: 0,
    armor: 1,
    speed: .8,
    slots: 10,
    storage: 800,
    cost: {
        iron: 5E4,
        steel: 8E4,
        titanium: 5E3
    },
    fuel: "fuel",
    weight: 2,
    hp: 1,
    civis: [0]
}, {
    weapon: "unarmed",
    icon: "zb03",
    name: "ZB-03 Small Cargo",
    type: "Cargoship",
    novalue: 1,
    req: 1,
    power: 0,
    armor: 1,
    speed: .5,
    storage: 1E4,
    cost: {
        steel: 8E4,
        titanium: 5E3
    },
    fuel: "fuel",
    weight: 2200,
    combatWeight: 2,
    hp: 2,
    civis: [0]
}, {
    weapon: "unarmed",
    icon: "zb04",
    name: "ZB-04 Hauler",
    type: "Cargoship",
    novalue: 1,
    req: 2,
    power: 0,
    armor: 1,
    speed: .8,
    storage: 8E3,
    cost: {
        steel: 8E4,
        titanium: 1E4
    },
    fuel: "fuel",
    weight: 2E3,
    combatWeight: 2,
    hp: 2,
    civis: [0]
}, {
    weapon: "laser",
    icon: "ark_22",
    name: "ARK-22",
    type: "Fighter",
    req: 3,
    power: 10,
    armor: 100,
    speed: 2.8,
    storage: 100,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 200
    },
    fuel: "uranium",
    weight: 100,
    hp: 70,
    civis: [0]
}, {
    weapon: "laser",
    icon: "ark_55",
    name: "ARK-55",
    type: "H.Fighter",
    req: 4,
    power: 6,
    armor: 800,
    speed: 2.3,
    storage: 500,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 200
    },
    fuel: "uranium",
    weight: 150,
    hp: 180,
    civis: [0, 21]
}, {
    weapon: "laser",
    icon: "foxar",
    name: "Foxar",
    type: "Frigate",
    req: 5,
    power: 120,
    armor: 2E3,
    speed: 1.8,
    storage: 5E3,
    cost: {
        titanium: 1E5,
        plastic: 5E3,
        circuit: 500
    },
    fuel: "uranium",
    weight: 550,
    hp: 850,
    civis: [0]
}, {
    weapon: "laser",
    icon: "sky_dragon",
    name: "Sky Dragon",
    type: "Assault Frigate",
    req: 6,
    power: 80,
    armor: 5E3,
    speed: 1.3,
    storage: 1E4,
    cost: {
        titanium: 8E4,
        plastic: 8E3,
        circuit: 500
    },
    fuel: "uranium",
    weight: 800,
    hp: 2200,
    civis: [0, 21]
}, {
    weapon: "unarmed",
    icon: "zb22",
    name: "ZB-22 Transporter",
    type: "Cargoship",
    novalue: 1,
    req: 7,
    power: 0,
    armor: 5,
    speed: 1.2,
    storage: 2E5,
    cost: {
        titanium: 1E5,
        plastic: 2E4,
        circuit: 500
    },
    fuel: "uranium",
    weight: 2500,
    combatWeight: 2,
    hp: 10,
    civis: [0]
}, {
    weapon: "ballistic",
    icon: "babayaga",
    name: "Babayaga",
    type: "Destroyer",
    req: 8,
    power: 600,
    armor: 8E3,
    speed: 1,
    storage: 1E5,
    cost: {
        plastic: 25E3,
        circuit: 2E3,
        ammunition: 550
    },
    fuel: "hydrogen",
    weight: 1500,
    hp: 5E3,
    civis: [0, 21]
}, {
    weapon: "unarmed",
    icon: "zb50",
    name: "ZB-50 Big Cargo",
    type: "Cargoship",
    novalue: 1,
    req: 9,
    power: 0,
    armor: 10,
    speed: .8,
    storage: 5 * mi,
    fuel: "hydrogen",
    weight: 3500,
    combatWeight: 35,
    hp: 20,
    cost: {
        plastic: 35E3,
        circuit: 1500
    },
    civis: [0]
}, {
    weapon: "thermal",
    icon: "luxis",
    name: "Luxis",
    type: "Incursor",
    req: 10,
    power: 500,
    piercing: 25,
    armor: 1E3,
    speed: 5.2,
    storage: 100,
    fuel: "hydrogen",
    weight: 220,
    hp: 5E3,
    cost: {
        circuit: 12E3,
        ammunition: 7E3,
        nanotubes: 3E3
    },
    civis: [0, 21]
}, {
    weapon: "ballistic",
    icon: "muralla",
    name: "Muralla",
    type: "Shield Ship",
    req: 10,
    shield: 8E4,
    power: 11,
    armor: 5E4,
    speed: .15,
    storage: 0,
    fuel: "hydrogen",
    weight: 22E3,
    hp: 6E4,
    cost: {
        circuit: 5E3,
        ammunition: 1E4,
        nanotubes: 12E3
    },
    civis: [0, 21]
}, {
    weapon: "ballistic",
    icon: "siber",
    name: "Siber",
    type: "Battlecruiser",
    req: 11,
    shield: 3E4,
    piercing: 8,
    power: 1E4,
    armor: 25E3,
    speed: .7,
    storage: 1 * mi,
    fuel: "hydrogen",
    weight: 4E3,
    hp: 15E3,
    cost: {
        ammunition: 7E4,
        nanotubes: 15E3,
        robots: 150
    },
    civis: [0, 21]
}, {
    weapon: "ballistic",
    name: "Mankind Gem",
    type: "Bomber",
    req: 12,
    shield: 1E5,
    power: 4200,
    armor: 1E5,
    speed: .3,
    storage: 2 * mi,
    fuel: "hydrogen",
    weight: 15E3,
    hp: 11E4,
    cost: {
        ammunition: 1E5,
        nanotubes: 25E3,
        robots: 250
    }
}, {
    weapon: "ballistic",
    icon: "alkantara",
    name: "Alkantara",
    type: "Admiral",
    req: 13,
    shield: 5E4,
    power: 21E3,
    armor: 3E5,
    speed: .15,
    storage: 2 * mi,
    fuel: "hydrogen",
    weight: 55E3,
    hp: 6E5,
    cost: {
        ammunition: 25E4,
        nanotubes: 5E4,
        robots: 1800
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='gold_text'>Fleet's total power will increase by</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>10%*log2(1+alkantara_number)</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>It means, each time you double the</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>number of alkantara in the fleet</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>you get another +10% bonus</span><span></span>"
    },
    civis: [0, 21]
}, {
    weapon: "ballistic",
    name: "Glass Burson",
    type: "Battleship",
    power: 2800,
    armor: 12E3,
    speed: .5,
    storage: 1.2 * mi,
    fuel: "hydrogen",
    weight: 15300,
    hp: 1E4,
    civis: [1]
}, {
    weapon: "ballistic",
    name: "The Key",
    type: "Admiral",
    power: 4E3,
    armor: 18E3,
    speed: .3,
    storage: 5 * mi,
    fuel: "hydrogen",
    weight: 13E3,
    hp: 103E3,
    civis: [1]
}, {
    weapon: "ballistic",
    name: "Black Star",
    type: "Orbital Defence",
    power: 57E6,
    armor: 8E5,
    speed: .1,
    storage: 30 * mi,
    fuel: "hydrogen",
    weight: 8E5,
    hp: 5E8,
    civis: [7]
}, {
    weapon: "ballistic",
    name: "Marduk",
    type: "Orbital Defence",
    power: 100 * mi,
    armor: 500 * mi,
    speed: .1,
    storage: 80,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 28E6,
    hp: 2E6 * mi,
    civis: [8]
}, {
    weapon: "laser",
    name: "ARK-55b",
    type: "Fighter",
    req: 4,
    power: 6,
    armor: 500,
    speed: 1.4,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 150,
    hp: 50,
    civis: [1, 7]
}, {
    weapon: "laser",
    name: "ARK-PRP",
    type: "H.Fighter",
    req: 4,
    power: 26,
    armor: 1500,
    speed: 1.4,
    storage: 100,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 180,
    hp: 200,
    civis: [1, 7]
}, {
    weapon: "laser",
    name: "No Name Ship",
    type: "Frigate",
    req: 4,
    power: 180,
    armor: 2900,
    speed: 1.5,
    storage: 5E3,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 500,
    hp: 200,
    civis: [7]
}, {
    weapon: "laser",
    name: "Angel Eyes",
    type: "Frigate",
    req: 4,
    power: 260,
    armor: 5E3,
    speed: 1.5,
    storage: 5E3,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 500,
    hp: 200,
    civis: [7]
}, {
    weapon: "laser",
    name: "Tuco Ramirez",
    type: "H.Fighter",
    req: 4,
    power: 150,
    armor: 1500,
    speed: 1.8,
    storage: 5E3,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 350,
    hp: 200,
    civis: [7]
}, {
    weapon: "ballistic",
    name: "Aurora",
    type: "Capital Ship",
    req: 4,
    power: 15E4,
    armor: 25E3,
    speed: .1,
    storage: 5E7,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 8200,
    hp: 8E5,
    civis: [8]
}, {
    weapon: "ballistic",
    name: "Mastodon",
    type: "Capital Ship",
    req: 4,
    power: 22E5,
    armor: 5E5,
    speed: .2,
    storage: 5E7,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 16E4,
    hp: 5E6,
    civis: [2]
}, {
    weapon: "ballistic",
    name: "Die Schoene",
    type: "Admiral",
    req: 4,
    power: 3E5,
    armor: 12E4,
    speed: .4,
    storage: 5E7,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "hydrogen",
    weight: 55E3,
    hp: 12E5,
    civis: [9]
}, {
    weapon: "ballistic",
    name: "Alptraum",
    type: "Battlecruiser",
    req: 11,
    power: 6600,
    armor: 600,
    speed: .9,
    storage: 1.5 * mi,
    fuel: "hydrogen",
    weight: 5600,
    hp: 9E3,
    cost: {
        ammunition: 1E5,
        nanotubes: 1E5,
        robots: 1E3
    },
    civis: [9]
}, {
    weapon: "laser",
    name: "Engel",
    type: "Destroyer",
    req: 8,
    power: 600,
    armor: 150,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 1800,
    hp: 3E3,
    civis: [9]
}, {
    weapon: "ballistic",
    icon: "natsumiko",
    name: "U.N.I.T Natsumiko",
    type: "Battleship",
    req: 8,
    power: 3E6,
    armor: 2E5,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 3800,
    hp: 2E6,
    civis: [6]
}, {
    weapon: "ballistic",
    icon: "harumiko",
    name: "U.N.I.T Harumiko",
    type: "Battleship",
    req: 8,
    power: 2E6,
    armor: 5E5,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 3800,
    hp: 5E6,
    civis: [6]
}, {
    weapon: "ballistic",
    icon: "akimiko",
    name: "U.N.I.T Akimiko",
    type: "Battleship",
    req: 8,
    power: 2E6,
    armor: 5E5,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 3800,
    hp: 5E6,
    civis: [6]
}, {
    weapon: "ballistic",
    icon: "fuyumiko",
    name: "U.N.I.T Fuyumiko",
    type: "Battleship",
    req: 8,
    power: 1E6,
    armor: 8E5,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 3800,
    hp: 8E6,
    civis: [6]
}, {
    weapon: "technetium",
    name: "Auxilia",
    type: "Assault ship",
    req: 14,
    power: 5800,
    armor: 3200,
    speed: 2.7,
    storage: 100,
    cost: {
        technetium: 300,
        "t-ammunition": 10
    },
    fuel: "hydrogen",
    weight: 1340,
    hp: 380,
    resReq: {
        artofwar: 3
    },
    civis: [5]
}, {
    weapon: "technetium",
    name: "Augustus",
    type: "Battlecruiser",
    req: 8,
    power: 15 * mi,
    armor: 1.2 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 6E3,
    hp: 100 * mi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Leonidas",
    type: "Battlecruiser",
    req: 8,
    power: 70 * mi,
    armor: 4 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 8E3,
    hp: 200 * mi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Alexander",
    type: "Battlecruiser",
    req: 8,
    power: 180 * mi,
    armor: 15 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 12E3,
    hp: 800 * mi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Cerberus",
    type: "Battleship",
    req: 8,
    power: 200 * mi,
    armor: 20 * mi,
    speed: .4,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 18E3,
    hp: 400 * mi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Charon",
    type: "Battleship",
    req: 8,
    power: 300 * mi,
    armor: 10 * mi,
    speed: .4,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 22800,
    hp: 400 * mi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Lucifer",
    type: "Admiral",
    req: 8,
    power: 1.3 * bi,
    armor: 50 * mi,
    speed: .2,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 3E4,
    hp: 5 * bi,
    civis: [5]
}, {
    weapon: "technetium",
    name: "Dead Soul",
    type: "Destroyer",
    req: 8,
    power: 10 * mi,
    armor: 8E4,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 1800,
    hp: 35 * mi,
    civis: [5]
}, {
    weapon: "antimatter",
    name: "Halean Spear",
    type: "Incursor",
    power: 1E4,
    armor: 2E3,
    speed: 4.8,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 2E4,
    weight: 800,
    civis: [4]
}, {
    weapon: "antimatter",
    name: "Halean Counselor Ship",
    type: "Diplomatic Vessel",
    power: 9E4,
    armor: 8E3,
    speed: 1.2,
    storage: 2E5,
    fuel: "rhodium",
    hp: 12E4,
    weight: 580,
    civis: [4]
}, {
    weapon: "antimatter",
    name: "Juini's Daughter",
    type: "Destroyer",
    power: 15 * mi,
    armor: 2 * mi,
    speed: 1.2,
    storage: 24 * mi,
    fuel: "rhodium",
    hp: 872E4,
    weight: 1800,
    civis: [4, 11, 14]
}, {
    weapon: "antimatter",
    name: "Azure Huang",
    type: "Battleship",
    power: 221 * mi,
    armor: 5 * mi,
    speed: .5,
    storage: 24 * mi,
    fuel: "rhodium",
    hp: 872E4,
    weight: 5E3,
    civis: [4, 11, 14]
}, {
    weapon: "antimatter",
    name: "Dream of Juini",
    type: "Capital Ship",
    power: 50 * mi,
    armor: 1 * mi,
    speed: .2,
    storage: 100 * bi,
    fuel: "rhodium",
    hp: bi,
    weight: mi,
    civis: [4, 11, 14]
}, {
    weapon: "antimatter",
    name: "Siren",
    type: "Frigate",
    req: 8,
    power: 1E6,
    armor: 27E3,
    speed: 1.7,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 1E3,
    hp: 8E6,
    civis: [4, 11, 14]
}, {
    weapon: "thermal",
    name: "Servant of the Swarm",
    type: "Servant Ship",
    power: 3E4,
    armor: 1E4,
    speed: 5.8,
    storage: 1E3,
    fuel: "rhodium",
    hp: 2E4,
    weight: 100,
    civis: [3]
}, {
    weapon: "thermal",
    name: "Enslaved Human Ship",
    type: "Servant Ship",
    power: 2 * mi,
    armor: 5E5,
    speed: 1.8,
    storage: 1E4,
    fuel: "rhodium",
    hp: 2 * mi,
    weight: 1E4,
    civis: [3]
}, {
    weapon: "thermal",
    name: "Enslaved Quris Ship",
    type: "Servant Ship",
    power: 3 * mi,
    armor: 2.5 * mi,
    speed: 2.8,
    storage: 1E4,
    fuel: "rhodium",
    hp: 5 * mi,
    weight: 1E3,
    civis: [3]
}, {
    weapon: "thermal",
    name: "Enslaved Halean Ship",
    type: "Servant Ship",
    power: 5 * mi,
    armor: mi,
    speed: 3.8,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 3 * mi,
    weight: 2500,
    civis: [3]
}, {
    weapon: "thermal",
    name: "Heart of the Swarm",
    type: "Mother Ship",
    power: 2 * bi,
    armor: 200 * mi,
    speed: .8,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 1.6 * bi,
    weight: 1E5,
    civis: [3]
}, {
    weapon: "thermal",
    name: "Aurea Spina",
    type: "Mother Ship",
    power: 20 * bi,
    armor: 10 * bi,
    speed: .1,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 15 * bi,
    weight: mi,
    civis: [3]
}, {
    weapon: "thermal",
    icon: "auxilia",
    name: "Auxilia Beta",
    type: "Assault ship",
    req: 14,
    power: 5800,
    armor: 3200,
    speed: 1.7,
    storage: 100,
    cost: {
        technetium: 300,
        "t-ammunition": 10
    },
    fuel: "hydrogen",
    weight: 1340,
    hp: 380,
    resReq: {
        artofwar: 3
    },
    civis: [0]
}, {
    weapon: "thermal",
    icon: "servant",
    name: "Re-engineered Servant",
    req: 15,
    type: "Servant Ship",
    power: 3E4,
    armor: 1E4,
    speed: 2.8,
    storage: 10,
    cost: {
        silicon: 5E4,
        rhodium: 1500,
        "mK Embryo": 10
    },
    fuel: "rhodium",
    resReq: {
        osmium: 1
    },
    hp: 2E4,
    weight: 130,
    civis: [0]
}, {
    weapon: "antimatter",
    name: "Cherub",
    type: "Destroyer",
    shield: 3E3,
    power: 12E4,
    armor: 1E4,
    speed: 1.8,
    storage: 1 * mi,
    fuel: "rhodium",
    hp: 1.8 * mi,
    weight: 3980,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Seraph",
    type: "Battlecruiser",
    shield: 5E3,
    power: 6 * mi,
    armor: 5E4,
    speed: .7,
    storage: 1 * mi,
    fuel: "rhodium",
    hp: 20 * mi,
    weight: 11E3,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Jericho",
    type: "Orbital Defence",
    shield: 1E4,
    power: 2E3 * bi,
    armor: 50 * bi,
    speed: .1,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 200 * bi,
    weight: bi,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Sodom",
    type: "Orbital Defence",
    shield: 1E4,
    power: 1E3 * bi,
    armor: 20 * bi,
    speed: .1,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 130 * bi,
    weight: bi,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Gomorrah",
    type: "Orbital Defence",
    shield: 1E4,
    power: 1E3 * bi,
    armor: 20 * bi,
    speed: .1,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 130 * bi,
    weight: bi,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Zion",
    type: "Orbital Defence",
    shield: 1E4,
    power: 500 * bi,
    armor: 10 * bi,
    speed: .1,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 50 * bi,
    weight: bi,
    civis: [10]
}, {
    weapon: "antimatter",
    name: "Aster",
    type: "Orbital Defence",
    shield: 1E4,
    power: 8E3 * bi,
    armor: bi,
    speed: 2.2,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 1E3 * bi,
    weight: 100 * mi,
    civis: [11, 14]
}, {
    weapon: "antimatter",
    name: "Azalea",
    type: "Orbital Defence",
    shield: 1E4,
    power: 21E3 * bi,
    armor: 2 * bi,
    speed: 3.3,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 1200 * bi,
    weight: 200 * mi,
    civis: [11, 14]
}, {
    weapon: "antimatter",
    name: "Dahlia",
    type: "Orbital Defence",
    shield: 1E4,
    power: 56E3 * bi,
    armor: 3 * bi,
    speed: 4.4,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 1500 * bi,
    weight: 300 * mi,
    civis: [11, 14]
}, {
    weapon: "antimatter",
    name: "Freesia",
    type: "Orbital Defence",
    shield: 1E4,
    power: 124E3 * bi,
    armor: 4 * bi,
    speed: 5.5,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 1700 * bi,
    weight: 500 * mi,
    civis: [11, 14]
}, {
    weapon: "ballistic",
    name: "Castilla",
    type: "Shield Ship",
    shield: 3E4,
    power: 80,
    armor: mi,
    speed: .05,
    storage: 10 * mi,
    fuel: "rhodium",
    hp: 5 * mi,
    weight: 1E4,
    civis: [1, 12, 15]
}, {
    weapon: "ballistic",
    name: "Devil in Disguise",
    type: "Incursor",
    power: 124E3,
    armor: 5E4,
    speed: 4,
    storage: 1E3,
    fuel: "rhodium",
    hp: 25E3,
    weight: 500,
    civis: [12, 1]
}, {
    weapon: "ballistic",
    name: "Salantara",
    type: "Capital Ship",
    shield: 1E4,
    req: 14,
    power: 4E3 * bi,
    armor: bi,
    speed: 3.12,
    storage: 10 * mi,
    fuel: "hydrogen",
    weight: bi,
    hp: 2E3 * bi,
    cost: {
        "u-ammunition": 2E5,
        armor: 5E5,
        nanotubes: 3E5,
        robots: 15E3
    },
    civis: [12, 15, 1]
}, {
    weapon: "ballistic",
    name: "Bellerophon",
    type: "Imperial Ship",
    shield: 5E4,
    req: 14,
    power: 25E3 * bi,
    armor: 8 * bi,
    speed: 5.25,
    storage: 5 * mi,
    fuel: "hydrogen",
    weight: 1.5 * bi,
    hp: 4E3 * bi,
    cost: {
        ammunition: 5E5,
        nanotubes: 15E4,
        robots: 8E3
    },
    civis: [12, 15, 1]
}, {
    weapon: "antimatter",
    name: "Wings of Pegasus",
    type: "Imperial Ship",
    shield: 1E5,
    req: 15,
    power: 1E5 * bi,
    armor: 25 * bi,
    speed: 7.25,
    storage: 8 * mi,
    fuel: "hydrogen",
    weight: 5 * bi,
    hp: 15E3 * bi,
    cost: {
        ammunition: 15E5,
        nanotubes: 5E5,
        robots: 3E4
    },
    civis: [12, 15]
}, {
    weapon: "laser",
    icon: "orion2",
    name: "Orion Cargo",
    type: "Cargoship",
    novalue: 1,
    req: 14,
    power: 33,
    armor: 20,
    speed: 1.5,
    storage: 250 * mi,
    fuel: "hydrogen",
    weight: 5 * mi,
    combatWeight: 2,
    hp: 150,
    cost: {
        robots: 200,
        nanotubes: 2E4
    },
    civis: [0]
}, {
    weapon: "laser",
    name: "Orion League Delivery Vessel",
    type: "Cargoship",
    novalue: 1,
    req: 14,
    power: 33 * mi,
    armor: 20 * mi,
    speed: .5,
    storage: 100 * mi,
    fuel: "hydrogen",
    weight: 5 * mi,
    combatWeight: 2,
    hp: mi,
    cost: {
        robots: 100,
        nanotubes: 1E4
    }
}, {
    weapon: "antimatter",
    icon: "anger",
    name: "Anger of Perseus",
    type: "Capital Ship",
    resReq: {
        quantum: 3
    },
    req: 16,
    shield: mi,
    power: 300 * mi,
    armor: 50 * mi,
    speed: .035,
    storage: 100 * mi,
    fuel: "hydrogen",
    weight: 5 * mi,
    hp: 5 * bi,
    cost: {
        iron: 200 * bi,
        steel: 2 * tri,
        titanium: 50 * bi,
        nanotubes: 500 * mi,
        ammunition: bi,
        "full battery": 350 * mi,
        "u-ammunition": 100 * mi,
        armor: 10 * mi,
        robots: mi,
        engine: 3E5,
        antimatter: 1E4
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='red_text'>The Anger of Perseus will enter a</span><span></span><br><span style='float:left;margin-left:16px;' class='red_text'>'berserk mode' when the player's OR</span><span></span><br><span style='float:left;margin-left:16px;' class='red_text'>the enemy fleet's HP drop below 15%.</span><span></span><br><span style='float:left;margin-left:16px;' class='red_text'>In this mode, your fleet will get +50%</span><span></span><br><span style='float:left;margin-left:16px;' class='red_text'>piercing power and will do 50% more</span><span></span><br><span style='float:left;margin-left:16px;' class='red_text'>damage for each Anger of Perseus</span><br>"
    },
    civis: [0, 21]
}, {
    weapon: "unarmed",
    icon: "miner",
    name: "Medusa Miner",
    type: "Miner Ship",
    novalue: 1,
    resReq: {
        space_mining: 1
    },
    req: 18,
    power: 0,
    armor: 1,
    speed: .5,
    storage: 0,
    fuel: "hydrogen",
    weight: 100 * mi,
    combatWeight: 2,
    hp: 10,
    cost: {
        iron: 300 * mi,
        steel: bi,
        titanium: 100 * mi,
        nanotubes: mi,
        "full battery": 25E4,
        robots: 1E5,
        engine: 500
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='gold_text'>Each Medusa Miner placed in orbit</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>will boost extraction buildings by</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>20%*number_miners/log(2+number_miners)</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>It means, 1 miner will give you 12%</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>two miners 20% (like before), three miners 25.8%,</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>ten miners 55.8%, 100 miners 300%, and so on</span><span></span>"
    },
    civis: [0]
}, {
    weapon: "ballistic",
    name: "Nux",
    type: "Assault Frigate",
    power: 2E5,
    armor: 1E5,
    speed: 2,
    storage: 0,
    fuel: "hydrogen",
    weight: 3800,
    hp: mi,
    cost: {},
    civis: [13]
}, {
    weapon: "ballistic",
    name: "Max",
    type: "Destroyer",
    power: mi,
    armor: 15E4,
    speed: 1.5,
    storage: 0,
    fuel: "hydrogen",
    weight: 8E3,
    hp: 5E5,
    cost: {},
    civis: [13]
}, {
    weapon: "ballistic",
    name: "Furiosa",
    type: "Incursor",
    power: mi,
    armor: 1E4,
    piercing: 5,
    speed: 5.5,
    storage: 0,
    fuel: "hydrogen",
    weight: 500,
    hp: 8E3,
    cost: {},
    civis: [13]
}, {
    weapon: "thermal",
    name: "Angharad",
    type: "Battlecruiser",
    power: tri,
    armor: bi,
    speed: 1.5,
    storage: 0,
    fuel: "hydrogen",
    weight: bi,
    hp: 100 * bi,
    cost: {},
    civis: [13]
}, {
    weapon: "thermal",
    name: "The Ace",
    type: "Capital Ship",
    power: 2800 * tri,
    armor: tri,
    speed: 3.5,
    storage: 0,
    fuel: "hydrogen",
    weight: tri,
    hp: 6200 * bi,
    cost: {},
    civis: [13]
}, {
    weapon: "antimatter",
    name: "Sean",
    type: "Capital Ship",
    power: 1E4 * tri,
    armor: tri,
    speed: 15.5,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 5E4 * tri,
    cost: {},
    civis: [14]
}, {
    weapon: "antimatter",
    name: "Dion",
    type: "Capital Ship",
    power: 5E4 * tri,
    armor: 100 * tri,
    speed: 5.5,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 8E4 * tri,
    cost: {},
    civis: [14]
}, {
    weapon: "antimatter",
    name: "Gradh",
    type: "Capital Ship",
    power: 3E4 * tri,
    armor: tri,
    speed: 8.5,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 15E4 * tri,
    cost: {},
    civis: [14]
}, {
    weapon: "ballistic",
    name: "Alecto",
    type: "Imperial Ship",
    power: 100 * tri,
    armor: tri,
    speed: 6,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 1500 * tri,
    cost: {},
    civis: [15]
}, {
    weapon: "ballistic",
    name: "Maegera",
    type: "Imperial Ship",
    power: 500 * tri,
    armor: tri,
    speed: 6,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 3500 * tri,
    cost: {},
    civis: [15]
}, {
    weapon: "ballistic",
    name: "Tisiphon",
    type: "Imperial Ship",
    power: 8E3 * tri,
    armor: tri,
    speed: 6,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 55E3 * tri,
    cost: {},
    civis: [15]
}, {
    weapon: "laser",
    name: "Light's Mexager",
    type: "Destroyer",
    power: 1E3 * tri,
    armor: tri,
    speed: 51,
    storage: 0,
    fuel: "hydrogen",
    weight: tri,
    hp: 8E3 * tri,
    cost: {},
    civis: [16]
}, {
    weapon: "laser",
    name: "Light's Companion",
    type: "Destroyer",
    power: 12E3 * tri,
    armor: tri,
    speed: 34,
    storage: 0,
    fuel: "hydrogen",
    weight: tri,
    hp: 26E3 * tri,
    cost: {},
    civis: [16]
}, {
    weapon: "laser",
    name: "Vela",
    type: "Battlecruiser",
    power: 12E4 * tri,
    armor: 1E3 * tri,
    speed: 12,
    storage: 0,
    fuel: "hydrogen",
    weight: 5 * tri,
    hp: 7E5 * tri,
    cost: {},
    civis: [16]
}, {
    weapon: "laser",
    name: "Yola",
    type: "Battleship",
    power: 54E5 * tri,
    armor: 1E6 * tri,
    speed: 8,
    storage: 0,
    fuel: "hydrogen",
    weight: 50 * tri,
    hp: 11E6 * tri,
    cost: {},
    civis: [16]
}, {
    weapon: "ballistic",
    name: "Ambjenze",
    type: "Frigate",
    req: 4,
    power: 5E3,
    armor: 3E3,
    speed: 1.5,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 1600,
    hp: 5E3,
    civis: [2]
}, {
    weapon: "ballistic",
    name: "Zannsarig",
    type: "Destroyer",
    req: 4,
    power: 18E3,
    armor: 9E3,
    speed: .4,
    storage: 500,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 5E3,
    hp: 22E3,
    civis: [2]
}, {
    weapon: "laser",
    name: "U.N.I.T Zero",
    type: "Servant Ship",
    req: 4,
    power: 1800,
    armor: 200,
    speed: 3.5,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 300,
    hp: 500,
    civis: [6]
}, {
    weapon: "laser",
    name: "U.N.I.T Reppu",
    type: "Servant Ship",
    req: 4,
    power: 4E3,
    armor: 800,
    speed: 1.8,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 700,
    hp: 2200,
    civis: [6]
}, {
    weapon: "ballistic",
    name: "Glissard",
    type: "Destroyer",
    req: 4,
    power: 18E3,
    armor: 5800,
    speed: 1.2,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 7E3,
    hp: 6E3,
    civis: [8]
}, {
    weapon: "ballistic",
    name: "Nabonidus",
    type: "Destroyer",
    req: 4,
    power: 12E3,
    armor: 9200,
    speed: .8,
    storage: 50,
    cost: {
        steel: 2E5,
        titanium: 1E4,
        plastic: 500
    },
    fuel: "uranium",
    weight: 8E3,
    hp: 1E4,
    civis: [8]
}, {
    weapon: "unarmed",
    icon: "heaven",
    name: "The Heaven's Door",
    req: 12,
    type: "Colonial Ship",
    novalue: 1,
    power: 0,
    armor: 1,
    speed: 2,
    storage: 2 * mi,
    cost: {
        nanotubes: 25E3,
        robots: 250
    },
    fuel: "fuel",
    weight: 2,
    hp: 1
}, {
    weapon: "antimatter",
    icon: "koroleva",
    name: "Koroleva",
    type: "Destroyer",
    req: 99,
    shield: 5E4,
    power: 50 * mi,
    armor: 5 * mi,
    speed: .1,
    storage: 10 * mi,
    fuel: "hydrogen",
    weight: 5 * mi,
    hp: 300 * mi,
    cost: {
        steel: 10 * bi,
        nanotubes: 100 * mi,
        "full battery": 100 * mi,
        "t-ammunition": 5 * mi,
        armor: 10 * mi,
        robots: mi,
        engine: 1E5,
        antimatter: 5E3
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='gold_text'>Fleet's total power will increase by</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>10%*log2(1+alkantara_number)</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>It means, each time you double the</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>number of alkantara in the fleet</span><span></span><br><span style='float:left;margin-left:16px;' class='gold_text'>you get another +10% bonus</span><span></span>"
    },
    civis: [0]
}, {
    weapon: "technetium",
    name: "Augustus",
    type: "Battlecruiser",
    req: 800,
    power: 15 * mi,
    armor: 1.2 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 6E3,
    hp: 100 * mi,
    civis: [0]
}, {
    weapon: "technetium",
    name: "Leonidas",
    type: "Battlecruiser",
    req: 800,
    power: 70 * mi,
    armor: 4 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 8E3,
    hp: 200 * mi,
    civis: [0]
}, {
    weapon: "technetium",
    name: "Alexander",
    type: "Battlecruiser",
    req: 800,
    power: 180 * mi,
    armor: 15 * mi,
    speed: .7,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 12E3,
    hp: 800 * mi,
    civis: [0]
}, {
    weapon: "technetium",
    name: "Cerberus",
    type: "Battleship",
    req: 800,
    power: 200 * mi,
    armor: 20 * mi,
    speed: .4,
    storage: 100,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 18E3,
    hp: 400 * mi,
    civis: [0]
}, {
    weapon: "technetium",
    name: "Charon",
    type: "Battleship",
    req: 800,
    power: 300 * mi,
    armor: 10 * mi,
    speed: .4,
    storage: 1E5,
    cost: {
        plastic: 2E5,
        circuit: 2E4,
        ammunition: 500
    },
    fuel: "hydrogen",
    weight: 22800,
    hp: 400 * mi,
    civis: [0]
}, {
    weapon: "laser",
    icon: "orion",
    name: "Andromeda Cargo",
    type: "Cargoship",
    novalue: 1,
    req: 17,
    power: 50,
    armor: 50,
    speed: 2,
    storage: 30 * bi,
    fuel: "hydrogen",
    weight: 50 * mi,
    combatWeight: 2,
    resReq: {
        space_mining: 1
    },
    hp: 1E3,
    cost: {
        robots: 2E4,
        nanotubes: 2 * mi,
        engine: 1E3
    },
    civis: [0]
}, {
    weapon: "antimatter",
    icon: "munja",
    name: "Munya",
    type: "Destroyer",
    req: 19,
    resReq: {
        protohalean_science: 1
    },
    power: 1E6,
    armor: 2E5,
    speed: 15.5,
    storage: 1E3,
    fuel: "hydrogen",
    piercing: 25,
    hp: 2E6,
    weight: 12E5,
    cost: {
        ammunition: 1E5,
        "t-ammunition": 1E5,
        nanotubes: 88E4,
        robots: 25E3,
        engine: 15E3,
        qasers: 20
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='blue_text'>Fleet's shield piercing will increase</span><span></span><br><span style='float:left;margin-left:16px;' class='blue_text'>by (1-log(10)/log(munya num/1000+10))*100%</span><span></span><br><span style='float:left;margin-left:16px;' class='blue_text'>It means you get 23% of shield piercing</span><span></span><br><span style='float:left;margin-left:16px;' class='blue_text'>with 10K munyas, 51% with 100K,</span><span></span><br><span style='float:left;margin-left:16px;' class='blue_text'>66% with 1M, 75% with 10M and so on</span><span></span>"
    },
    civis: [0]
}, {
    weapon: "ballistic",
    name: "White Star",
    type: "Orbital Defence",
    power: 100 * mi,
    armor: 11E5,
    speed: .1,
    storage: 10 * mi,
    fuel: "hydrogen",
    weight: 3 * mi,
    hp: 150 * mi
}, {
    weapon: "laser",
    name: "Thunder",
    type: "Frigate",
    power: tri,
    armor: mi,
    speed: 32,
    piercing: 11,
    storage: 0,
    fuel: "hydrogen",
    weight: bi,
    hp: 8 * tri,
    cost: {},
    civis: [16]
}, {
    weapon: "darkmatter",
    name: "The Dark Lord's Nest",
    type: "Orbital Defence",
    power: mi * tri * tri,
    armor: tri * mi,
    speed: 105,
    piercing: 66,
    storage: 0,
    fuel: "darkmatter",
    weight: 100 * tri,
    hp: tri * tri * tri,
    cost: {},
    shield: 1800 * tri,
    civis: [17]
}, {
    weapon: "darkmatter",
    name: "Munch",
    type: "Admiral",
    power: tri * tri,
    armor: 1E3 * tri,
    speed: 99,
    piercing: 55,
    storage: 0,
    fuel: "darkmatter",
    weight: tri,
    hp: 33 * tri * tri,
    cost: {},
    shield: 500 * tri,
    civis: [17]
}, {
    weapon: "darkmatter",
    name: "Goya",
    type: "Battlecruiser",
    power: bi * tri,
    armor: tri,
    speed: 77,
    piercing: 44,
    storage: 0,
    fuel: "darkmatter",
    weight: 350 * bi,
    hp: 15 * bi * tri,
    cost: {},
    shield: 10 * tri,
    civis: [17]
}, {
    weapon: "darkmatter",
    name: "Gogh Van",
    type: "Destroyer",
    power: mi * tri,
    armor: bi,
    speed: 55,
    piercing: 33,
    storage: 0,
    fuel: "darkmatter",
    weight: 180 * bi,
    hp: 8 * mi * tri,
    cost: {},
    shield: 500 * mi,
    civis: [17]
}, {
    weapon: "darkmatter",
    name: "Matisse",
    type: "Frigate",
    power: 1E3 * tri,
    armor: mi,
    speed: 33,
    piercing: 22,
    storage: 0,
    fuel: "darkmatter",
    weight: 50 * bi,
    hp: 5E3 * tri,
    cost: {},
    shield: 80 * mi,
    civis: [17]
}, {
    weapon: "darkmatter",
    name: "King Noir",
    type: "Frigate",
    power: 10 * tri,
    armor: mi,
    speed: 66,
    piercing: 77,
    storage: 0,
    fuel: "darkmatter",
    weight: bi,
    hp: 5 * tri,
    cost: {},
    shield: 10 * mi,
    civis: [17]
}, {
    weapon: "laser",
    name: "Yola",
    type: "Battleship",
    power: 54E5 * tri,
    armor: 1E6 * tri,
    speed: 8,
    storage: 0,
    fuel: "hydrogen",
    weight: 50 * tri,
    hp: 11E6 * tri,
    cost: {}
}, {
    weapon: "antimatter",
    icon: "soul",
    name: "Soul of Andromeda",
    type: "Orbital Defence",
    resReq: {
        darkmatter_science: 1
    },
    req: 20,
    shield: 5 * mi,
    power: 50 * bi,
    armor: 500 * mi,
    speed: .02,
    storage: bi,
    fuel: "hydrogen",
    weight: 5 * bi,
    hp: 500 * bi,
    cost: {
        iron: 5E3 * bi,
        steel: 50 * tri,
        titanium: 500 * bi,
        nanotubes: 30 * bi,
        ammunition: 100 * bi,
        "full battery": bi,
        "u-ammunition": 10 * bi,
        "t-ammunition": 100 * mi,
        armor: bi,
        robots: bi,
        engine: 30 * mi,
        antimatter: 10 * mi,
        meissnerium: mi,
        "dark matter": 1E3
    },
    special: {
        desc: "<span style='float:left;margin-left:16px;' class='pink_text'>Each Soul of Andromeda will produce</span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>gamma rays bursts when the fleet's</span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>power will be halved in respect of</span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>the previous round. Each gamma ray</span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>burst will do a raw damage of     </span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>500M*darkmatter loaded ino the fleet</span><span></span><br><span style='float:left;margin-left:16px;' class='pink_text'>storage up to 1 million each round</span><br>"
    },
    civis: [0]
}, {
    weapon: "thermal",
    name: "Argentum Spina",
    type: "Mother Ship",
    power: 5E7 * tri,
    armor: 1E7 * tri,
    speed: 14,
    storage: 0,
    fuel: "hydrogen",
    weight: 100 * tri,
    shield: 250 * mi,
    hp: 1E8 * tri,
    cost: {},
    civis: [18]
}, {
    weapon: "thermal",
    name: "Silver Carapax",
    type: "Shield ship",
    power: 1E5 * tri,
    armor: tri * tri,
    speed: 2,
    storage: 0,
    fuel: "hydrogen",
    weight: 10 * tri,
    hp: 5E6 * tri,
    shield: 110 * mi,
    cost: {},
    civis: [18]
}, {
    weapon: "thermal",
    name: "Silver Carrier",
    type: "Servant ship",
    power: 21E5 * tri,
    armor: 80 * tri,
    speed: 9,
    storage: 0,
    fuel: "hydrogen",
    weight: tri,
    hp: 3E5 * tri,
    shield: 10 * mi,
    cost: {},
    civis: [18]
}, {
    weapon: "thermal",
    name: "Silver Servant",
    type: "Servant ship",
    power: 3E5 * tri,
    armor: tri,
    speed: 28,
    storage: 0,
    fuel: "hydrogen",
    weight: tri,
    hp: 5E4 * tri,
    shield: 1 * mi,
    cost: {},
    civis: [18]
}, {
    weapon: "darkmatter",
    name: "The Life's Spark",
    type: "Orbital Defence",
    power: 8 * mi * tri * tri,
    armor: tri * mi,
    speed: 133,
    piercing: 99,
    storage: 0,
    fuel: "darkmatter",
    weight: 100 * tri,
    hp: 180 * bi * tri * tri,
    cost: {},
    shield: 1800 * tri,
    civis: [19]
}, {
    weapon: "darkmatter",
    name: "Salvador",
    type: "Admiral",
    power: 12 * tri * tri,
    armor: 1E3 * tri,
    speed: 119,
    piercing: 88,
    storage: 0,
    fuel: "darkmatter",
    weight: tri,
    hp: 16 * tri * tri,
    cost: {},
    shield: 500 * tri,
    civis: [19]
}, {
    weapon: "darkmatter",
    name: "Ernst",
    type: "Battlecruiser",
    power: 7 * bi * tri,
    armor: tri,
    speed: 97,
    piercing: 77,
    storage: 0,
    fuel: "darkmatter",
    weight: 350 * bi,
    hp: 9 * bi * tri,
    cost: {},
    shield: 10 * tri,
    civis: [19]
}, {
    weapon: "darkmatter",
    name: "Magrit",
    type: "Destroyer",
    power: 4 * mi * tri,
    armor: bi,
    speed: 75,
    piercing: 66,
    storage: 0,
    fuel: "darkmatter",
    weight: 180 * bi,
    hp: 4 * mi * tri,
    cost: {},
    shield: 500 * mi,
    civis: [19]
}, {
    weapon: "darkmatter",
    name: "Miro",
    type: "Frigate",
    power: 3E3 * tri,
    armor: mi,
    speed: 63,
    piercing: 55,
    storage: 0,
    fuel: "darkmatter",
    weight: 50 * bi,
    hp: 2E3 * tri,
    cost: {},
    shield: 80 * mi,
    civis: [19]
}, {
    weapon: "antimatter",
    name: "Union",
    type: "Imperial Ship",
    shield: 1E7,
    req: 15,
    power: 1E6 * bi,
    armor: 25 * bi,
    speed: 17.25,
    storage: 8 * mi,
    fuel: "hydrogen",
    weight: 5 * bi,
    hp: 5E5 * bi,
    cost: {
        ammunition: 15E5,
        nanotubes: 5E5,
        robots: 3E4
    },
    civis: [1]
}]
  , fleetsDefinition = [{
    civis: 1,
    name: "The Keeper",
    ships: [{
        ship: 3,
        value: 100
    }, {
        ship: 4,
        value: 50
    }, {
        ship: 5,
        value: 35
    }, {
        ship: 8,
        value: 10
    }, {
        ship: 15,
        value: 3
    }, {
        ship: 16,
        value: 1
    }],
    exp: 6,
    planet: "mexager"
}, {
    civis: 2,
    name: "Phantids Defence Fleet",
    ships: [{
        ship: 25,
        value: 1
    }],
    exp: 12,
    planet: "traumland"
}, {
    civis: 3,
    name: "Thlipsi Fleet",
    ships: [{
        ship: 47,
        value: 8E3
    }, {
        ship: 51,
        value: 1
    }],
    planet: "tsartasis"
}, {
    civis: 3,
    name: "Monaxia Fleet",
    ships: [{
        ship: 47,
        value: 8E4
    }, {
        ship: 51,
        value: 1
    }],
    exp: 80,
    planet: "mermorra"
}, {
    civis: 3,
    name: "Erimosi Fleet",
    ships: [{
        ship: 47,
        value: 8E4
    }, {
        ship: 48,
        value: 1E3
    }, {
        ship: 51,
        value: 1
    }],
    planet: "echoes"
}, {
    civis: 3,
    name: "Katastrofis Fleet",
    ships: [{
        ship: 47,
        value: 8E4
    }, {
        ship: 48,
        value: 2E3
    }, {
        ship: 51,
        value: 1
    }],
    planet: "kitrino"
}, {
    civis: 3,
    name: "Loimos Fleet",
    ships: [{
        ship: 47,
        value: 3E5
    }, {
        ship: 48,
        value: 2E3
    }, {
        ship: 51,
        value: 10
    }],
    planet: "kandi"
}, {
    civis: 3,
    name: "Polemos Fleet",
    ships: [{
        ship: 47,
        value: 8E5
    }, {
        ship: 48,
        value: 5E3
    }, {
        ship: 49,
        value: 1E3
    }, {
        ship: 51,
        value: 20
    }],
    exp: 80,
    planet: "ares"
}, {
    civis: 3,
    name: "Thanatos Fleet",
    ships: [{
        ship: 47,
        value: 3E6
    }, {
        ship: 48,
        value: 8E3
    }, {
        ship: 49,
        value: 5E3
    }, {
        ship: 50,
        value: 1E3
    }, {
        ship: 51,
        value: 25
    }],
    exp: 100,
    planet: "xora2"
}, {
    civis: 3,
    name: "Anastasi Fleet",
    ships: [{
        ship: 47,
        value: 1E7
    }, {
        ship: 48,
        value: 15E3
    }, {
        ship: 49,
        value: 8E3
    }, {
        ship: 50,
        value: 2E3
    }, {
        ship: 51,
        value: 50
    }, {
        ship: 52,
        value: 1
    }],
    exp: 150,
    planet: "xora"
}, {
    civis: 4,
    name: "Posirion Defence Fleet",
    ships: [{
        ship: 41,
        value: 750
    }, {
        ship: 46,
        value: 15
    }],
    planet: "posirion"
}, {
    civis: 4,
    name: "Traurig Defence Fleet",
    ships: [{
        ship: 41,
        value: 3E3
    }, {
        ship: 46,
        value: 60
    }],
    planet: "traurig"
}, {
    civis: 4,
    name: "Diplomatic Fleet",
    ships: [{
        ship: 41,
        value: 5E3
    }, {
        ship: 42,
        value: 400
    }, {
        ship: 46,
        value: 150
    }],
    planet: "epsilon"
}, {
    civis: 4,
    name: "Zhura Defence Fleet",
    ships: [{
        ship: 41,
        value: 1E4
    }, {
        ship: 42,
        value: 1E3
    }, {
        ship: 46,
        value: 250
    }, {
        ship: 43,
        value: 10
    }],
    planet: "zhura"
}, {
    civis: 4,
    name: "Juini Shadow",
    ships: [{
        ship: 41,
        value: 2E4
    }, {
        ship: 42,
        value: 2E3
    }, {
        ship: 46,
        value: 500
    }, {
        ship: 45,
        value: 10
    }],
    exp: 50,
    planet: "bhara"
}, {
    civis: 4,
    name: "Azure Fleet",
    ships: [{
        ship: 41,
        value: 5E4
    }, {
        ship: 42,
        value: 5E3
    }, {
        ship: 46,
        value: 2E3
    }, {
        ship: 44,
        value: 5
    }],
    exp: 80,
    planet: "caerul"
}, {
    civis: 5,
    name: "Purification Fleet",
    ships: [{
        ship: 33,
        value: 1E3
    }, {
        ship: 34,
        value: 1
    }],
    planet: "miselquris"
}, {
    civis: 5,
    name: "Konquista",
    ships: [{
        ship: 33,
        value: 3E3
    }, {
        ship: 35,
        value: 1
    }],
    planet: "kurol"
}, {
    civis: 5,
    name: "The Last Stand",
    ships: [{
        ship: 33,
        value: 5E3
    }, {
        ship: 36,
        value: 1
    }],
    planet: "antaris"
}, {
    civis: 5,
    name: "Styx Legion",
    ships: [{
        ship: 33,
        value: 1E4
    }, {
        ship: 37,
        value: 1
    }, {
        ship: 38,
        value: 1
    }],
    exp: 50,
    planet: "teleras"
}, {
    civis: 5,
    name: "Hell Warden",
    ships: [{
        ship: 33,
        value: 3E3
    }, {
        ship: 40,
        value: 100
    }, {
        ship: 39,
        value: 1
    }],
    exp: 50,
    planet: "jabir"
}, {
    civis: 6,
    name: "I.R.C. S.E.A.S. F.L.E.E.T.",
    ships: [{
        ship: 29,
        value: 1
    }, {
        ship: 30,
        value: 1
    }, {
        ship: 31,
        value: 1
    }, {
        ship: 32,
        value: 1
    }],
    exp: 22,
    planet: "zelera"
}, {
    civis: 7,
    name: "The Ugly",
    ships: [{
        ship: 20,
        value: 30
    }, {
        ship: 23,
        value: 1
    }],
    planet: "uanass"
}, {
    civis: 7,
    name: "The Bad",
    ships: [{
        ship: 19,
        value: 150
    }, {
        ship: 22,
        value: 1
    }],
    planet: "uanass"
}, {
    civis: 7,
    name: "The Good",
    ships: [{
        ship: 20,
        value: 50
    }, {
        ship: 21,
        value: 1
    }],
    planet: "uanass"
}, {
    civis: 7,
    name: "Silver Fleet",
    ships: [{
        ship: 17,
        value: 1
    }],
    planet: "nassaus"
}, {
    civis: 8,
    name: "O.L. Defence Fleet",
    ships: [{
        ship: 24,
        value: 1
    }],
    planet: "santorini"
}, {
    civis: 8,
    name: "Babilo Protector",
    ships: [{
        ship: 18,
        value: 1
    }],
    exp: 100,
    planet: "virgo"
}, {
    civis: 9,
    name: "Vernichtung",
    ships: [{
        ship: 26,
        value: 1
    }, {
        ship: 27,
        value: 35
    }, {
        ship: 28,
        value: 500
    }],
    exp: 18,
    planet: "lagea"
}, {
    civis: 10,
    name: "Abiha",
    ships: [{
        ship: 55,
        value: 1E7
    }, {
        ship: 60,
        value: 1
    }],
    planet: "conquest"
}, {
    civis: 10,
    name: "Deborha",
    ships: [{
        ship: 55,
        value: 35E6
    }, {
        ship: 58,
        value: 1
    }],
    planet: "kartarid"
}, {
    civis: 10,
    name: "Jerusha",
    ships: [{
        ship: 55,
        value: 5E7
    }, {
        ship: 56,
        value: 1E6
    }, {
        ship: 57,
        value: 1
    }],
    planet: "cerberus"
}, {
    civis: 10,
    name: "Juditha",
    ships: [{
        ship: 55,
        value: 5E7
    }, {
        ship: 56,
        value: 25E5
    }, {
        ship: 59,
        value: 1
    }],
    exp: 200,
    planet: "death"
}, {
    civis: 11,
    name: "Arjini Lisis Fleet",
    ships: [{
        ship: 46,
        value: 10 * mi
    }, {
        ship: 61,
        value: 1
    }],
    planet: "yanyin"
}, {
    civis: 11,
    name: "Aurin Firmis Fleet",
    ships: [{
        ship: 46,
        value: 30 * mi
    }, {
        ship: 43,
        value: mi
    }, {
        ship: 62,
        value: 1
    }],
    planet: "siris"
}, {
    civis: 11,
    name: "Rubian Passis Fleet",
    ships: [{
        ship: 46,
        value: 100 * mi
    }, {
        ship: 43,
        value: 3 * mi
    }, {
        ship: 44,
        value: mi
    }, {
        ship: 63,
        value: 1
    }],
    planet: "xilea"
}, {
    civis: 11,
    name: "Safir Voluptua Fleet",
    ships: [{
        ship: 46,
        value: 300 * mi
    }, {
        ship: 43,
        value: 10 * mi
    }, {
        ship: 44,
        value: 3 * mi
    }, {
        ship: 64,
        value: 1
    }],
    exp: 300,
    planet: "asun"
}, {
    civis: 12,
    name: "Esperanza Fleet",
    ships: [{
        ship: 65,
        value: 10 * mi
    }, {
        ship: 67,
        value: 10
    }],
    planet: "swamp"
}, {
    civis: 12,
    name: "Antilla Fleet",
    ships: [{
        ship: 65,
        value: 50 * mi
    }, {
        ship: 66,
        value: mi
    }, {
        ship: 68,
        value: 10
    }],
    planet: "columbus"
}, {
    civis: 12,
    name: "Molucca Fleet",
    ships: [{
        ship: 65,
        value: 100 * mi
    }, {
        ship: 66,
        value: 3 * mi
    }, {
        ship: 69,
        value: 5
    }],
    planet: "magellan"
}, {
    civis: 12,
    name: "Australis Fleet",
    ships: [{
        ship: 65,
        value: 120 * mi
    }, {
        ship: 66,
        value: 5 * mi
    }, {
        ship: 67,
        value: 25
    }, {
        ship: 69,
        value: 10
    }],
    planet: "gerlache"
}, {
    civis: 12,
    name: "Astris Fleet",
    ships: [{
        ship: 65,
        value: 150 * mi
    }, {
        ship: 66,
        value: 10 * mi
    }, {
        ship: 67,
        value: 50
    }, {
        ship: 68,
        value: 20
    }, {
        ship: 69,
        value: 15
    }],
    exp: 800,
    planet: "gagarin"
}, {
    civis: 13,
    name: "Canchrena Uxor",
    ships: [{
        ship: 74,
        value: mi
    }, {
        ship: 75,
        value: 35E4
    }],
    planet: "alfari"
}, {
    civis: 13,
    name: "Purulis Uxor",
    ships: [{
        ship: 74,
        value: mi
    }, {
        ship: 76,
        value: mi
    }],
    planet: "alfari"
}, {
    civis: 13,
    name: "Alfari Uxor",
    ships: [{
        ship: 75,
        value: mi
    }, {
        ship: 76,
        value: 25E4
    }],
    planet: "alfari"
}, {
    civis: 13,
    name: "Xenopraedo",
    ships: [{
        ship: 74,
        value: 3 * mi
    }, {
        ship: 75,
        value: mi
    }, {
        ship: 77,
        value: 1
    }],
    exp: 100,
    planet: "xeno"
}, {
    civis: 13,
    name: "Xenoterrent",
    ships: [{
        ship: 75,
        value: mi
    }, {
        ship: 76,
        value: mi
    }, {
        ship: 77,
        value: 2
    }],
    exp: 100,
    planet: "xeno"
}, {
    civis: 13,
    name: "Flucta Fleet",
    ships: [{
        ship: 74,
        value: bi
    }, {
        ship: 75,
        value: bi
    }, {
        ship: 76,
        value: bi
    }, {
        ship: 77,
        value: 1E3
    }, {
        ship: 78,
        value: 1
    }],
    exp: 1E3,
    planet: "caligo"
}, {
    civis: 14,
    name: "Mairi's Wisdom",
    ships: [{
        ship: 61,
        value: 3E3
    }, {
        ship: 62,
        value: 1E3
    }, {
        ship: 63,
        value: 300
    }, {
        ship: 64,
        value: 100
    }, {
        ship: 79,
        value: 1
    }],
    exp: 200,
    planet: "halea"
}, {
    civis: 14,
    name: "Suranis' Strength",
    ships: [{
        ship: 61,
        value: 3E3
    }, {
        ship: 62,
        value: 1E3
    }, {
        ship: 63,
        value: 300
    }, {
        ship: 64,
        value: 100
    }, {
        ship: 80,
        value: 1
    }],
    exp: 200,
    planet: "halea"
}, {
    civis: 14,
    name: "Juini's Pride",
    ships: [{
        ship: 61,
        value: 3E3
    }, {
        ship: 62,
        value: 1E3
    }, {
        ship: 63,
        value: 300
    }, {
        ship: 64,
        value: 100
    }, {
        ship: 81,
        value: 1
    }],
    exp: 200,
    planet: "halea"
}, {
    civis: 15,
    name: "Thymos Fleet",
    ships: [{
        ship: 65,
        value: 5E8
    }, {
        ship: 66,
        value: 5E9
    }, {
        ship: 82,
        value: 1
    }],
    planet: "persephone"
}, {
    civis: 15,
    name: "Zilia Fleet",
    ships: [{
        ship: 65,
        value: 2E9
    }, {
        ship: 66,
        value: 2E10
    }, {
        ship: 82,
        value: 1
    }, {
        ship: 83,
        value: 1
    }],
    planet: "hades"
}, {
    civis: 15,
    name: "Fonos Fleet",
    ships: [{
        ship: 65,
        value: 5E11
    }, {
        ship: 66,
        value: 5E12
    }, {
        ship: 82,
        value: 1
    }, {
        ship: 83,
        value: 1
    }, {
        ship: 84,
        value: 1
    }],
    planet: "demeter"
}, {
    civis: 16,
    name: "Formation Y331",
    ships: [{
        ship: 85,
        value: 1
    }],
    exp: 80,
    planet: "hermr"
}, {
    civis: 16,
    name: "Formation Y184",
    ships: [{
        ship: 85,
        value: 2
    }],
    exp: 120,
    planet: "auriga"
}, {
    civis: 16,
    name: "Formation Y67",
    ships: [{
        ship: 85,
        value: 5
    }, {
        ship: 86,
        value: 2
    }],
    exp: 200,
    planet: "calipsi"
}, {
    civis: 16,
    name: "Formation Y22",
    ships: [{
        ship: 85,
        value: 5
    }, {
        ship: 86,
        value: 2
    }, {
        ship: 87,
        value: 1
    }],
    exp: 500,
    planet: "forax"
}, {
    civis: 16,
    name: "Formation Y06",
    ships: [{
        ship: 85,
        value: 100
    }, {
        ship: 86,
        value: 20
    }, {
        ship: 87,
        value: 1
    }],
    exp: 800,
    planet: "cygnus"
}, {
    civis: 16,
    name: "Formation Y01",
    ships: [{
        ship: 85,
        value: 25
    }, {
        ship: 86,
        value: 10
    }, {
        ship: 87,
        value: 5
    }, {
        ship: 88,
        value: 1
    }],
    exp: 1200,
    planet: "volor"
}, {
    civis: 17,
    name: "Lord Aeshma's Fleet",
    ships: [{
        ship: 109,
        value: 1110
    }, {
        ship: 110,
        value: 16390
    }, {
        ship: 111,
        value: 248832
    }],
    planet: "madame"
}, {
    civis: 17,
    name: "Lord Daeva's Fleet",
    ships: [{
        ship: 108,
        value: 10956
    }, {
        ship: 109,
        value: 1093500
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 144
    }],
    planet: "aquarius"
}, {
    civis: 17,
    name: "Lord Charun's Fleet",
    ships: [{
        ship: 107,
        value: 243
    }, {
        ship: 108,
        value: 1634782
    }, {
        ship: 109,
        value: 2985984
    }, {
        ship: 110,
        value: 9938958
    }, {
        ship: 111,
        value: 9529488
    }],
    planet: "vikasuka"
}, {
    civis: 17,
    name: "Lord Saleos's Fleet",
    ships: [{
        ship: 109,
        value: 20
    }, {
        ship: 110,
        value: 11232
    }, {
        ship: 111,
        value: 2173392
    }],
    planet: "pollux"
}, {
    civis: 17,
    name: "Lord Raum's Fleet",
    ships: [{
        ship: 108,
        value: 598
    }, {
        ship: 109,
        value: 933120
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 9529488
    }],
    planet: "mellivor"
}, {
    civis: 17,
    name: "Lord Vassago's Fleet",
    ships: [{
        ship: 107,
        value: 15980
    }, {
        ship: 108,
        value: 590976
    }, {
        ship: 109,
        value: 7091712
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 2985984
    }],
    planet: "malus"
}, {
    civis: 17,
    name: "Lord Namtar's Fleet",
    ships: [{
        ship: 108,
        value: 563
    }, {
        ship: 109,
        value: 590976
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 2985984
    }],
    planet: "cranium"
}, {
    civis: 17,
    name: "Lord Malphas's Fleet",
    ships: [{
        ship: 107,
        value: 540
    }, {
        ship: 108,
        value: 291600
    }, {
        ship: 109,
        value: 7091712
    }, {
        ship: 110,
        value: 9529488
    }, {
        ship: 111,
        value: 9529488
    }],
    planet: "gora"
}, {
    civis: 17,
    name: "Lord Merihem's Fleet",
    ships: [{
        ship: 107,
        value: 9631855
    }, {
        ship: 108,
        value: 9992341
    }, {
        ship: 109,
        value: 9529488
    }, {
        ship: 110,
        value: 9992341
    }, {
        ship: 111,
        value: 9938958
    }],
    planet: "karmirion"
}, {
    civis: 17,
    name: "Lord Eisheth's Fleet",
    ships: [{
        ship: 109,
        value: 36
    }, {
        ship: 110,
        value: 11714
    }, {
        ship: 111,
        value: 248832
    }],
    planet: "extremandur"
}, {
    civis: 17,
    name: "Lord Beleth's Fleet",
    ships: [{
        ship: 108,
        value: 540
    }, {
        ship: 109,
        value: 334368
    }, {
        ship: 110,
        value: 9938958
    }, {
        ship: 111,
        value: 9529488
    }],
    planet: "viscarius"
}, {
    civis: 17,
    name: "Lord Andras's Fleet",
    ships: [{
        ship: 108,
        value: 34
    }, {
        ship: 109,
        value: 641763
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 7091712
    }],
    planet: "vehemir"
}, {
    civis: 17,
    name: "Lord Alastor's Fleet",
    ships: [{
        ship: 107,
        value: 1
    }, {
        ship: 108,
        value: 248832
    }, {
        ship: 109,
        value: 2985984
    }, {
        ship: 110,
        value: 2985984
    }, {
        ship: 111,
        value: 2985984
    }],
    planet: "peleuvis"
}, {
    civis: 17,
    name: "Lord Agares's Fleet",
    ships: [{
        ship: 108,
        value: 13478
    }, {
        ship: 109,
        value: 2985984
    }, {
        ship: 110,
        value: 7091712
    }, {
        ship: 111,
        value: 7091712
    }],
    planet: "exabolan"
}, {
    civis: 17,
    name: "Lord Phenex's Fleet",
    ships: [{
        ship: 109,
        value: 4
    }, {
        ship: 110,
        value: 11714
    }, {
        ship: 111,
        value: 933120
    }],
    planet: "discordia"
}, {
    civis: 17,
    name: "Lord Orobas's Fleet",
    ships: [{
        ship: 106,
        value: 1
    }, {
        ship: 107,
        value: 1E7
    }, {
        ship: 108,
        value: 1E7
    }, {
        ship: 109,
        value: 1E7
    }, {
        ship: 110,
        value: 1E7
    }, {
        ship: 111,
        value: 1E7
    }],
    planet: "unia"
}, {
    civis: 19,
    name: "Lady Abathar's Fleet",
    ships: [{
        ship: 119,
        value: 363
    }, {
        ship: 120,
        value: 248832
    }, {
        ship: 121,
        value: 9529488
    }, {
        ship: 122,
        value: 9529488
    }],
    planet: "eta aras"
}, {
    civis: 19,
    name: "Lady Hashmal's Fleet",
    ships: [{
        ship: 119,
        value: 243
    }, {
        ship: 120,
        value: 248832
    }, {
        ship: 121,
        value: 1728
    }, {
        ship: 122,
        value: 248832
    }],
    planet: "premeza"
}, {
    civis: 19,
    name: "Lady Anael's Fleet",
    ships: [{
        ship: 120,
        value: 540
    }, {
        ship: 121,
        value: 144
    }, {
        ship: 122,
        value: 2985984
    }],
    planet: "cetus"
}, {
    civis: 19,
    name: "Lady Shamsiel's Fleet",
    ships: [{
        ship: 121,
        value: 6
    }, {
        ship: 122,
        value: 10935
    }],
    planet: "bolmir"
}, {
    civis: 19,
    name: "Lady Dumah's Fleet",
    ships: [{
        ship: 121,
        value: 5
    }, {
        ship: 122,
        value: 410
    }],
    planet: "lascura"
}, {
    civis: 19,
    name: "Lady Pheran's Fleet",
    ships: [{
        ship: 120,
        value: 356
    }, {
        ship: 121,
        value: 334368
    }, {
        ship: 122,
        value: 709E4
    }],
    planet: "urdum"
}, {
    civis: 19,
    name: "Lady Vehuel's Fleet",
    ships: [{
        ship: 119,
        value: 67598
    }, {
        ship: 120,
        value: 1E7
    }, {
        ship: 121,
        value: 1E7
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "janus"
}, {
    civis: 19,
    name: "Lady Hesediel's Fleet",
    ships: [{
        ship: 119,
        value: 3688760
    }, {
        ship: 120,
        value: 1E7
    }, {
        ship: 121,
        value: 1E7
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "erper vestalis"
}, {
    civis: 19,
    name: "Lady Eremiel's Fleet",
    ships: [{
        ship: 119,
        value: 47525
    }, {
        ship: 120,
        value: 709E4
    }, {
        ship: 121,
        value: 1E7
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "japheth"
}, {
    civis: 19,
    name: "Lady Rubiel's Fleet",
    ships: [{
        ship: 119,
        value: 38815
    }, {
        ship: 120,
        value: 1E7
    }, {
        ship: 121,
        value: 709E4
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "poligon"
}, {
    civis: 19,
    name: "Lady Jequn's Fleet",
    ships: [{
        ship: 119,
        value: 2601662
    }, {
        ship: 120,
        value: 1E7
    }, {
        ship: 121,
        value: 1E7
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "jardin"
}, {
    civis: 19,
    name: "Lady Ishim's Fleet",
    ships: [{
        ship: 119,
        value: 33354
    }, {
        ship: 120,
        value: 709E4
    }, {
        ship: 121,
        value: 1E7
    }, {
        ship: 122,
        value: 95E5
    }],
    planet: "elon"
}, {
    civis: 19,
    name: "Lady Miah's Fleet",
    ships: [{
        ship: 119,
        value: 29685
    }, {
        ship: 120,
        value: 1E7
    }, {
        ship: 121,
        value: 709E4
    }, {
        ship: 122,
        value: 1E7
    }],
    planet: "yllirium"
}, {
    civis: 19,
    name: "Lady Rassa's Fleet",
    ships: [{
        ship: 121,
        value: 47
    }, {
        ship: 122,
        value: 5514
    }],
    planet: "mihandria"
}, {
    civis: 19,
    name: "Lady Firiel's Fleet",
    ships: [{
        ship: 120,
        value: 290
    }, {
        ship: 121,
        value: 291600
    }, {
        ship: 122,
        value: 953E4
    }],
    planet: "misfir"
}, {
    civis: 19,
    name: "Lady Kushah's Fleet",
    ships: [{
        ship: 119,
        value: 144
    }, {
        ship: 120,
        value: 341E3
    }, {
        ship: 121,
        value: 1728
    }, {
        ship: 122,
        value: 3E6
    }],
    planet: "hordron"
}, {
    civis: 19,
    name: "Lady Bamiel's Fleet",
    ships: [{
        ship: 118,
        value: 1
    }],
    planet: "parai"
}, {
    civis: 18,
    name: "Formicus Fleet",
    ships: [{
        ship: 115,
        value: 6
    }, {
        ship: 116,
        value: 12
    }, {
        ship: 117,
        value: 78
    }],
    planet: "xirandrus"
}, {
    civis: 18,
    name: "Termitin Fleet",
    ships: [{
        ship: 114,
        value: 28
    }, {
        ship: 115,
        value: 144
    }, {
        ship: 116,
        value: 1728
    }, {
        ship: 117,
        value: 20736
    }],
    planet: "atlas"
}, {
    civis: 18,
    name: "Vesparion Fleet",
    ships: [{
        ship: 115,
        value: 1
    }, {
        ship: 116,
        value: 20
    }, {
        ship: 117,
        value: 28
    }],
    planet: "mallus"
}, {
    civis: 18,
    name: "Kalabro Fleet",
    ships: [{
        ship: 114,
        value: 5400
    }, {
        ship: 115,
        value: 77760
    }, {
        ship: 116,
        value: 1728
    }, {
        ship: 117,
        value: 248832
    }],
    planet: "augmeris"
}, {
    civis: 18,
    name: "Koleopta Fleet",
    ships: [{
        ship: 114,
        value: 936
    }, {
        ship: 115,
        value: 27864
    }, {
        ship: 116,
        value: 34992
    }, {
        ship: 117,
        value: 248832
    }],
    planet: "vanubis"
}]
  , chambers = "";
POPULATION_ENABLED && (chambers = "<br>Level<span class='blue_text' style='font-size:100%;'>2</span>: Allows <span class='blue_text' style='font-size:100%;'>Cryocell Facility, Hibernation Chamber and Dehibernation Chamber</span> construction");
var researchesDefinition = [{
    id: "mineralogy",
    name: "Geology",
    desc: "var str = \"\";if (this.level <= 3) str += \"<br>Level <span class='blue_text' style='font-size:100%;'>3</span>: Allows <span class='blue_text' style='font-size:100%;'>Metal Collector</span> and <span class='blue_text' style='font-size:100%;'>Sand Quarry</span> construction\"; return str;",
    researchPoint: 125,
    pos: [3, 0],
    buildingBonus: [{
        id: "mine",
        resource: "iron",
        value: 25,
        level: 1,
        reduction: {
            value: .2,
            limit: 125
        }
    }, {
        id: "graphext",
        resource: "graphite",
        value: 12,
        level: 1
    }, {
        id: "submetal",
        resource: "iron",
        value: 12,
        level: 1
    }, {
        id: "submetal",
        resource: "titanium",
        value: 18,
        level: 1
    }, {
        id: "submetal",
        resource: "uranium",
        value: 12,
        level: 1
    }, {
        id: "subsand",
        resource: "sand",
        value: 12,
        level: 1
    }, {
        id: "subsand",
        resource: "graphite",
        value: 12,
        level: 1
    }, {
        id: "lavamine",
        resource: "graphite",
        value: 12,
        level: 1
    }, {
        id: "lavamine2",
        resource: "titanium",
        value: 18,
        level: 1
    }, {
        id: "rhodiumext",
        resource: "titanium",
        value: 18,
        level: 1
    }, {
        id: "collector",
        resource: "titanium",
        value: 18,
        level: 4
    }, {
        id: "collector",
        resource: "uranium",
        value: 12,
        level: 4
    }, {
        id: "quarry",
        resource: "sand",
        value: 12,
        level: 4
    }, {
        id: "sand",
        resource: "sand",
        value: 12,
        level: 4
    }, {
        id: "pumpjack",
        resource: "oil",
        value: 8,
        level: 4
    }, {
        id: "algaefarm",
        resource: "oil",
        value: 8,
        level: 4
    }, {
        id: "biofuel",
        resource: "oil",
        value: 8,
        level: 4
    }],
    requirement: function() {
        return !0
    }
}, {
    id: "material",
    name: "Material Science",
    desc: "var str=\"\"; if (this.level <= 7) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>8</span>: Allows <span class='blue_text' style='font-size:100%;'>Plastic Factory</span> and <span class='blue_text' style='font-size:100%;'>Polymerizer</span> construction\"; if (this.level <= 14) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>15</span>: Allows <span class='blue_text' style='font-size:100%;'>Nanotubes Factory</span> construction\"; if (this.level > 30 && this.level < 35) str+=\"<br>Level<span class='blue_text' style='font-size:100%;'>35</span>: Allows <span class='blue_text' style='font-size:100%;'>Meissnerium</span> production\"; return str;",
    researchPoint: 500,
    techPoint: 15,
    multBonus: 1.4,
    pos: [3, 1],
    req: {
        mineralogy: 1
    },
    buildingBonus: [{
        id: "foundry",
        resource: "steel",
        value: 50,
        level: 1,
        reduction: {
            value: .5,
            limit: 100
        }
    }, {
        id: "plastic",
        resource: "plastic",
        value: 25,
        level: 8
    }, {
        id: "polymer",
        resource: "plastic",
        value: 25,
        level: 8
    }, {
        id: "bioplastic",
        resource: "plastic",
        value: 25,
        level: 8
    }, {
        id: "nanofact",
        resource: "nanotubes",
        value: 12,
        level: 15
    }, {
        id: "nanomarine",
        resource: "nanotubes",
        value: 12,
        level: 15
    }, {
        id: "ceramic",
        resource: "meissnerium",
        value: 8,
        level: 36
    }],
    requirement: function() {
        return !0
    }
}, {
    id: "chemical",
    name: "Chemical Engineering",
    desc: "var str=\"\"; if (this.level >= 30) str +=\"<span class='blue_text' style='font-size:100%;'>Methane Aggregator</span> - <span class='blue_text' style='font-size:100%;'>Methane</span> consumption +8%\"; if (this.level == 0) str +=\"<br>Allows <span class='blue_text' style='font-size:100%;'>Oil</span> extraction\"; if (this.level <= 1) str +=\"<br>Level<span class='blue_text' style='font-size:100%;'>2</span>: Allows <span class='blue_text' style='font-size:100%;'>Oil Refinery</span> construction\"; if (this.level <= 30) str +=\"<br>Level <span class='blue_text' style='font-size:100%;'>30</span>: Unlock <span class='blue_text' style='font-size:100%;'>Methane Aggregator</span>\";  return str;",
    researchPoint: 1200,
    techPoint: 12,
    tier: 1,
    pos: [3, 2],
    req: {
        material: 1
    },
    buildingBonus: [{
        id: "converter",
        resource: "fuel",
        value: 25,
        level: 1
    }, {
        id: "floatharv",
        resource: "methane",
        value: 20,
        level: 1,
        showCondition: function() {
            return game.searchPlanet(planetsName.orpheus)
        }
    }, {
        id: "ref",
        resource: "fuel",
        value: 12,
        level: 3
    }, {
        id: "aggregator",
        resource: "nanotubes",
        value: 20,
        level: 31
    }],
    extraBonus: function() {
        30 < this.level && (buildings[buildingsName.aggregator].resourcesProd[resourcesName.methane.id] *= 1.08)
    },
    extraUnbonus: function() {
        30 < this.level && (buildings[buildingsName.aggregator].resourcesProd[resourcesName.methane.id] /= 1.08)
    },
    requirement: function() {
        return !0
    }
}, {
    id: "astronomy",
    name: "Interstellar Travel",
    desc: "var str = \"Allows to see planets at <span class='blue_text' style='font-size:100%;'>\"+(this.level+1)+\" hops </span> distance from <span class='blue_text' style='font-size:100%;'>\"+planets[game.capital].name.capitalize()+\"</span>\"; str += \"<br><span class='blue_text' style='font-size:100%;'>Vitha Colony Ship</span> speed +12%\"; if (this.level == 0) str += \"<br>Allows <span class='blue_text' style='font-size:100%;'>Shipyard</span> construction\"; return str;",
    researchPoint: 3E3,
    mult: 4.3,
    techPoint: 200,
    multBonus: 2,
    extraBonus: function() {
        (4 <= this.level && 0 < game.timeTravelNum || 7 <= game.researches[3].level && 0 == game.timeTravelNum) && $("#b_diplomacy_icon").show();
        7 <= this.level && $("#b_tournament_icon").show();
        ships[0].speed *= 1.12
    },
    extraUnbonus: function() {
        (4 >= this.level && 0 < game.timeTravelNum || 7 >= game.researches[3].level && 0 == game.timeTravelNum) && $("#b_diplomacy_icon").hide();
        7 >= this.level && $("#b_tournament_icon").hide();
        ships[0].speed /= 1.12
    },
    tier: 1,
    pos: [0, 0],
    requirement: function() {
        return !0
    }
}, {
    id: "ice",
    name: "Cryogenics",
    desc: 'var str=""; if (this.level <= 0) str += "Allows <span class=\'blue_text\' style=\'font-size:100%;\'>Ice</span> extraction"; if (this.level <= 1) str += "' + chambers + "\";if (this.level <= 9) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>10</span>: Allows <span class='blue_text' style='font-size:100%;'>Coolant Factory</span> construction\";if (this.level <= 11) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>12</span>: Allows <span class='blue_text' style='font-size:100%;'>Cryogenic Laboratory</span> construction\"; if (this.level >= 12) str += \"<br><span class='blue_text' style='font-size:100%;'>Cryogenic Laboratory</span> production +12%\"; return str;",
    researchPoint: 1E4,
    techPoint: 100,
    multBonus: 1.5,
    tier: 4,
    req: {
        material: 3
    },
    pos: [4, 1],
    buildingBonus: [{
        id: "icedrill",
        resource: "ice",
        value: 25,
        level: 2
    }, {
        id: "coolfact",
        resource: "coolant",
        value: 12,
        level: 10
    }, {
        id: "ammonia_refrigerator",
        resource: "coolant",
        value: 12,
        level: 1
    }],
    extraBonus: function() {
        11 < this.level && (buildings[buildingsName.cryolab].researchPoint *= 1.12)
    },
    extraUnbonus: function() {
        11 < this.level && (buildings[buildingsName.cryolab].researchPoint /= 1.12)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.vasilis)
    }
}, {
    id: "marine",
    name: "NONONONO",
    desc: 'return "Allows construction of submerged buildings on ocean planets"; return str;',
    researchPoint: 0
}, {
    id: "military",
    name: "Military Technology",
    desc: "var str = \"\"; if (this.level <= 0) str = \"Level <span class='blue_text' style='font-size:100%;'>1</span>: Allows <span class='blue_text' style='font-size:100%;'>Ammunition Factory</span> construction\"; if (this.level <= 7) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>8</span>: Allows <span class='blue_text' style='font-size:100%;'>Uranium Shell Assembler</span> construction\"; if (this.level <= 11) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>12</span>: Allows <span class='blue_text' style='font-size:100%;'>Armor Factory</span> construction\"; if (this.level <= 15) str += \"<br>Level<span class='blue_text' style='font-size:100%;'>16</span>: Allows <span class='blue_text' style='font-size:100%;'>Engine Factory</span> construction\"; return str;",
    researchPoint: 33E3,
    techPoint: 50,
    multBonus: 1.3,
    tier: 3,
    pos: [0, 1],
    req: {
        astronomy: 4
    },
    buildingBonus: [{
        id: "amno",
        resource: "ammunition",
        value: 12,
        level: 2
    }, {
        id: "ufact",
        resource: "u-ammunition",
        value: 12,
        level: 9
    }, {
        id: "armorfact",
        resource: "armor",
        value: 12,
        level: 13
    }, {
        id: "enginefact",
        resource: "engine",
        value: 12,
        level: 17
    }],
    requirement: function() {
        return game.searchPlanet(planetsName.uanass)
    }
}, {
    id: "science",
    name: "Scientific Research",
    desc: "return \"<span class='blue_text' style='font-size:100%;'>All research points</span> production +" + Math.floor(1100 + (this.level || 0)) / 100 + '%";',
    researchPoint: 4E4,
    techPoint: 100,
    multBonus: 1.5,
    tier: 2,
    max: 64,
    mult: 2.5,
    pos: [1, 0],
    req: {
        astronomy: 1
    },
    extraBonus: function() {
        researches[researchesName.science].extraDescription = new Function("return \"<span class='blue_text' style='font-size:100%;'>All research points</span> production +" + Math.floor(1100 + (this.level || 0)) / 100 + '%";');
        buildings[buildingsName.lab].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.fluidod].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.oceanographic].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.bioengineering].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.haleanResearch].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.cryolab].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.lavaresearch].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.karanlab].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.karanlab2].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.superfluids_center].researchPoint *= 1.1 + .001 * this.level;
        buildings[buildingsName.ammonia_airship].researchPoint *= 1.1 + .001 * this.level
    },
    extraUnbonus: function() {
        researches[researchesName.science].extraDescription = new Function("return \"<span class='blue_text' style='font-size:100%;'>All research points</span> production +" + Math.floor(1100 + (this.level || 0)) / 100 + '%";');
        buildings[buildingsName.lab].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.fluidod].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.oceanographic].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.bioengineering].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.haleanResearch].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.cryolab].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.lavaresearch].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.karanlab].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.karanlab2].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.superfluids_center].researchPoint /= 1.1 + .001 * this.level;
        buildings[buildingsName.ammonia_airship].researchPoint /= 1.1 + .001 * this.level
    },
    requirement: function() {
        return !0
    }
}, {
    id: "electronics",
    name: "Electronics",
    desc: "var str='';if (this.level <= 1) str+=\"Allows <span class='blue_text' style='font-size:100%;'>Circuit</span> production\"; if (this.level <= 7) str+=\"<br>Level<span class='blue_text' style='font-size:100%;'>8</span>: Allows <span class='blue_text' style='font-size:100%;'>Batteries</span> production\"; if (this.level > 25 && this.level < 30) str+=\"<br>Level<span class='blue_text' style='font-size:100%;'>30</span>: Allows <span class='blue_text' style='font-size:100%;'>Superconductors</span> production\"; return str;",
    researchPoint: 5E4,
    techPoint: 100,
    multBonus: 1.5,
    tier: 3,
    pos: [2, 1],
    req: {
        material: 5
    },
    buildingBonus: [{
        id: "electronic",
        resource: "circuit",
        value: 30,
        level: 2
    }, {
        id: "superconductor_factory",
        resource: "superconductors",
        value: 8,
        level: 31
    }, {
        id: "battery_factory",
        resource: "empty battery",
        value: 12,
        level: 8
    }, {
        id: "battery_charger",
        cost: "steel",
        value: -50,
        level: 8
    }, {
        id: "battery_charger",
        cost: "titanium",
        value: -50,
        level: 8
    }, {
        id: "battery_charger",
        cost: "plastic",
        value: -50,
        level: 8
    }, {
        id: "battery_plant",
        cost: "titanium",
        value: -50,
        level: 8
    }, {
        id: "battery_plant",
        cost: "plastic",
        value: -50,
        level: 8
    }, {
        id: "battery_plant",
        cost: "circuit",
        value: -50,
        level: 8
    }, {
        id: "mcell_factory",
        resource: "meissner cell",
        value: 12.5,
        level: 35,
        reduction: {
            value: .5,
            limit: 60
        }
    }],
    requirement: function() {
        return !0
    }
}, {
    id: "nuclear",
    name: "Nuclear Physics",
    desc: "var str =\"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Hydrogen</span> extraction and <span class='blue_text' style='font-size:100%;'>Nuclear Powerplant</span> construction\"; if (this.level <= 2) str+=\"<br>Level<span class='blue_text' style='font-size:100%;'>3</span>: Allows <span class='blue_text' style='font-size:100%;'>Pressurized water reactor</span> construction\"; if (this.level <= 4) str+=\"<br>Level<span class='blue_text' style='font-size:100%;'>5</span>: Allows <span class='blue_text' style='font-size:100%;'>Fusion reactor</span> construction\"; if (this.level >= 5) str+=\"<br><span class='blue_text' style='font-size:100%;'>Fusion Reactor</span>'s Hydrogen consumption -5%\"; return str;",
    researchPoint: 2E5,
    techPoint: 100,
    multBonus: 1.5,
    tier: 4,
    pos: [2, 2],
    req: {
        electronics: 1
    },
    extraBonus: function() {
        buildings[buildingsName.fusion].resourcesProd[resourcesName.hydrogen.id] *= .95
    },
    extraUnbonus: function() {
        buildings[buildingsName.fusion].resourcesProd[resourcesName.hydrogen.id] /= .95
    },
    requirement: function() {
        return !0
    }
}, {
    id: "environment",
    name: "Environmental Sciences",
    desc: "var str = \"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Arctic Fishing Outpost, Hunting Spot, Greenhouse, Bioplastic Synthesizer, Biofuel Refinery</span> and <span class='blue_text' style='font-size:100%;'>Bioengineering Center</span> construction\"; if (this.level > 0) str+= \"<span class='blue_text' style='font-size:100%;'>Bioengineering Center</span> production +12%\"; if (this.level < 1) str+= \"<br><span class='blue_text' style='font-size:100%;'>Algae Oil Farm</span> biomass production +1.0\";  return str;",
    researchPoint: 5E5,
    techPoint: 50,
    multBonus: 1.5,
    pos: [4, 3],
    req: {
        hydro: 3
    },
    buildingBonus: [{
        id: "fish",
        resource: "biomass",
        value: 25,
        level: 1
    }, {
        id: "hunting",
        resource: "biomass",
        value: 25,
        level: 1
    }, {
        id: "serra",
        resource: "biomass",
        value: 25,
        level: 1
    }, {
        id: "biofuel",
        resource: "fuel",
        value: 25,
        level: 1
    }, {
        id: "algaefarm",
        resource: "biomass",
        value: 25,
        level: 2
    }, {
        id: "biofuel",
        resource: "oil",
        value: 25,
        level: 1
    }, {
        id: "bioplastic",
        resource: "plastic",
        value: 25,
        level: 1
    }, {
        id: "floathouse",
        resource: "biomass",
        value: 25,
        level: 1
    }],
    extraBonus: function() {
        buildings[buildingsName.bioengineering].researchPoint *= 1.12;
        1 == this.level && (buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] = 1)
    },
    extraUnbonus: function() {
        buildings[buildingsName.bioengineering].researchPoint /= 1.12;
        1 == this.level && (buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] = 0)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.traumland)
    }
}, {
    id: "halean",
    name: "Halean Technology",
    desc: "var str = \"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Technetium Fissor, Halean Laboratory</span><br>and <span class='blue_text' style='font-size:100%;'>Halean A.I. Center</span> construction\"; if (this.level > 0) str+= \"<span class='blue_text' style='font-size:100%;'>Halean Laboratory</span> production +12%\"; return str;",
    researchPoint: 1E8,
    techPoint: 100,
    multBonus: 1.5,
    pos: [1, 2],
    req: {
        artificial_intelligence: 1
    },
    buildingBonus: [{
        id: "fissor",
        resource: "technetium",
        value: 12,
        level: 1
    }, {
        id: "haleanRobots",
        resource: "robots",
        value: 12,
        level: 1
    }],
    extraBonus: function() {
        buildings[buildingsName.haleanResearch].researchPoint *= 1.12
    },
    extraUnbonus: function() {
        buildings[buildingsName.haleanResearch].researchPoint /= 1.12
    },
    requirement: function() {
        return game.searchPlanet(planetsName.posirion)
    }
}, {
    id: "artofwar",
    name: "Quris Art of War",
    desc: "var str =\"All friendly ships <span class='blue_text' style='font-size:100%;'>Power, Armor, Shields</span> and <span class='blue_text' style='font-size:100%;'>HPs</span> +5%<br>Foxar, Sky Dragon <span class='blue_text' style='font-size:100%;'>Power, Armor</span> and <span class='blue_text' style='font-size:100%;'>HPs</span> +12%<br>Babayaga, Siber and Alkantara<span class='blue_text' style='font-size:100%;'> Power, Armor, Shields</span> and <span class='blue_text' style='font-size:100%;'>HPs</span> +\"+Math.min(Math.floor((5+this.level*0.15)*100)/100,15)+\"%\"; if (this.level == 0) str+= \"<br>Allows <span class='blue_text' style='font-size:100%;'>T-Ammunition Assembler</span> construction\"; return str;",
    researchPoint: 500 * mi,
    techPoint: 50,
    multBonus: 1.3,
    questRequirement: {
        quris_3: 1
    },
    buildingBonus: [{
        id: "tfact",
        resource: "t-ammunition",
        value: 12,
        level: 2
    }],
    mult: 1.6,
    pos: [0, 2],
    req: {
        military: 12
    },
    extraBonus: function() {
        for (var b = Math.min(1.05 + .0015 * this.level, 1.15), e = 0; e < game.ships.length; e++) {
            var d = game.ships[e].id;
            5 == d || 6 == d ? (ships[d].power *= 1.12,
            ships[d].armor *= 1.12,
            ships[d].hp *= 1.12) : 8 == d || 12 == d || 14 == d ? (ships[d].power *= b,
            ships[d].armor *= b,
            ships[d].hp *= b,
            ships[d].shield *= b) : (ships[d].power *= 1.05,
            ships[d].armor *= 1.05,
            ships[d].hp *= 1.05,
            ships[d].shield *= 1.05)
        }
    },
    extraUnbonus: function() {
        for (var b = Math.min(1.05 + .0015 * this.level, 1.15), e = 0; e < game.ships.length; e++) {
            var d = game.ships[e].id;
            5 == d || 6 == d ? (ships[d].power /= 1.12,
            ships[d].armor /= 1.12,
            ships[d].hp /= 1.12) : 8 == d || 12 == d || 14 == d ? (ships[d].power /= b,
            ships[d].armor /= b,
            ships[d].hp /= b,
            ships[d].shield /= b) : (ships[d].power /= 1.05,
            ships[d].armor /= 1.05,
            ships[d].hp /= 1.05,
            ships[d].shield /= 1.05)
        }
    },
    requirement: function() {
        return game.searchPlanet(planetsName.antaris) || quests[questNames.quris_3].done
    }
}, {
    id: "nononono",
    name: "Methane Extraction",
    desc: 'return "Allow methane production ";',
    researchPoint: 2E4
}, {
    id: "artificial_intelligence",
    name: "Artificial Intelligence",
    desc: "var str=\"\"; if (this.level == 0) str+=\"<br>Allows <span class='blue_text' style='font-size:100%;'>Robots Factory</span> construction\"; if (this.level > 0) str+=\"<span class='blue_text' style='font-size:100%;'>Robots Factory</span> production +12%\"; return str;",
    researchPoint: 5E7,
    pos: [1, 1],
    req: {
        electronics: 8
    },
    extraBonus: function() {
        buildings[buildingsName.robotfact].resourcesProd[resourcesName.robots.id] *= 1.12;
        buildings[buildingsName.robotfact].pollution *= 1.3
    },
    extraUnbonus: function() {
        buildings[buildingsName.robotfact].resourcesProd[resourcesName.robots.id] /= 1.12;
        buildings[buildingsName.robotfact].pollution /= 1.3
    },
    requirement: function() {
        return game.searchPlanet(planetsName.zelera)
    }
}, {
    id: "vulcan",
    name: "Vulcanology",
    desc: "var str=\"\"; if (this.level == 0) str+=\"<br>Allows <span class='blue_text' style='font-size:100%;'>Vulcan Observatory, Lava Mine</span> and<br><span class='blue_text' style='font-size:100%;'>Carbon-Sulfur Mine</span> construction\"; if (this.level > 0) str+=\"<span class='blue_text' style='font-size:100%;'>Vulcan Observatory</span> production +12%\"; return str;",
    researchPoint: 200 * mi,
    techPoint: 100,
    multBonus: 1.5,
    pos: [4, 0],
    req: {
        mineralogy: 17
    },
    buildingBonus: [{
        id: "lavamine",
        resource: "graphite",
        value: 12,
        level: 1
    }, {
        id: "lavamine",
        resource: "sulfur",
        value: 12,
        level: 1
    }, {
        id: "lavamine2",
        resource: "titanium",
        value: 12,
        level: 1
    }],
    extraBonus: function() {
        buildings[buildingsName.lavaresearch].researchPoint *= 1.12
    },
    extraUnbonus: function() {
        buildings[buildingsName.lavaresearch].researchPoint /= 1.12
    },
    requirement: function() {
        return game.searchPlanet(planetsName.nassaus)
    }
}, {
    id: "hydro",
    name: "Hydrology",
    desc: "var str=\"\"; if (this.level == 0) str+=\"Allows construction of buildings on ocean planets\"; if (this.level > 0) str+=\"<span class='blue_text' style='font-size:100%;'>Electrolyzer</span> - <span class='blue_text' style='font-size:100%;'>Water</span> consumption +12%<br><span class='blue_text' style='font-size:100%;'>Oceanographic Center</span> production +12%\"; if (this.level > 0 && game.researches[researchesName[\"material\"]].level >= 15) str+=\"<br><span class='blue_text' style='font-size:100%;'>Nanotubes Dome</span> - <span class='blue_text' style='font-size:100%;'>Nanotubes</span> production +8%\"; return str;",
    researchPoint: 2E4,
    techPoint: 50,
    multBonus: 1.5,
    pos: [4, 2],
    req: {
        chemical: 3
    },
    buildingBonus: [{
        id: "pump",
        resource: "water",
        value: 12,
        level: 1
    }, {
        id: "pumpplt",
        resource: "water",
        value: 12,
        level: 1
    }, {
        id: "algaefarm",
        resource: "oil",
        value: 12,
        level: 1
    }, {
        id: "electrolyzer",
        resource: "hydrogen",
        value: 12,
        level: 1
    }, {
        id: "marineref",
        resource: "fuel",
        value: 8,
        level: 1
    }],
    extraBonus: function() {
        buildings[buildingsName.oceanographic].researchPoint *= 1.12;
        buildings[buildingsName.electrolyzer].resourcesProd[resourcesName.water.id] *= 1.12;
        buildings[buildingsName.nanomarine].resourcesProd[resourcesName.nanotubes.id] *= 1.08;
        buildings[buildingsName.marineref].resourcesProd[resourcesName.fuel.id] *= 1.08
    },
    extraUnbonus: function() {
        buildings[buildingsName.oceanographic].researchPoint /= 1.12;
        buildings[buildingsName.electrolyzer].resourcesProd[resourcesName.water.id] /= 1.12;
        buildings[buildingsName.nanomarine].resourcesProd[resourcesName.nanotubes.id] /= 1.08;
        buildings[buildingsName.marineref].resourcesProd[resourcesName.fuel.id] /= 1.08
    },
    requirement: function() {
        return game.searchPlanet(planetsName.aequoreas)
    }
}, {
    id: "rhodium",
    name: "Metallokopta's Science",
    desc: "var str=\"\"; if (this.level == 0) str+=\"Allows construction of <span class='blue_text' style='font-size:100%;'>Rhodium Extractor and Rhodium Sand Smelter</span>\"; return str;",
    researchPoint: 1E3 * mi,
    techPoint: 500,
    multBonus: 1.35,
    pos: [3, 3],
    req: {
        chemical: 17
    },
    buildingBonus: [{
        id: "rhodiumext",
        resource: "rhodium",
        value: 12,
        level: 2
    }, {
        id: "rhodiumext",
        resource: "titanium",
        value: 12,
        level: 2
    }, {
        id: "rhodiumsand",
        resource: "silicon",
        value: 8,
        level: 2
    }, {
        id: "sandsmelt",
        resource: "silicon",
        value: 8,
        level: 2
    }, {
        id: "subsand",
        resource: "rhodium",
        value: 8,
        level: 2
    }],
    requirement: function() {
        return game.searchPlanet(planetsName.tsartasis)
    }
}, {
    id: "osmium",
    name: "Metallokopta's Biology",
    desc: "var str=\"\"; if (this.level == 0) str+=\"Allows construction of <span class='blue_text' style='font-size:100%;'>Osmium Extractor and Metallokopta Clonator</span>\"; if (this.level > 0) str+=\"<span class='blue_text' style='font-size:100%;'>Osmium Extractor and Metallokopta Clonator</span> production +5%\"; return str;",
    researchPoint: 5 * bi,
    pos: [3, 4],
    req: {
        rhodium: 2
    },
    buildingBonus: [{
        id: "subsand",
        resource: "osmium",
        value: 8,
        level: 2
    }],
    extraBonus: function() {
        buildings[buildingsName.osmiumext].resourcesProd[resourcesName.osmium.id] *= 1.05;
        buildings[buildingsName.mkclone].resourcesProd[resourcesName["mK Embryo"].id] *= 1.05
    },
    extraUnbonus: function() {
        buildings[buildingsName.osmiumext].resourcesProd[resourcesName.osmium.id] /= 1.05;
        buildings[buildingsName.mkclone].resourcesProd[resourcesName["mK Embryo"].id] /= 1.05
    },
    requirement: function() {
        return game.searchPlanet(planetsName.echoes)
    }
}, {
    id: "quantum",
    name: "Quantum Physics",
    desc: "var str=\"\"; if (this.level == 0) str+=\"Allows construction of <span class='blue_text' style='font-size:100%;'>Particle Accelerator</span> and <span class='blue_text' style='font-size:100%;'>Antimatter Collider</span>\"; if (this.level > 0) str+=\"<span class='blue_text' style='font-size:100%;'>Particle Accelerator</span> production +12%\"; return str;",
    researchPoint: 2E3 * mi,
    pos: [1, 3],
    req: {
        halean: 4
    },
    extraBonus: function() {
        1 < this.level && (buildings[buildingsName.particle].resourcesProd[resourcesName.antimatter.id] *= 1.12)
    },
    extraUnbonus: function() {
        1 < this.level && (buildings[buildingsName.particle].resourcesProd[resourcesName.antimatter.id] /= 1.12)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.zhura)
    }
}, {
    id: "secret",
    name: "Secrets of Space-Time",
    desc: "var str=\"\"; if (this.level == 0) str+=\"Allows the construction of <span class='blue_text' style='font-size:100%;'>Space Gate Alpha</span> and <span class='blue_text' style='font-size:100%;'>Wahrian Time Machine</span>\"; if (this.level == 1) str+=\"Allows the construction of <span class='blue_text' style='font-size:100%;'>Space Gate Beta</span>\"; return str;",
    researchPoint: 50 * bi,
    techPoint: 2E3,
    mult: 100,
    multBonus: 5,
    max: 2,
    pos: [2, 3],
    req: {
        quantum: 2,
        nuclear: 14,
        rhodium: 3
    },
    extraBonus: function() {
        game.maps[1] = 1
    },
    extraUnbonus: function() {
        delete game.maps[1]
    },
    requirement: function() {
        return game.searchPlanet(planetsName.xora)
    }
}, {
    id: "karan_artofwar",
    name: "Karan Art of War",
    desc: "var str =\"<span class='blue_text' style='font-size:100%;'>Luxis</span> and <span class='blue_text' style='font-size:100%;'>Siber</span> x1.3 piercing power up to 100%\"; str +=\"<br><span class='blue_text' style='font-size:100%;'>Resources cost</span> of friendly ships -8%\"; str +=\"<br><span class='blue_text' style='font-size:100%;'>Muralla's</span> weight +20%\"; return str;",
    researchPoint: 200 * bi,
    techPoint: 1200,
    multBonus: 2,
    pos: [0, 3],
    req: {
        artofwar: 12
    },
    max: 111,
    extraBonus: function() {
        for (var b = 0; b < game.ships.length; b++) {
            var e = game.ships[b].id;
            ships[e].piercing *= 1.3;
            for (var d = 0; d < resNum; d++)
                ships[e].cost[d] *= .92
        }
        ships[11].weight *= 1.5;
        ships[11].combatWeight *= 1.5
    },
    extraUnbonus: function() {
        for (var b = 0; b < game.ships.length; b++) {
            var e = game.ships[b].id;
            ships[e].piercing /= 1.3;
            for (var d = 0; d < resNum; d++)
                ships[e].cost[d] /= .92
        }
        ships[11].weight /= 1.5;
        ships[11].combatWeight /= 1.5
    },
    requirement: function() {
        return game.searchPlanet(planetsName.alfari)
    }
}, {
    id: "energetics",
    name: "Wahrian Energetics",
    desc: "var str =\"<span class='blue_text' style='font-size:100%;'>Luxis</span> and <span class='blue_text' style='font-size:100%;'>Siber</span> x1.3 piercing power\"; str +=\"<span class='blue_text' style='font-size:100%;'>Speed</span> of friendly ships +0.1\"; return str;",
    researchPoint: 800 * bi,
    techPoint: 2E3,
    multBonus: 2,
    mult: 3,
    pos: [2, 4],
    req: {
        secret: 1
    }
}, {
    id: "space_mining",
    name: "Space Mining",
    desc: "var str = \"\"; if (this.level == 0) str +=\"<span class='blue_text' style='font-size:100%;'>Medusa Miner</span> and <span class='blue_text' style='font-size:100%;'>Andromeda Cargo</span> ships. Each miner in a fleet will give +10% extraction bonus to the planet it orbits.\"; else str +=\"<span class='blue_text' style='font-size:100%;'>Andromeda Cargo</span> storage +8%\"; return str;",
    researchPoint: 2 * tri,
    techPoint: 5E3,
    multBonus: 2,
    mult: 3,
    pos: [2, 4],
    req: {
        secret: 1
    },
    max: 100,
    extraBonus: function() {
        0 < this.level && (ships[102].maxStorage *= 1.08)
    },
    extraUnbonus: function() {
        0 < this.level && (ships[102].maxStorage /= 1.08)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.swamp)
    }
}, {
    id: "karan_nuclear",
    name: "Karan Nuclear Physics",
    desc: "var str =\"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Caesium and Thorium</span> extraction<br>Allows <span class='blue_text' style='font-size:100%;'>Thorium Reactor, Thorium-Caesium Extractor and Karan Laboratory</span> construction\"; if (this.level <= 1) str+=\"<br>Level <span class='blue_text' style='font-size:100%;'>2</span>: <span class='blue_text' style='font-size:100%;'>Nuclear Powerplant and Pressurized Water Reactor</span> will start consuming <span class='blue_text' style='font-size:100%;'>Thorium</span><br>\";  if (this.level >= 2) str+=\"<span class='blue_text' style='font-size:100%;'>Nuclear Powerplant, Pressurized Water Reactor, </span><br>\";  if (this.level >= 1 && game.researches[researchesName.ammonia_chemistry].level >= 1) str+=\"<span class='blue_text' style='font-size:100%;'>Pressurized Ammonia Reactor and </span>\"; if (this.level >= 1) str+=\"<span class='blue_text' style='font-size:100%;'>Thorium Reactor</span>'s Energy production +5%<br><span class='blue_text' style='font-size:100%;'>Karan Laboratory</span>'s Research Points production +20%\"; return str;",
    researchPoint: 250 * bi,
    techPoint: 2E3,
    multBonus: 1.5,
    tier: 5,
    pos: [1, 4],
    req: {
        quantum: 6
    },
    buildingBonus: [{
        id: "thoriumext",
        resource: "thorium",
        value: 25,
        level: 2
    }, {
        id: "thoriumext",
        resource: "caesium",
        value: 25,
        level: 2
    }],
    extraBonus: function() {
        buildings[buildingsName.thorium_reactor].energy *= 1.05;
        buildings[buildingsName.thorium_reactor2].energy *= 1.05;
        buildings[buildingsName.pressurized_ammonia].energy *= 1.05;
        2 == this.level && (buildings[buildingsName.nuclear].resourcesProd[resourcesName.thorium.id] = -1,
        buildings[buildingsName.nuclear].resourcesNeeded[buildings[buildingsName.nuclear].resourcesNeeded.length] = resourcesName.thorium.id,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.thorium.id] = -1,
        buildings[buildingsName.pressurized].resourcesNeeded[buildings[buildingsName.pressurized].resourcesNeeded.length] = resourcesName.thorium.id,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.thorium.id] = -1,
        buildings[buildingsName.nuclear_radio].resourcesNeeded[buildings[buildingsName.nuclear_radio].resourcesNeeded.length] = resourcesName.thorium.id);
        1 < this.level && (buildings[buildingsName.karanlab].researchPoint *= 1.2,
        buildings[buildingsName.karanlab2].researchPoint *= 1.2,
        buildings[buildingsName.nuclear_radio].energy *= 1.05,
        buildings[buildingsName.nuclear].energy *= 1.05,
        buildings[buildingsName.pressurized].energy *= 1.05);
        2 < this.level && (buildings[buildingsName.nuclear].resourcesProd[resourcesName.thorium.id] *= 1.18,
        buildings[buildingsName.nuclear].resourcesProd[resourcesName.uranium.id] *= .92,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.thorium.id] *= 1.18,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.uranium.id] *= .92,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.thorium.id] *= 1.18,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.uranium.id] *= .92)
    },
    extraUnbonus: function() {
        buildings[buildingsName.thorium_reactor].energy /= 1.05;
        buildings[buildingsName.thorium_reactor2].energy /= 1.05;
        buildings[buildingsName.pressurized_ammonia].energy /= 1.05;
        2 == this.level && (buildings[buildingsName.nuclear].resourcesProd[resourcesName.thorium.id] = 0,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.thorium.id] = 0,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.thorium.id] = 0,
        delete buildings[buildingsName.nuclear].resourcesNeeded[buildings[buildingsName.nuclear].resourcesNeeded.length],
        delete buildings[buildingsName.pressurized].resourcesNeeded[buildings[buildingsName.pressurized].resourcesNeeded.length],
        delete buildings[buildingsName.nuclear_radio].resourcesNeeded[buildings[buildingsName.nuclear_radio].resourcesNeeded.length]);
        1 < this.level && (buildings[buildingsName.karanlab].researchPoint /= 1.2,
        buildings[buildingsName.karanlab2].researchPoint /= 1.2,
        buildings[buildingsName.nuclear_radio].energy /= 1.05,
        buildings[buildingsName.nuclear].energy /= 1.05,
        buildings[buildingsName.pressurized].energy /= 1.05);
        2 < this.level && (buildings[buildingsName.nuclear].resourcesProd[resourcesName.thorium.id] /= 1.18,
        buildings[buildingsName.nuclear].resourcesProd[resourcesName.uranium.id] /= .92,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.thorium.id] /= 1.18,
        buildings[buildingsName.pressurized].resourcesProd[resourcesName.uranium.id] /= .92,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.thorium.id] /= 1.18,
        buildings[buildingsName.nuclear_radio].resourcesProd[resourcesName.uranium.id] /= .92)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.xeno)
    }
}, {
    id: "time_eng",
    name: "Time Engineering",
    desc: "var str =\"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Caesium and Thorium</span> extraction<br>Allows <span class='blue_text' style='font-size:100%;'>Thorium Reactor, </span> construction\"; if (this.level >= 1) str+=\"<br><span class='blue_text' style='font-size:100%;'>Thorium Reactor</span>'s Hydrogen consumption -5%\"; return str;",
    researchPoint: 800 * bi,
    techPoint: 100,
    multBonus: 1.5,
    tier: 5,
    pos: [2, 5],
    req: {
        energetics: 2
    }
}, {
    id: "ammonia_chemistry",
    name: "Nitrogen Chemistry",
    desc: "var str =\"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Ammonia extraction</span> extraction<br>Allows <span class='blue_text' style='font-size:100%;'>Ammonia Airship, Ammonia Refrigerator, Ammonia Electrolyzer and Pressurized Ammonia Reactor</span> construction\"; if (this.level >= 1) str+=\"<span class='blue_text' style='font-size:100%;'>Ammonia Airship</span>'s Research Points production +12%\"; if (this.level <= 5) str+= \"<br>Level<span class='blue_text' style='font-size:100%;'>5</span>: Allows <span class='blue_text' style='font-size:100%;'>Bacterial Bioreactor</span> construction\"; return str;",
    researchPoint: 600 * bi,
    techPoint: 1E3,
    multBonus: 1.5,
    tier: 5,
    pos: [4, 4],
    req: {
        environment: 20
    },
    buildingBonus: [{
        id: "ammonia_ext",
        resource: "ammonia",
        value: 25,
        level: 2
    }, {
        id: "ammonia_refrigerator",
        resource: "coolant",
        value: 25,
        level: 2
    }, {
        id: "ammonia_electro",
        resource: "ammonia",
        value: 25,
        level: 2
    }, {
        id: "ammonia_electro",
        resource: "hydrogen",
        value: 25,
        level: 2
    }],
    extraBonus: function() {
        buildings[buildingsName.ammonia_airship].researchPoint *= 1.12
    },
    extraUnbonus: function() {
        buildings[buildingsName.ammonia_airship].researchPoint /= 1.12
    },
    requirement: function() {
        return game.searchPlanet(planetsName.auriga)
    }
}, {
    id: "demographics",
    name: "Demographics",
    desc: "var str =\"\"; if (this.level == 0) str+= \"Allows <span class='blue_text' style='font-size:100%;'>Residential Complex and Human Aquarium</span> construction\"; if (this.level >= 1) str+=\"<br><span class='blue_text' style='font-size:100%;'>Habitable Space</span> of residential buildings +25%\";if (this.level <= 5) str += \"<br>Level <span class='blue_text' style='font-size:100%;'>5</span>: Allows <span class='blue_text' style='font-size:100%;'>Orbital Colony</span> construction\"; if (this.level <= 10) str += \"<br>Level <span class='blue_text' style='font-size:100%;'>10</span>: Allows <span class='blue_text' style='font-size:100%;'>Clonation Center</span> construction\"; return str;",
    researchPoint: 5E4,
    techPoint: 100,
    multBonus: 1.35,
    tier: 1,
    pos: [2, 0],
    req: {
        science: 1
    },
    extraBonus: function() {
        1 < this.level && (buildings[buildingsName.residential].habitableSpace *= 1.25);
        1 < this.level && (buildings[buildingsName.aquarium].habitableSpace *= 1.25);
        5 < this.level && (buildings[buildingsName.floathaus].habitableSpace *= 1.25)
    },
    extraUnbonus: function() {
        1 < this.level && (buildings[buildingsName.residential].habitableSpace /= 1.25);
        1 < this.level && (buildings[buildingsName.aquarium].habitableSpace /= 1.25);
        5 < this.level && (buildings[buildingsName.floathaus].habitableSpace /= 1.25)
    },
    requirement: function() {
        return gameSettings.populationEnabled
    }
}, {
    id: "protohalean_science",
    name: "Protohalean Science",
    desc: "var str =\"\"; if (this.level == 0) {str+= \"Allows construction of <span class='blue_text' style='font-size:100%;'>Munya</span> ship\";str+= \"Allows production of <span class='blue_text' style='font-size:100%;'>Qasers</span>\";}; if (this.level <= 1) {str+= \"<br><span class='blue_text' style='font-size:100%;'>Level 2: </span>Allows construction of <span class='blue_text' style='font-size:100%;'>Superfluids Center</span>\";};if (this.level >= 2) {str+= \"<br><span class='blue_text' style='font-size:100%;'>Superfluids Center</span>'s Research Points production +25%\";}; if (this.level <= 4) {str+= \"<br><span class='blue_text' style='font-size:100%;'>Level 5: </span>Allows construction of <span class='blue_text' style='font-size:100%;'>Shield Assembler</span>\";} str += \"<br>All ships with laser weapons <span class='blue_text' style='font-size:100%;'>-80%</span> power<br>Munya's power and HPs <span class='blue_text' style='font-size:100%;'>+20%</span>\"; return str;",
    researchPoint: 5 * tri,
    techPoint: 1E6,
    multBonus: 2,
    tier: 6,
    pos: [1, 5],
    req: {
        karan_nuclear: 20
    },
    buildingBonus: [{
        id: "qasers_assembler",
        resource: "qasers",
        value: 12,
        level: 1
    }, {
        id: "shield_assembler",
        resource: "shield capsule",
        value: 12,
        level: 5
    }],
    extraBonus: function() {
        for (var b = 0; b < game.ships.length; b++) {
            var e = game.ships[b].id;
            "laser" == ships[e].weapon && (ships[e].power *= .2)
        }
        ships[shipsName.Munya].hp *= 1.2;
        ships[shipsName.Munya].power *= 1.2;
        2 < this.level && (buildings[buildingsName.superfluids_center].researchPoint *= 1.25)
    },
    extraUnbonus: function() {
        for (var b = 0; b < game.ships.length; b++) {
            var e = game.ships[b].id;
            "laser" == ships[e].weapon && (ships[e].power /= .2)
        }
        ships[shipsName.Munya].hp /= 1.2;
        ships[shipsName.Munya].power /= 1.2;
        2 < this.level && (buildings[buildingsName.superfluids_center].researchPoint /= 1.25)
    },
    requirement: function() {
        return game.searchPlanet(planetsName.asun) || quests[questNames.juini_3].done
    }
}, {
    id: "mk_tech",
    name: "Metallokopta's Tech",
    desc: "var str =\"\"; if (this.level == 0) {str+= \"Allows construction of <span class='blue_text' style='font-size:100%;'>Munya</span> ship\";str+= \"Allows production of <span class='blue_text' style='font-size:100%;'>Qasers</span>\";} str += \"<br>All ships with laser weapons <span class='blue_text' style='font-size:100%;'>-80%</span> power\"; return str;",
    researchPoint: 500 * tri,
    techPoint: 15E5,
    multBonus: 2,
    tier: 6,
    pos: [3, 5],
    req: {
        osmium: 50,
        darkmatter_science: 2
    }
}, {
    id: "darkmatter_science",
    name: "Darkmatter Science",
    desc: "var str =\"\"; if (this.level == 0) {str+= \"Allows production of <span class='blue_text' style='font-size:100%;'>Dark Matter</span>\";} if (this.level >= 1) {str+= \"Reduces dark matter warp cost of <span class='blue_text' style='font-size:100%;'>Space Gate Gamma and Space Gate Delta</span>\";} return str;",
    researchPoint: 150 * tri,
    techPoint: 1E7,
    multBonus: 2,
    tier: 6,
    pos: [2, 5],
    req: {
        protohalean_science: 1
    },
    buildingBonus: [{
        id: "darkmatter_refiner",
        resource: "dark matter",
        value: 25,
        level: 1
    }],
    requirement: function() {
        return quests[questNames.seal_7].done || quests[questNames.juini_5].done
    }
}, {
    id: "xiran_artofwar",
    name: "Xiran Art of War",
    desc: "var str =\"\"; if (this.level == 0) {str += \"<div class='white_text mt-2 row gx-2'><div class='col'>Level 1</div><div class='col-auto'><span class='blue_text'>Xirandrium</span>, <span class='blue_text'>Explosives</span></div></div>\" ;} if (this.level < 2) {str+= \"<div class='white_text row gx-2'><div class='col'>Level 2</div><div class='col-auto'><span class='blue_text'>Ballistic Artillery</span></div></div>\";}if (this.level < 3) {str+= \"<div class='white_text row gx-2'><div class='col'>Level 3</div><div class='col-auto'><span class='blue_text'>Laser Artillery</span></div></div>\";}  if (this.level < 8) {str+= \"<div class='white_text row gx-2'><div class='col'>Level 8</div><div class='col-auto'><span class='blue_text'>Planetary Cannons</span></div></div>\";} return str;",
    researchPoint: 150 * tri,
    techPoint: 1E7,
    multBonus: 2,
    tier: 5,
    pos: [0, 4],
    req: {
        karan_artofwar: 13
    },
    buildingBonus: [{
        id: "xiran_foundry",
        resource: "xirandrium",
        value: 12,
        level: 1
    }, {
        id: "explosives_factory",
        resource: "explosives",
        value: 12,
        level: 1
    }, {
        id: "battery_factory",
        resource: "empty battery",
        value: 12,
        level: 1
    }, {
        id: "battery_charger",
        cost: "steel",
        value: -25,
        level: 1
    }, {
        id: "battery_charger",
        cost: "titanium",
        value: -25,
        level: 1
    }, {
        id: "battery_charger",
        cost: "plastic",
        value: -25,
        level: 1
    }, {
        id: "battery_plant",
        cost: "titanium",
        value: -25,
        level: 1
    }, {
        id: "battery_plant",
        cost: "plastic",
        value: -25,
        level: 1
    }, {
        id: "battery_plant",
        cost: "circuit",
        value: -25,
        level: 1
    }],
    requirement: function() {
        return game.searchPlanet(planetsName.xirandrus)
    }
}]
  , governmentList = {
    "No Government": {
        description: "<span class='green_text'>No bonus, </span><span class='red_text'>No malus</span>",
        bonus: function() {},
        unbonus: function() {}
    },
    "Military Dictatorship": {
        description: "<span class='green_text'>All military production +20%, </span><span class='red_text'>Research points production -20%</span>",
        bonus: function() {
            buildings[buildingsName.amno].resourcesProd[resourcesName.ammunition.id] *= 1.2;
            buildings[buildingsName.ufact].resourcesProd[resourcesName["u-ammunition"].id] *= 1.2;
            buildings[buildingsName.tfact].resourcesProd[resourcesName["t-ammunition"].id] *= 1.2;
            buildings[buildingsName.armorfact].resourcesProd[resourcesName.armor.id] *= 1.2;
            buildings[buildingsName.enginefact].resourcesProd[resourcesName.engine.id] *= 1.2;
            buildings[buildingsName.shield_assembler].resourcesProd[resourcesName["shield capsule"].id] *= 1.2;
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint /= 1.2
        },
        unbonus: function() {
            buildings[buildingsName.amno].resourcesProd[resourcesName.ammunition.id] /= 1.2;
            buildings[buildingsName.ufact].resourcesProd[resourcesName["u-ammunition"].id] /= 1.2;
            buildings[buildingsName.tfact].resourcesProd[resourcesName["t-ammunition"].id] /= 1.2;
            buildings[buildingsName.armorfact].resourcesProd[resourcesName.armor.id] /= 1.2;
            buildings[buildingsName.enginefact].resourcesProd[resourcesName.engine.id] /= 1.2;
            buildings[buildingsName.shield_assembler].resourcesProd[resourcesName["shield capsule"].id] /= 1.2;
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint *= 1.2
        }
    },
    "Environmental Republic": {
        description: "<span class='green_text'>Biomass related buildings production +100%, Terrestrial planets production +100%, </span><span class='red_text'>Nuclear and fuel energy production -20%</span>",
        bonus: function() {
            buildings[buildingsName.fish].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.hunting].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.serra].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.floathouse].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.fuel.id] *= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.oil.id] *= 2;
            buildings[buildingsName.bioplastic].resourcesProd[resourcesName.plastic.id] *= 2;
            buildings[buildingsName.bioengineering].researchPoint *= 2;
            buildings[buildingsName.generator].energy *= .8;
            buildings[buildingsName.floatgenerator].energy *= .8;
            buildings[buildingsName.thermal].energy *= .8;
            buildings[buildingsName.nuclear].energy *= .8;
            buildings[buildingsName.nuclear_radio].energy *= .8;
            buildings[buildingsName.bacterial_bioreactor].energy *= 2
        },
        unbonus: function() {
            buildings[buildingsName.fish].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.hunting].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.serra].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.floathouse].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.fuel.id] /= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.oil.id] /= 2;
            buildings[buildingsName.bioplastic].resourcesProd[resourcesName.plastic.id] /= 2;
            buildings[buildingsName.bioengineering].researchPoint /= 2;
            buildings[buildingsName.generator].energy /= .8;
            buildings[buildingsName.floatgenerator].energy /= .8;
            buildings[buildingsName.thermal].energy /= .8;
            buildings[buildingsName.nuclear].energy /= .8;
            buildings[buildingsName.nuclear_radio].energy /= .8;
            buildings[buildingsName.bacterial_bioreactor].energy /= 2
        }
    },
    "Quorum Sensing": {
        description: "<span class='green_text'>Re-engineered servants costs -25%, </span><span class='red_text'>All other ships costs +25%</span>",
        bonus: function() {
            for (var b = 0; b < game.ships.length; b++) {
                var e = game.ships[b].id
                  , d = 1.25;
                54 == e && (d = .75);
                for (var f = 0; f < resNum; f++)
                    ships[e].cost[f] *= d
            }
        },
        unbonus: function() {
            for (var b = 0; b < game.ships.length; b++) {
                var e = game.ships[b].id
                  , d = 1.25;
                54 == e && (d = .75);
                for (var f = 0; f < resNum; f++)
                    ships[e].cost[f] /= d
            }
        }
    },
    "Technocratic Republic": {
        description: "<span class='green_text'>Research points per seconds +15%, </span><span class='red_text'>All ships costs +15%</span>",
        bonus: function() {
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint *= 1.15;
            for (b = 0; b < game.ships.length; b++)
                for (var e = game.ships[b].id, d = 0; d < resNum; d++)
                    ships[e].cost[d] *= 1.15
        },
        unbonus: function() {
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint /= 1.15;
            for (b = 0; b < game.ships.length; b++)
                for (var e = game.ships[b].id, d = 0; d < resNum; d++)
                    ships[e].cost[d] /= 1.15
        }
    },
    "Military Federation": {
        description: "<span class='green_text'>All military production +50%, </span><span class='red_text'>Research points production -50%</span>",
        bonus: function() {
            buildings[buildingsName.amno].resourcesProd[resourcesName.ammunition.id] *= 1.5;
            buildings[buildingsName.ufact].resourcesProd[resourcesName["u-ammunition"].id] *= 1.5;
            buildings[buildingsName.tfact].resourcesProd[resourcesName["t-ammunition"].id] *= 1.5;
            buildings[buildingsName.armorfact].resourcesProd[resourcesName.armor.id] *= 1.5;
            buildings[buildingsName.enginefact].resourcesProd[resourcesName.engine.id] *= 1.5;
            buildings[buildingsName.shield_assembler].resourcesProd[resourcesName["shield capsule"].id] *= 1.5;
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint /= 1.5
        },
        unbonus: function() {
            buildings[buildingsName.amno].resourcesProd[resourcesName.ammunition.id] /= 1.5;
            buildings[buildingsName.ufact].resourcesProd[resourcesName["u-ammunition"].id] /= 1.5;
            buildings[buildingsName.tfact].resourcesProd[resourcesName["t-ammunition"].id] /= 1.5;
            buildings[buildingsName.armorfact].resourcesProd[resourcesName.armor.id] /= 1.5;
            buildings[buildingsName.enginefact].resourcesProd[resourcesName.engine.id] /= 1.5;
            buildings[buildingsName.shield_assembler].resourcesProd[resourcesName["shield capsule"].id] /= 1.5;
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint *= 1.5
        }
    },
    "Robotic Collectivism": {
        description: "<span class='green_text'>Electronics related production +100%, </span><span class='red_text'>Biomass related production -50%</span>",
        bonus: function() {
            buildings[buildingsName.robotfact].resourcesProd[resourcesName.robots.id] *= 2;
            buildings[buildingsName.electronic].resourcesProd[resourcesName.circuit.id] *= 2;
            buildings[buildingsName.superconductor_factory].resourcesProd[resourcesName.superconductors.id] *= 2;
            buildings[buildingsName.battery_factory].resourcesProd[resourcesName["empty battery"].id] *= 2;
            buildings[buildingsName.mcell_factory].resourcesProd[resourcesName["meissner cell"].id] *= 2;
            buildings[buildingsName.fish].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.hunting].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.serra].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.floathouse].resourcesProd[resourcesName.biomass.id] /= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.fuel.id] /= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.oil.id] /= 2;
            buildings[buildingsName.bioplastic].resourcesProd[resourcesName.plastic.id] /= 2;
            buildings[buildingsName.bioengineering].researchPoint /= 2;
            buildings[buildingsName.bacterial_bioreactor].energy /= 2
        },
        unbonus: function() {
            buildings[buildingsName.robotfact].resourcesProd[resourcesName.robots.id] /= 2;
            buildings[buildingsName.electronic].resourcesProd[resourcesName.circuit.id] /= 2;
            buildings[buildingsName.superconductor_factory].resourcesProd[resourcesName.superconductors.id] /= 2;
            buildings[buildingsName.battery_factory].resourcesProd[resourcesName["empty battery"].id] /= 2;
            buildings[buildingsName.mcell_factory].resourcesProd[resourcesName["meissner cell"].id] /= 2;
            buildings[buildingsName.fish].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.hunting].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.serra].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.algaefarm].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.floathouse].resourcesProd[resourcesName.biomass.id] *= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.fuel.id] *= 2;
            buildings[buildingsName.biofuel].resourcesProd[resourcesName.oil.id] *= 2;
            buildings[buildingsName.bioplastic].resourcesProd[resourcesName.plastic.id] *= 2;
            buildings[buildingsName.bioengineering].researchPoint *= 2;
            buildings[buildingsName.bacterial_bioreactor].energy *= 2
        }
    },
    Anarchy: {
        description: "<span class='green_text'>Resources from raids +100%, </span><span class='red_text'>All productions -20%</span>",
        bonus: function() {
            for (var b = 0; b < buildings.length; b++)
                for (var e = 0; e < resNum; e++)
                    0 < buildings[b].resourcesProd[e] && (buildings[b].resourcesProd[e] *= .8)
        },
        unbonus: function() {
            for (var b = 0; b < buildings.length; b++)
                for (var e = 0; e < resNum; e++)
                    0 < buildings[b].resourcesProd[e] && (buildings[b].resourcesProd[e] /= .8)
        },
        questUnlock: "pirates_4"
    },
    "Merchant Federation": {
        description: "<span class='green_text'>Market max stocks +100%</span>",
        bonus: function() {},
        unbonus: function() {
            for (var b = 0; b < resNum; b++)
                market.stock[b] = Math.min(market.stock[b], market.getMaxStock(b))
        }
    },
    Empire: {
        description: "<span class='green_text'>Fleet power increased of 1% for each 10000 Influence, </span><span class='red_text'>All ships costs +25%</span>",
        bonus: function() {
            for (var b = 0; b < game.ships.length; b++)
                for (var e = game.ships[b].id, d = 0; d < resNum; d++)
                    ships[e].cost[d] *= 1.25
        },
        unbonus: function() {
            for (var b = 0; b < game.ships.length; b++)
                for (var e = game.ships[b].id, d = 0; d < resNum; d++)
                    ships[e].cost[d] /= 1.25
        },
        questUnlockOr: "traum_7"
    },
    "Tribal Rule": {
        description: "<span class='green_text'>Fleet power is increased by 400%/(1+number of ship)+100%/log10(1+number of ships), </span><span class='red_text'>Chance for planets to rebel</span>",
        bonus: function() {},
        unbonus: function() {}
    },
    "Mining Corporation": {
        description: "<span class='green_text'>Miner ships effect +100%, </span><span class='red_text'>Research points production -50%</span>",
        bonus: function() {
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint /= 1.5
        },
        unbonus: function() {
            for (var b = 0; b < buildings.length; b++)
                buildings[b].researchPoint *= 1.5
        }
    },
    "Merchant Republic": {
        description: "<span class='green_text'>Allows access to the market to Pirates allies</span><span class='red_text'>All productions -50%</span>",
        bonus: function() {},
        unbonus: function() {}
    }
}
  , questsDefinition = [{
    id: "city_0",
    name: "[Bounty] Destroy Pirates of Antirion",
    description: "The pirates of Antirion have infested this sector of the galaxy for too long. The time of their punishment has come.",
    repReward: 50,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Antirion</span>",
    resources: {},
    check: function() {
        return game.searchPlanet(planetsName.uanass)
    }
}, {
    id: "city_1",
    name: "[Resource Request] Water Shortage",
    description: "The City's natural stock of water and ice is almost extinguished. We will be immensely grateful toward any external help.",
    repReward: 50,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    questRequired: ["city_0"],
    planet: planetsName.mexager,
    resources: {
        water: 1E5
    }
}, {
    id: "city_2",
    name: "[Resource Request] Hydrogen Shortage",
    description: "The City's energy industry is collapsing due to recent shortages of resources. We will be immensely grateful toward any external help.",
    repReward: 100,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    questRequired: ["city_1"],
    planet: planetsName.mexager,
    resources: {
        hydrogen: 25E4
    }
}, {
    id: "city_3",
    name: "[Resource Request] Titanium Shortage",
    description: "The City is slowly recovering thanks to your help. Help us to upgrade our production lines with a donation of titanium.",
    repReward: 100,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    questRequired: ["city_2"],
    planet: planetsName.mexager,
    resources: {
        titanium: 5E5
    }
}, {
    id: "city_4",
    name: "[Resource Request] Plastic Shortage",
    description: "The City is strengthening its fleet. A donation of plastic could help The City to become once again the military power it was before. We will give you a relic of our old empire in exchange for this service.",
    goal: {
        type: "res",
        res: {
            id: "hydrogen",
            value: 1E5
        },
        planet: planetsName.mexager
    },
    repReward: 195,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    questRequired: ["city_3"],
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.thoroid].name + "</span><span class='white_text'> artifact,</span><span class='red_text'> The City gains a new Fleet</span>",
    planet: planetsName.mexager,
    resources: {
        plastic: 1E5
    },
    bonusReward: function() {
        artifacts[artifactsName.thoroid].collect();
        var b = new Fleet(1,"Moon Shatterer");
        b.ships[3] = 150;
        b.ships[4] = 80;
        b.ships[5] = 50;
        b.ships[8] = 20;
        b.ships[15] = 5;
        b.ships[16] = 2;
        b.exp = 6;
        planets[planetsName.mexager].fleetPush(b)
    }
}, {
    id: "city_5",
    name: "[Diplomatic Mission] Meeting with Queen Ramona",
    description: "The Crimson Queen herself wants to make you an offer of frendship. But be aware, enemies of The City will start to look at you under a new darker light.",
    repReward: 5,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "<span class='blue_text'>Ammunition</span><span class='white_text'> available in the market, </span><span class='red_text'>-500</span><span class='white_text'> reputation points with </span><span class='blue_text'>Fallen Human Empire</span>",
    questRequired: ["city_4"],
    planet: planetsName.mexager,
    resources: {
        hydrogen: 25E4
    },
    bonusReward: function() {
        setRep(game.id, civisNameDef.traum, game.reputation[civisNameDef.traum] - 500)
    }
}, {
    id: "city_6",
    name: "[Investigation] Destruction of La Concord",
    description: "A war fleet of The City has been lost during a flyby of the planet Acanthus. Please research Interstellar Travel to level 5 and investigate.",
    repReward: 100,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "",
    questRequired: ["city_5"],
    objective: "<span class='white_text'>Investigate</span><span class='blue_text'> Acanthus</span>",
    planet: planetsName.mexager,
    check: function() {
        return places[placesNames.concord].done
    }
}, {
    id: "city_6b",
    name: "[Investigation] Truth about the pirates",
    description: "As you reported no debris around Acanthus, we sent a stealth ship to the nearby systems. It came back with bad news: a new pirate outpost has been found and our hijacked fleet is there! You must learn the truth about them.",
    repReward: 100,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "",
    objective: "<span class='white_text'>Investigate</span><span class='blue_text'> New Babilo</span>",
    questRequired: ["city_6"],
    planet: planetsName.mexager,
    check: function() {
        return places[placesNames.orion_library_pir].done
    }
}, {
    id: "city_7",
    name: "[Diplomacy] Pardons for the pirates",
    description: "Please research Interstellar Travel to level 7 and talk pirates into surrender.",
    repReward: 100,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "",
    objective: "<span class='white_text'>Offer pardons to the pirates of</span><span class='blue_text'> Lone Nassaus</span>",
    questRequired: ["city_6b"],
    planet: planetsName.mexager,
    check: function() {
        return places[placesNames.pardons].done
    }
}, {
    id: "city_8",
    name: "[Bounty] Queen Ramona's Revenge",
    description: "Those filthy pirates have refused our pardons? Bring them destruction!",
    repReward: 699,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "<span class='red_text'> The City gains a new Fleet</span>",
    questRequired: ["city_7"],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Lone Nassaus</span>",
    check: function() {
        return game.searchPlanet(planetsName.nassaus)
    },
    bonusReward: function() {
        var b = new Fleet(1,"La Concord");
        b.ships[16] = 5E3;
        b.ships[104] = 1;
        planets[planetsName.mexager].fleetPush(b)
    }
}, {
    id: "city_9",
    name: "[Bounty] Times are changing for Queen Ramona",
    description: "Many blame me for what my ancestors did. I am branded like those other filthy beasts. I don't want them to ruin MY legacy. Please help me free myself from the chains of The City's Council. There will be a secret orbital meeting between them and a guerrila group of Traumland, destroy their fleet so that they can't come back.",
    repReward: 1200,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "",
    questRequired: ["city_8"],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Destroy the council fleet La Concord on</span><span class='blue_text'> The City</span>",
    check: function() {
        return !planets[planetsName.mexager].searchFleetByName("La Concord")
    },
    bonusReward: function() {
        var b = new Fleet(civisNameDef.rebels,"Rache");
        b.ships[16] = 1E4;
        b.ships[104] = 3;
        planets[planetsName.lagea].fleetPush(b)
    }
}, {
    id: "city_10",
    name: "[Bounty] Winds of vengeance",
    description: "Our sources were fake. The meeting took place on Traumland! The council is assembling a fleet to come back and destroy us. Stop them!",
    repReward: 200,
    repNeeded: -1E3,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    questRequired: ["city_9"],
    planet: planetsName.mexager,
    bonusDescription: "<span class='white_text'>You will side with Queen Ramona</span>",
    objective: "<span class='white_text'>Destroy the council fleet on</span><span class='blue_text'> Traumland</span>",
    bonusRequirement: function() {
        return !quests[questNames.city_11].done
    },
    check: function() {
        return !planets[planetsName.lagea].searchFleetByName("Rache")
    },
    bonusReward: function() {
        artifacts[artifactsName.crown].collect()
    }
}, {
    id: "city_13",
    name: "[Diplomacy] The day of Victory",
    description: "Thank you for your help. I don't think I will need this crown anymore, my people will have the freedom to choose their own ruler, maybe they will even choose you.",
    repReward: 200,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.crown].name + "</span><span class='white_text'> artifact,</span>",
    questRequired: ["city_10"],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Nothing</span>",
    check: function() {
        return !quests[questNames.city_11].done
    },
    bonusReward: function() {
        artifacts[artifactsName.crown].collect()
    }
}, {
    id: "city_11",
    name: "[Diplomacy] Queen Ramona's Secret Plans",
    description: "[Incoming trasmission from Traumland] - Have you lost your mind? Don't let that snake control you, think about what you are doing! She will sacrifice you without mercy in order to pursue that childish quest for her dreams' world. Side with use and take this message to Ramona.",
    repReward: 200,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "<span class='blue_text'>You will side up with The Council and Queen Ramona will die</span>",
    questRequired: ["city_9"],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Bring the message to </span><span class='blue_text'>The City</span>",
    bonusRequirement: function() {
        return !quests[questNames.city_10].done
    },
    check: function() {
        return planets[planetsName.lagea].searchFleetByName("Rache") && places[placesNames.ramona_throne].done
    }
}, {
    id: "city_12",
    name: "[Diplomacy] Never take the new way",
    description: "The council is glad that you came to your senses. Our triumphant fleet shall return on The City. We are proud to make you the sixth member of The City's Council!",
    repReward: 2E3,
    provider: civisNameDef.city,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda],
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.scepter].name + "</span><span class='white_text'> artifact,</span>",
    questRequired: ["city_11"],
    planet: planetsName.mexager,
    objective: "<span class='white_text'>Nothing</span>",
    check: function() {
        return !0
    },
    bonusReward: function() {
        artifacts[artifactsName.scepter].collect();
        var b = planets[planetsName.lagea].searchFleetByName2("Rache", planets[planetsName.lagea].fleets);
        b.found && (planets[planetsName.mexager].fleetPush(planets[planetsName.lagea].fleets[b.id]),
        planets[planetsName.lagea].fleets[b.id].civis = civisNameDef.city,
        delete planets[planetsName.lagea].fleets[b.id])
    }
}, {
    id: "pirates_1",
    name: "[Investigation] The Truth about The Bloody City",
    description: "Your ally is not what it seems to be. They are control freaks, renegades exhiled by their own people because of their madness. Go to New Babilo's library if you want to learn more.",
    repReward: 100,
    provider: civisNameDef.pirates,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.arcadia],
    planet: planetsName.nassaus,
    objective: "<span class='white_text'>Investigate</span><span class='blue_text'> New Babilo</span>",
    bonusRequirement: function() {
        return places[placesNames.pardons].done
    },
    check: function() {
        return places[placesNames.orion_library].done
    }
}, {
    id: "pirates_2",
    name: "[Bounty] Spill The City's Blood",
    description: "The Bloody City was built upon our red oil, we will beat it at its own game.",
    repReward: 900,
    provider: civisNameDef.pirates,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.arcadia],
    questRequired: ["pirates_1"],
    planet: planetsName.nassaus,
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> The City</span>",
    check: function() {
        return game.searchPlanet(planetsName.mexager)
    }
}, {
    id: "pirates_3",
    name: "[Bounty] Traitor League",
    description: "The Orion League is a corrupted assembly of Quris merchants. All they want is to control us to do their dirty business. They must fall.",
    repReward: 100,
    provider: civisNameDef.pirates,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.arcadia],
    questRequired: ["pirates_2"],
    planet: planetsName.nassaus,
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Ishtar Gate</span>",
    check: function() {
        return game.searchPlanet(planetsName.santorini)
    }
}, {
    id: "pirates_4",
    name: "[Bounty] Chant down Babylon",
    description: "And now, for the gran finale, take New Babilo and you shall be forever remembered as our comrade.",
    repReward: 201,
    provider: civisNameDef.pirates,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.arcadia],
    questRequired: ["pirates_3"],
    bonusDescription: "<span class='white_text'> A reward fleet will be delivered on </span><span class='blue_text'>your capital</span><span class='white_text'>, Raids will be unlocked<span class='red_text'>, you will be permanently banned from the Market</span>",
    planet: planetsName.nassaus,
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> New Babilo</span>",
    check: function() {
        return game.searchPlanet(planetsName.virgo)
    },
    bonusReward: function() {
        var b = new Fleet(0,"Hijacked Fleet");
        b.ships[97] = 1;
        b.ships[98] = 1;
        b.ships[99] = 1;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "quris_1",
    name: "[Tournament] Apprentice",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge? You will gain points by fighting fleets in the tournament",
    provider: -1,
    objective: "<span class='white_text'>Reach 2 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'> 10M </span><span class='blue_text'>Ammunition</span>",
    repReward: 10,
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    bonusRequirement: function() {
        return 6 > game.researches[3].level ? !1 : !0
    },
    check: function() {
        return 1 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        planets[game.capital].resources[resourcesName.ammunition.id] += 10 * mi
    }
}, {
    id: "quris_2",
    name: "[Tournament] Senior",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 3 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'> 50M </span><span class='blue_text'>Ammunition</span>",
    repReward: 20,
    questRequired: ["quris_1"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 2 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        planets[game.capital].resources[resourcesName.ammunition.id] += 50 * mi
    }
}, {
    id: "quris_3",
    name: "[Tournament] Master",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 5 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'> 1 </span><span class='blue_text'>" + shipsDefinition[34].name + "</span><span class='white_text'> ship, </span><span class='blue_text'>Quris Art of War</span><span class='white_text'> research</span>",
    repReward: 40,
    questRequired: ["quris_2"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 4 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        var b = new Fleet(0,"Master Reward");
        b.ships[97] = 1;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "quris_4",
    name: "[Tournament] Officer",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 8 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'> 100M </span><span class='blue_text'>Ammunition</span>",
    repReward: 80,
    questRequired: ["quris_3"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 7 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        planets[game.capital].resources[resourcesName.ammunition.id] += 100 * mi
    }
}, {
    id: "quris_5",
    name: "[Tournament] Lieutenant",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 16 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'> 5 </span><span class='blue_text'>" + shipsDefinition[34].name + "</span><span class='white_text'> ship</span>",
    repReward: 160,
    questRequired: ["quris_4"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 15 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        var b = new Fleet(0,"Lieutenant Reward");
        b.ships[97] = 5;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "quris_6",
    name: "[Tournament] Commander",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 32 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.quris_value].name + "</span><span class='white_text'> artifact, 10 </span><span class='blue_text'>" + shipsDefinition[35].name + "</span><span class='white_text'> ship</span>",
    repReward: 320,
    questRequired: ["quris_5"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 31 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        artifacts[artifactsName.quris_value].collect();
        var b = new Fleet(0,"Commander Reward");
        b.ships[98] = 10;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "quris_7",
    name: "[Tournament] Captain",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 64 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='white_text'>Captain Seris</span><span class='blue_text'> will join your ranks</span><span class='white_text'>, 200 </span><span class='blue_text'>" + shipsDefinition[36].name + "</span><span class='white_text'> ship</span>",
    repReward: 640,
    questRequired: ["quris_6"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 63 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        var b = new Fleet(0,"Captain Reward");
        b.ships[99] = 200;
        planets[game.capital].fleetPush(b);
        characters[charactersName.quris2].unlocked = !0
    }
}, {
    id: "quris_8",
    name: "[Tournament] Commodore",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 128 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.quris_honor].name + "</span><span class='white_text'> artifact, 5M </span><span class='blue_text'>" + shipsDefinition[37].name + "</span><span class='white_text'> ship</span>",
    repReward: 1280,
    questRequired: ["quris_7"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 127 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        artifacts[artifactsName.quris_honor].collect();
        var b = new Fleet(0,"Commodore Reward");
        b.ships[100] = 5E6;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "quris_9",
    name: "[Tournament] Admiral",
    description: "Many seek glory in the Space Tournament but few succeed, are you up to the challenge?",
    provider: -1,
    objective: "<span class='white_text'>Reach 192 battle points in </span><span class='blue_text'>Space Tournament</span>",
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.quris_glory].name + "</span><span class='white_text'> artifact, 1B </span><span class='blue_text'>" + shipsDefinition[38].name + "</span><span class='white_text'> ship</span>",
    repReward: 2450,
    questRequired: ["quris_8"],
    civisSupported: [civisNameDef.player, civisNameDef.traumland, civisNameDef.orion, civisNameDef.zelera, civisNameDef.tataridu],
    check: function() {
        return 191 <= qurisTournament.points ? !0 : !1
    },
    bonusReward: function() {
        artifacts[artifactsName.quris_glory].collect();
        var b = new Fleet(0,"Admiral Reward");
        b.ships[101] = 1E9;
        planets[game.capital].fleetPush(b)
    }
}, {
    id: "distress_epsilon",
    name: "[Investigation] Distress Call",
    description: "The pillar earth working as an antenna has captured a distress signal from the surface of Epsilon Rutheni. Go investigate.",
    provider: -1,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.halean, civisNameDef.phantids],
    planet: planetsName.epsilon,
    objective: "<span class='white_text'>Investigate </span><span class='blue_text'>Epsilon Rutheni</span>",
    resources: {},
    check: function() {
        return places[placesNames.karmgr].done
    },
    bonusRequirement: function() {
        return artifacts[artifactsName.pillar_earth].possessed && game.searchPlanet(planetsName.epsilon) && game.searchPlanet(planetsName.zhura) && game.searchPlanet(planetsName.bhara) && !1
    }
}, {
    id: "distress_epsilon2",
    name: "A pact with the devil",
    description: "By accepting this pact, Karmgr will become the ruler of Epsilon Rutheni, Zhura Nova and Bharash. You will lose control of the planets and in exchange he will be your ally. He will also grant you the location of the shipwreck of the human capital ship Koroleva.",
    provider: -1,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.halean, civisNameDef.phantids],
    questRequired: ["distress_epsilon"],
    planet: planetsName.epsilon,
    objective: "<span class='white_text'>Accept the offer of </span><span class='blue_text'>Karmgr</span>",
    resources: {},
    check: function() {
        return places[placesNames.karmgr].done
    },
    bonusReward: function() {
        game.removePlanet(planetsName.epsilon);
        game.removePlanet(planetsName.zhura);
        game.removePlanet(planetsName.bhara);
        planets[planetsName.epsilon].civis = civisNameDef.ruthenians;
        planets[planetsName.zhura].civis = civisNameDef.ruthenians;
        planets[planetsName.bhara].civis = civisNameDef.ruthenians;
        civis[civisNameDef.ruthenians].pushPlanet(planetsName.epsilon);
        civis[civisNameDef.ruthenians].pushPlanet(planetsName.zhura);
        civis[civisNameDef.ruthenians].pushPlanet(planetsName.bhara);
        setRep(game.id, civisNameDef.ruthenians, repLevel.allied.min);
        civis[civisNameDef.ruthenians].lost = !1
    }
}, {
    id: "seal_0",
    name: "[Retrieval] The tower of silence",
    description: "An old legend says that at the beginning of time two children were born: the dark lord and his enlightened sister. One made the darkness, and the other made the light. One made the life, and the other made the death. An eternal conflict that sees no end. We must ensure that the dark forces shall prevail. When you will be ready, the tower of silence will show itself to you.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    objective: "<span class='white_text'>Retrieve the totem in the </span><span class='blue_text'>Tower of Silence</span>",
    bonusDescription: "<span class='blue_text'>" + artifactsDefinition[artifactsName.totem].name + "</span><span class='white_text'> artifact</span>",
    resources: {},
    check: function() {
        return places[placesNames.tower_silence].done
    },
    bonusReward: function() {
        artifacts[artifactsName.totem].collect()
    }
}, {
    id: "seal_1",
    name: "[Meeting] The Nasasalars",
    description: "The totem you retrieved is an artifact made directly by the hand of the almighty dark lord. It's a manifestation of darkness, the perfection. We believe it carries a message for us all, but only the proto-haleans know this ancient language.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    questRequired: ["seal_0"],
    planet: planetsName.death,
    objective: "<span class='white_text'>Talk to the </span><span class='blue_text'>Nasasalars</span><span class='white_text'> on </span><span class='blue_text'>Berenil</span>",
    resources: {},
    check: function() {
        return places[placesNames.nasasalars_meeting].done
    }
}, {
    id: "seal_2",
    name: "[Bounty] Destroy the Nasasalars' Temple",
    description: "Cryptic lunatics can't be dealt with using words. It must be shown them what the true force of darkness is.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_1"],
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Berenil</span>",
    resources: {},
    bonusRequirement: function() {
        return !quests[questNames.juini_1].done
    },
    check: function() {
        return game.searchPlanet(planetsName.yanyin)
    },
    bonusReward: function() {
        setRep(civisNameDef.juini, civisNameDef.wahrian, repLevel.hostile.min);
        setRep(civisNameDef.juinika, civisNameDef.wahrian, repLevel.hostile.min)
    }
}, {
    id: "seal_3",
    name: "[Bounty] One of us",
    description: "Some Nasasalars have escaped their destiny and are now hiding on Siris. We must capture them and retrieve their knowledge on the matter. Should you succeed, we will welcome you in our cult.",
    repReward: 201,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_2"],
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Siris</span>",
    resources: {},
    check: function() {
        return game.searchPlanet(planetsName.siris)
    }
}, {
    id: "seal_4",
    name: "[Retrieval] The Four Pillars of Eternity",
    description: "Brother, our society has been built upon four artifacts, the pillars of our civilization. Upon each of our planets, an Uberpriest devolves his life to watch over its assigned jewel. Speak with them and bring the pillars together.",
    repReward: 300,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_3"],
    objective: "<span class='white_text'>Speak with the Uberpriests on the </span><span class='blue_text'> Seals</span>",
    resources: {},
    check: function() {
        return places[placesNames.pillar_fire].done && places[placesNames.pillar_air].done && places[placesNames.pillar_ice].done && places[placesNames.pillar_earth].done
    }
}, {
    id: "seal_5",
    name: "[Retrieval] Juini's Knowledge",
    description: "Brother, the pillars have spoken to us, but we are not able to understand. We need to obtain the scientific knowledge of Protohaleans in order to translate their instruction. Conquer Twin Asun and learn about the protohalean science.",
    repReward: 300,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_4"],
    objective: "<span class='blue_text'>Protohalean Science</span><span class='white_text'> level </span><span class='blue_text'>1</span>",
    resources: {},
    check: function() {
        return 0 < game.researches[researchesName.protohalean_science].level
    }
}, {
    id: "seal_6",
    name: "[Bounty] The Ancient Gates",
    description: "The pillars have revelead us that seven gates once existed in the galaxy, and the one we are looking for is located on Volor Ashtar.",
    repReward: 400,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_5"],
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> Volor Ashtar</span>",
    resources: {},
    check: function() {
        return game.searchPlanet(planetsName.volor)
    }
}, {
    id: "seal_7",
    name: "[Retrieval] A Dark New World",
    description: "We were right, brother. You are the real angel of death. Once you will have built 7 space gate alpha and 7 space gate beta on Volor Ashtar, the pillars will show you the way for the home of our dark lord, the Void.",
    repReward: 500,
    repNeeded: 0,
    provider: civisNameDef.wahrian,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_6"],
    objective: "<span class='white_text'>Build </span><span class='blue_text'>7 Space Gate Alpha</span><span class='white_text'> and </span><span class='blue_text'>7 Space Gate Beta</span><span class='white_text'> on </span><span class='blue_text'>Volor Ashtar</span>",
    bonusDescription: "<span class='white_text'> Space gates will be converted into </span><span class='blue_text'>Space Gate Gamma, Darkmatter Science</span><span class='white_text'> research unlocked, </span><span class='blue_text'>Mitpriest Rubnkrasn</span><span class='white_text'> character unlocked</span>",
    resources: {},
    check: function() {
        return 7 == planets[planetsName.volor].structure[buildingsName.space_beta].number && 7 == planets[planetsName.volor].structure[buildingsName.space_machine].number
    },
    bonusReward: function() {
        planets[planetsName.volor].structure[buildingsName.space_beta].number = 0;
        planets[planetsName.volor].structure[buildingsName.space_machine].number = 0;
        planets[planetsName.volor].structure[buildingsName.space_gamma].number = 1;
        planets[planetsName.xirandrus].structure[buildingsName.space_delta].number = 1;
        game.maps[2] = 1;
        setRep(civisNameDef.darkarmy, civisNameDef.player, repLevel.neutral.min);
        characters[charactersName.wahrian].unlocked = !0
    }
}, {
    id: "juini_0",
    name: "[Meeting] Najusa's Proposal",
    description: "Nasasalars can't stand to see wahrians bringing evil and destruction in the andromeda heart. Can not you understand who are you summoning? We are all children of the light of Juini. Once you will reach out to him, the Dark Lord will destroy everyone nevertheless. If there still is some reason in you, talk them out of this madness!",
    repReward: 300,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["seal_1"],
    objective: "<span class='white_text'>Investigate</span><span class='blue_text'> Seal of War</span>",
    resources: {},
    bonusRequirement: function() {
        return !quests[questNames.seal_2].done
    },
    check: function() {
        return places[placesNames.lord_victorius].done
    },
    bonusReward: function() {
        setRep(civisNameDef.juini, civisNameDef.wahrian, repLevel.hostile.min);
        setRep(civisNameDef.juinika, civisNameDef.wahrian, repLevel.hostile.min)
    }
}, {
    id: "juini_1",
    name: "[Bounty] Violent Peace",
    description: "The wahrians will never change their mind. It should have occurred to us long time ago. We have no choice than conquer the seals before it's too late.",
    repReward: 201,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["juini_0"],
    objective: "<span class='white_text'>Conquer</span><span class='blue_text'> The Seals</span>",
    resources: {},
    check: function() {
        return game.searchPlanet(planetsName.cerberus) && game.searchPlanet(planetsName.kartarid) && game.searchPlanet(planetsName.conquest) && game.searchPlanet(planetsName.death)
    }
}, {
    id: "juini_2",
    name: "[Investigation] Spoiled Seed",
    description: "Our efforts have not been successful. The wahrians managed to spread their cult throughout the galaxy, and their followers are working in the shadows. Look for information on Hermr, Hades and Columbus.",
    repReward: 300,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["juini_1"],
    objective: "<span class='white_text'>Look for information on </span><span class='blue_text'> Hermr, Hades and Columbus</span>",
    resources: {},
    check: function() {
        return places[placesNames.yolur_mining_ship].done && places[placesNames.yolur_plant].done && places[placesNames.columbus_reactor].done && places[placesNames.hades_market].done
    }
}, {
    id: "juini_3",
    name: "[Bounty] No peace for the wicked",
    description: "The Yolurs are trying to hide an anomalous traffic of ships around their planets. The ships seem to vanish before they can be identified. After your discoveries, we think that followers of the shadows have indoctrinated the yolurs and are now helping each other ",
    repReward: 300,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["juini_2"],
    bonusDescription: "<span class='white_text'>Protohalean science research unlocked</span>",
    objective: "<span class='white_text'>Conquer </span><span class='blue_text'> Yolurs</span>",
    resources: {},
    check: function() {
        return game.searchPlanet(planetsName.hermr) && game.searchPlanet(planetsName.auriga) && game.searchPlanet(planetsName.cygnus) && game.searchPlanet(planetsName.forax) && game.searchPlanet(planetsName.volor)
    }
}, {
    id: "juini_4",
    name: "[Research] Knowledge is power",
    description: "We have looked everywhere, they are gone. We must develope our technology in order to see the shadows of those malignant beings.",
    repReward: 400,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["juini_3"],
    objective: "<span class='blue_text'>Protohalean Science</span><span class='white_text'> level </span><span class='blue_text'>1</span>",
    resources: {},
    check: function() {
        return 0 < game.researches[researchesName.protohalean_science].level
    }
}, {
    id: "juini_5",
    name: "[Retrieval] A Dark New World",
    description: "That's it. They successfully built a gate on Volor Ashtar and have now escaped into the Void. The forces of evil must not be awoken. We can't let them win, a holy war must start!",
    repReward: 500,
    repNeeded: 0,
    provider: civisNameDef.juini,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.death,
    questRequired: ["juini_4"],
    objective: "<span class='white_text'>Build </span><span class='blue_text'>7 Space Gate Alpha</span><span class='white_text'> and </span><span class='blue_text'>7 Space Gate Beta</span><span class='white_text'> on </span><span class='blue_text'>Volor Ashtar</span>",
    bonusDescription: "<span class='white_text'> Space gates will be converted into </span><span class='blue_text'>Space Gate Gamma, Darkmatter Science</span><span class='white_text'> research unlocked, </span><span class='blue_text'>Matriarch Uhluh</span><span class='white_text'> character unlocked</span>",
    resources: {},
    check: function() {
        return 7 == planets[planetsName.volor].structure[buildingsName.space_beta].number && 7 == planets[planetsName.volor].structure[buildingsName.space_machine].number
    },
    bonusReward: function() {
        planets[planetsName.volor].structure[buildingsName.space_beta].number = 0;
        planets[planetsName.volor].structure[buildingsName.space_machine].number = 0;
        planets[planetsName.volor].structure[buildingsName.space_gamma].number = 1;
        planets[planetsName.xirandrus].structure[buildingsName.space_delta].number = 1;
        game.maps[2] = 1;
        setRep(civisNameDef.wardens, civisNameDef.player, repLevel.neutral.min);
        characters[charactersName.protohalean].unlocked = !0
    }
}, {
    id: "traum_0",
    name: "[Investigation] The kidnapping of Sebastian Jones I",
    description: "The Chief of the Traumland Energy Corporation has misteriously disappeared. The Traumland Investigation Bureau has found some evidence of a possible kidnapping by The City's special forces. Given our bad relationships, we need external help to find the truth about what happend to him. Please be aware that your relationship with The City may degrade too.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Look for information on </span><span class='blue_text'>The City</span>",
    resources: {},
    check: function() {
        return places[placesNames.taiwan_hotel].done && places[placesNames.maipei_plant].done && places[placesNames.city_market].done
    }
}, {
    id: "traum_1",
    questRequired: ["traum_0"],
    name: "[Investigation] The kidnapping of Sebastian Jones II",
    description: "Sebasian Jones is nowhere to be found, but based on your evidence, it seems The City is indeed involved ind the kidnapping. Go talk with our informants on Ishtar Gate to gather more information.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Look for information on </span><span class='blue_text'>Ishtar Gate</span>",
    resources: {},
    check: function() {
        return places[placesNames.informantJero].done && places[placesNames.informantTanger].done
    }
}, {
    id: "traum_2",
    questRequired: ["traum_1"],
    name: "[Intercept] Jero's betrayal",
    description: "I am sorry for mister Jones, but there is a more pressing matter right now. Jero is fleeing with classified information and thus must be stopped.",
    repReward: 100,
    repNeeded: 0,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Intercept Jero on </span><span class='blue_text'>Antirion</span>",
    resources: {},
    check: function() {
        return places[placesNames.intercept_jero].done
    }
}, {
    id: "traum_3",
    questRequired: ["traum_2"],
    name: "[Investigation] The kidnapping of Sebastian Jones III",
    description: "We have enough evidence to tie the kidnapping to Zelera. Pay a visit to Zeleran Embassy on New Babilo.",
    repReward: 100,
    repNeeded: 100,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Speak with Zeleran Ambassador on </span><span class='blue_text'>New Babilo</span>",
    resources: {},
    check: function() {
        return places[placesNames.zeleran_embassy].done
    }
}, {
    id: "traum_4",
    questRequired: ["traum_3"],
    name: "[Investigation] The kidnapping of Sebastian Jones IV",
    description: "Justice has been served once again. The embassy shooting was a necessary evil that triggered the collapse of the current zeleran government. Inform our agents on Zelera to proceed.",
    repReward: 101,
    repNeeded: 50,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Alert the agents on </span><span class='blue_text'>Zelera</span>",
    resources: {},
    bonusRequirement: function() {
        return 6 <= researches[researchesName.astronomy].level
    },
    check: function() {
        return places[placesNames.jero_again].done && places[placesNames.agent1].done && places[placesNames.agent2].done
    }
}, {
    id: "traum_5",
    questRequired: ["traum_4"],
    name: "[Bounty] Zeleran Uprising",
    description: "Our agents did not succeed. Agent Jero managed to deliver classified information to the Zeleran government. Our agents reported unusual military movements which led us to think of a imminent war. Strike first!",
    repReward: 500,
    repNeeded: 50,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Destroy defensive fleets on </span><span class='blue_text'>Zelera</span>",
    resources: {},
    check: function() {
        return !planets[planetsName.zelera].searchCivisFleet(civisName.zelera)
    }
}, {
    id: "traum_6",
    questRequired: ["traum_5"],
    name: "[Conquer] Zeleran Uprising II",
    description: "Our preventive strike has not produced . Conquer Zelera once and for all.",
    repReward: 500,
    repNeeded: 50,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    objective: "<span class='white_text'>Conquer </span><span class='blue_text'>Zelera</span>",
    resources: {},
    bonusReward: function() {
        characters[charactersName.human2].unlocked = !0
    },
    check: function() {
        return game.searchPlanet(planetsName.zelera)
    }
}, {
    id: "traum_7",
    questRequired: ["traum_6"],
    name: "Rebuild the Human Empire",
    description: "The Human Empire must be rebuild. Without enemies, it will shine brighter than the past and you it will become your first and only true ally.",
    repReward: 500,
    repNeeded: 50,
    provider: civisNameDef.traum,
    civisSupported: [civisNameDef.player, civisNameDef.orion, civisNameDef.quris, civisNameDef.andromeda, civisNameDef.phantids],
    planet: planetsName.lagea,
    bonusDescription: "<span class='red_text'>Zelera, Antirion, The City, Orpheus, Ishtar Gate will fall under Human Empire's jurisdiction</span>",
    objective: "<span class='white_text'>Conquer </span><span class='blue_text'>Antirion, Orpheus, The City and Ishtar Gate</span>",
    resources: {},
    bonusReward: function() {
        transferPlanet2(planetsName.zelera, civisName.traum);
        transferPlanet2(planetsName.orpheus, civisName.traum);
        transferPlanet2(planetsName.santorini, civisName.traum);
        transferPlanet2(planetsName.mexager, civisName.traum);
        transferPlanet2(planetsName.uanass, civisName.traum)
    },
    check: function() {
        return game.searchPlanet(planetsName.zelera) && game.searchPlanet(planetsName.orpheus) && game.searchPlanet(planetsName.santorini) && game.searchPlanet(planetsName.mexager) && game.searchPlanet(planetsName.uanass)
    }
}]
  , baseCheckTut = function() {
    return !0
}
  , tutorialsDefinition = [{
    id: "tut0",
    description: "<br>Welcome Commander!<br>You finally woke up after a long cryosleep",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetInterface(planets[0])
    }
}, {
    id: "tut1",
    description: "<br>232 years have passed since you boarded the Vitha, but finally you reached your new home Promision!",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetInterface(planets[0])
    }
}, {
    id: "tut2",
    description: "<br>Let's do a little briefing.<br>In this interface you can see basic infos about your planet.",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetInterface(planets[0])
    }
}, {
    id: "tut3",
    description: "<br>On the left you can see a list of resources that can be <span class='white_text' style='font-size:100%'>extracted</span> on this planet, like <span class='white_text' style='font-size:100%'>Iron</span>",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetInterface(planets[0]);
    },
    drop: function() {
    }
}, {
    id: "tut4",
    description: "To open this tutorial again, click on the <img src='" + UI_FOLDER + "/t.png' style='height:26px;width:26px;position:relative;top:6px' /> icon in the bottom-right corner of the screen",
    check: baseCheckTut
}, {
    id: "tut4",
    description: "Let's extract <span class='white_text'>Iron</span>! Click on the <img src='" + UI_FOLDER + "/extraction.png' style='height:26px;width:26px;position:relative;top:6px' /> icon in the bottom menu to access the <span class='white_text'>Extraction Tab</span>",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetInterface(planets[0]);
    },
    drop: function() {
    }
}, {
    id: "tut6",
    description: "<br>In this interface, you can construct buildings to extract resources. By clicking on the desired building, you can see more details about it",
    check: function() {
        return "planetBuildingInterface_mining" == currentInterface && currentPlanet == planets[0]
    },
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    id: "tut7",
    description: "<br>On the left you can see how many resources are being produced every second.",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0]);
        $("#planet_mini").css("z-index", 1E3)
    },
    drop: function() {
        $("#planet_mini").css("z-index", 0)
    }
}, {
    id: "tut8",
    description: "Now click on the <img src='" + UI_FOLDER + "/add2.png' style='height:26px;width:26px;position:relative;top:6px' /> icon below the <span class='white_text'>Mining Plant</span> to build 1 more",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    id: "tut8",
    description: "<br>Perfect! You can now see on the right how iron production has doubled!",
    check: function() {
        return 1 < planets[0].structure[buildingsName.mine].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    id: "tut9",
    description: "<br>Keep building Mining Plants, until you reach 10 of them. Should only take few seconds!",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    id: "tut10",
    description: "<br>Perfect! But Iron is not the only resource you will need. Let's build 1 <span class='white_text'>Methane Extractor</span> (right below the <span class='white_text'>Mining Plant</span>) to extract <span class='white_text'>Methane</span>!",
    check: function() {
        return 10 <= planets[0].structure[buildingsName.mine].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    id: "tut11",
    description: "Great! But Methane alone is not that useful, we need <span class='white_text'>Fuel</span>. Click on the <img src='" + UI_FOLDER + "/production.png' style='height:26px;width:26px;position:relative;top:3px' /> icon in the bottom menu to access the <span class='white_text'>Production Tab</span>.",
    check: function() {
        return 0 < planets[0].structure[buildingsName.methaneext].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    description: "<br>In this interface you can construct buildings that transform raw resources, like iron and methane, into more useful and advanced resources.",
    check: function() {
        return "planetBuildingInterface_prod" == currentInterface && currentPlanet == planets[0]
    },
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "<br>Let's construct a <span class='white_text'>Methane Processer</span> to convert methane into fuel. By clicking on it, you can see that it consumes 2 methane every second to produce fuel.",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "<br>Well done! But wait, now your production of methane is negative, because the processer needs 2 methane every second! Build another <span class='white_text'>Methane Extractor</span>",
    check: function() {
        return 0 < planets[0].structure[buildingsName.converter].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "<br>That's good! You can now produce fuel without running out of methane. You will need fuel to power <span class='white_text'>Foundries</span> that in turn produce <span class='white_text'>Steel</span>",
    check: function() {
        return 1 < planets[0].structure[buildingsName.methaneext].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "<br>Every <span class='white_text'>Foundry</span> needs 2 <span class='white_text'>Fuel</span> but you only produce 1 per second. Build an additional <span class='white_text'>Methane Processer</span> and enough <span class='white_text'>Methane Extractors</span> to balance methane production",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "<br><span class='white_text'>Foundries</span> will also consume <span class='white_text'>Graphite and Iron</span>. Build a <span class='white_text'>Graphite Extractor</span> and then a <span class='white_text'>Foundry</span>",
    check: function() {
        return 1 < planets[0].structure[buildingsName.converter].number && 4 <= planets[0].structure[buildingsName.methaneext].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("mining", planets[0])
    }
}, {
    description: "<br><span class='white_text'>Steel</span> will be a very important resource for construction. Build more <span class='white_text'>Foundries, Methane Extractor/Processer and Mining Plants</span> until you produce 50 iron per second and 4 steel per second",
    check: function() {
        return 0 < planets[0].structure[buildingsName.graphext].number && 0 < planets[0].structure[buildingsName.foundry].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "You now have a nice basic setup, build a <span class='white_text'>Small Generator</span> in order to produce <span class='white_text'>Energy</span>.<br>You can find it by clicking on the <img src='" + UI_FOLDER + "/energy.png' style='height:26px;width:26px;position:relative;top:3px' /> icon.",
    check: function() {
        return 50 <= planets[0].globalProd[resourcesName.iron.id] / idleBon && 4 <= planets[0].globalProd[resourcesName.steel.id] / idleBon
    },
    extraAction: function() {
        exportPlanetBuildingInterface("prod", planets[0])
    }
}, {
    description: "Oh no! The generator is now consuming 3 fuel per second! It may a be a good idea to temporarily turn off Foundries. Click on <img src='" + UI_FOLDER + "/act.png' style='height:24px;width:24px;position:relative;top:3px' /> the icon next to the Foundry",
    check: function() {
        return 0 < planets[0].structure[buildingsName.generator].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("energy", planets[0])
    }
}, {
    description: "<br>Great, now the foundries are inactive and thus there will be enough fuel to power the generator. The energy consumption and production can be seen on the left info panel.",
    check: function() {
        return !planets[0].structure[buildingsName.foundry].active
    },
    extraAction: function() {
        exportPlanetBuildingInterface("energy", planets[0])
    }
}, {
    description: "<br>You can construct buildings even if you don't have energy for them, but they will work with lowered efficiency.",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("energy", planets[0])
    }
}, {
    description: "There is now enough energy to power a <span class='white_text'>Laboratory</span> so let's build one. Click on the <img src='" + UI_FOLDER + "/dna.png' style='height:26px;width:26px;position:relative;top:3px' /> icon to access the <span class='white_text'>Research Tab</span>",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("energy", planets[0])
    }
}, {
    description: "If you have not enough steel to build a laboratory, you can reactivate foundries by clicking on the <img src='" + UI_FOLDER + "/shut.png' style='height:24px;width:24px;position:relative;top:3px' /> icon",
    check: baseCheckTut,
    extraAction: function() {
        exportPlanetBuildingInterface("energy", planets[0])
    }
}, {
    description: "Excellent! You now produce research points, also known as RP. You can see researches clicking on the <img src='" + UI_FOLDER + "/research.png' style='height:26px;width:26px;position:relative;top:3px' /> icon in the top menu.",
    check: function() {
        return 0 < planets[0].structure[buildingsName.lab].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("research", planets[0])
    }
}, {
    description: "<br>Here you can see the technology tree. Let's start with <span class='white_text'>Geology</span> which will boost iron extraction. When you have enough RP, buy it.",
    check: function() {
        return "researchInterface" == currentInterface || "techInterface" == currentInterface
    },
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "<br>Perfect! You have also unlocked a new research: <span class='white_text'>Material Science</span>. It will boost several construction resources so it will be very useful.",
    check: function() {
        return 1 <= game.researches[researchesName.mineralogy].level
    },
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "<br><span class='white_text'>Geology 3</span> will unlock new buildings to extract <span class='white_text'>Titanium</span><br>So let's buy Geology 3 and Material Science 1.",
    check: baseCheckTut,
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "<br>Perfect! But things will get harder from now on. Researches will increase their cost quite rapidly, so you will need to boost RP production! And RP prodution will need other resources, and so on",
    check: function() {
        return 3 <= game.researches[researchesName.mineralogy].level && 1 <= game.researches[researchesName.material].level
    },
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "<br>You can continue on your own for now. You should boost your productions until you can research <span class='white_text'>Interstellar Travel</span>",
    check: baseCheckTut,
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "<br><span class='white_text'>Interstellar Travel</span> will let you explore the universe that surrounds us! You can build spaceships in the <span class='white_text'>Shipyard</span> and use them to colonize new planets!",
    check: function() {
        return 1 <= game.researches[3].level
    },
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "Now click on the <img src='" + UI_FOLDER + "/loading.png' style='height:26px;width:26px;position:relative;top:3px' /> icon to access the <span class='white_text'>Other Buildings Tab</span> and build a Shipyard",
    check: baseCheckTut,
    extraAction: function() {
        exportTechInterface()
    }
}, {
    description: "Now go to the <span class='white_text'>Shipyard Interface</span> by clicking on the <img src='" + UI_FOLDER + "/ship.png' style='height:26px;width:26px;position:relative;top:8px' /> icon in the bottom menu",
    check: function() {
        return 0 < planets[0].structure[buildingsName.shipyard].number
    },
    extraAction: function() {
        exportPlanetBuildingInterface("other", planets[0])
    }
}, {
    description: "<br>In this interface you can buy Spaceships!. Building more shipyards will unlock new and more powerful spaceships.",
    check: function() {
        return "shipyardInterface" == currentInterface
    },
    extraAction: function() {
        exportShipyardInterface(planets[0])
    }
}, {
    description: "When you have enough resources, build a <span class='white_text'>Vitha Colonial Ship</span>, then click on the <img src='" + UI_FOLDER + "/military.png' style='height:26px;width:26px;position:relative;top:8px' /> icon in the top menu. ",
    check: baseCheckTut,
    extraAction: function() {
        exportShipyardInterface(planets[0])
    }
}, {
    description: "<br>In this interface you will see the list of every fleet in your empire. If you have built a Vitha, then you will find it here under the name of Colonial Fleet.",
    check: function() {
        return "shipInterface" == currentInterface
    }
}, {
    description: "You will always need a colonial ship when colonizing new planets. So let's colonize! Click on the <img src='" + UI_FOLDER + "/move.png' style='height:28px;width:28px;position:relative;top:8px' /> icon under the colonial fleet to move it.",
    check: baseCheckTut,
    extraAction: function() {
        exportShipInterface({
            t: "cargo",
            p: 0
        })
    }
}, {
    description: "<br>Click on the white planet named <span class='white_text'>Vasilis</span> to move the fleet.",
    check: function() {
        return "mapInterface" == currentInterface
    },
    extraAction: function() {
        "mapInterface" != currentInterface && exportMapInterface(nebulas[0])
    }
}, {
    description: "<br>It will take some minutes to reach the planet, once it does, you will find the fleet again in the fleet interface.",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>Once there, there will be the caption '<span class='white_text'>Orbiting Vasilis</span>' next to the colonial fleet name. Then click on the fleet, and scroll the right planet until you find the button <span class='white_text'>Colonize Vasilis</span>. Click it and you will have a new planet!",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>Great, you colonized Vasilis! Like on Promision, here you can set up production chains. But wait! Vasilis does not have graphite!",
    check: function() {
        return game.searchPlanet(1)
    },
    extraAction: function() {}
}, {
    description: "<br>When you are done setting things up, you should import Graphite from Promision. How? Make a cargo fleet in Promision, click on the <img src='" + UI_FOLDER + "/automove.png' style='height:28px;width:28px;position:relative;top:8px' /> icon and then select Vasilis.",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>Here you go! In this interface you are creating an automatic transport route. For example, it may go from Promision to Vasilis and back transporting graphite to vasilis and steel back to Promision!",
    check: function() {
        return "setAutoRouteInterface" == currentInterface
    },
    extraAction: function() {}
}, {
    description: "<br>Now, under the column relative to Promision, find the entry relative to Graphite. In the first textbox you can specify a per second amount, while in the second textbox you can specify an absolute amount.",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>Here is an example:<br><img src='" + UI_FOLDER + "/autotuto.png' style='width:350px;position:relative;top:8px' />",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>Great, your auto-route will go back and forth delivering useful goods! ",
    check: function() {
        return "travelingShipInterface" == currentInterface && "auto" == currentCriteriaAuto
    },
    extraAction: function() {}
}, {
    description: "<br>If you need to modify the transported resources, you can click on the auto-route and you will see the option <span class='white_text'>Edit automatic route</span> on the right menu (you may need to scroll)",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    description: "<br>It seems you found an inhabited world, Antirion! ",
    check: function() {
        return 4 <= game.researches[researchesName[MAP_ENABLING_RESEARCH]].level
    },
    extraAction: function() {}
}, {
    description: "<br>Tutorial completed!",
    check: baseCheckTut,
    extraAction: function() {}
}, {
    id: "tutlast",
    description: "If you see this, there is clearly a problem...",
    check: function() {
        return !1
    }
}];
function RAID_ENABLED() {
    return quests[questNames.pirates_4].done
}
function SHIPPART_ENABLED() {
    return !0
}
function TIMETRAVEL_ENABLED() {
    return !0
}
function GET_FOOD_RESOURCE() {
    return resourcesName.biomass.id
}
function GET_ENGINE_RESOURCE() {
    return resourcesName.engine.id
}
function GET_AMMUNITION_RESOURCE() {
    return resourcesName.ammunition.id
}
function GET_AMMUNITIONU_RESOURCE() {
    return resourcesName["u-ammunition"].id
}
function GET_AMMUNITIONT_RESOURCE() {
    return resourcesName["t-ammunition"].id
}
function GET_ARMOR_RESOURCE() {
    return resourcesName.armor.id
}
function GET_SHIELD_RESOURCE() {
    return resourcesName["shield capsule"].id
}
function GET_DARKMATTER_RESOURCE() {
    return resourcesName["dark matter"].id
}
var START_PLANET = "promision"
  , MAP_ENABLING_RESEARCH = "astronomy"
  , MAP_ENABLING_LEVEL = 0
  , FLEET_ENABLING_RESEARCH = "astronomy"
  , FLEET_ENABLING_LEVEL = 0
  , MARKET_ENABLING_RESEARCH = "astronomy"
  , MARKET_ENABLING_LEVEL = 5
  , MARKET_PLANET = "virgo"
  , AG_GAME = !1;
