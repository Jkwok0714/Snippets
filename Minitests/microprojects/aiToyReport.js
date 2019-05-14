
/*
 * AI Toy Report test
 * Interfaces with an old Flash project, no sense developing much
 * Condensed to one file
 */

const express = require('express');
const { join: pathJoin } = require('path');
const {
    writeFile,
    createReadStream,
    existsSync
} = require('fs');

/**
 * 
 * Constants
 * 
 */
const CONSTANTS = {
    SERVER_PORT: 4001,
    FILE_NAME: 'aiToy.log', // pretty bad practice to use json, and then in a .log file lol
    PERSIST_INTERVAL: 30 * 1000,
    ANALYTIC: '0_analytics',
    DATA_PER_ROW: 3,
    PRINT_AMT: 10
};
const KEYS = {
    KILLS: 'kills',
    DEATHS: 'deaths',
    DAMAGE_DEALTH: 'damageDealt',
    SPAWNS: 'spawns',
    CHARS_SPAWNED: 'charsSpawned',
    TOTAL_DAMAGE: 'totalDamage',
    TOTAL_TRAP_DEATHS: 'totalTrapDeaths',
    SESSIONS: 'sessions',
    AVG_KILLS: 'avgKills',
    TRAP_DEATHS: 'trapDeaths',
    LAST_TOUCH: 'lastTouch',
    HEALED: 'healed',
    TOTAL_HEALED: 'totalHealed',
    ATTACKS: 'attacks',
    TOTAL_ATTACKS: 'totalAttacks'
};
const ACTIONS = {
    REPORT_KILL: 'reportKill',
    REPORT_DEATH: 'reportDeath',
    REPORT_TRAP_DEATH: 'reportTrapDeath',
    REPORT_SPAWN: 'reportSpawn',
    REPORT_SESSION: 'reportSession',
    REPORT_HEALING: 'reportHealing',
    REPORT_ATTACKS: 'reportAttacks'
};
const LOG_PATH = pathJoin(__dirname, `/${CONSTANTS.FILE_NAME}`);
let dataCache = {};
let persistTimer;
let touched = false;

const app = express();

/** 
 * 
 * Handlers, helpers
 * 
 */

/*
 * Much better to use sqlite, but why bother with something integrating with old Flash
 */
const CacheHandler = {
    startSaving: () => {
        persistTimer = setInterval(persistCache, CONSTANTS.PERSIST_INTERVAL);
    },
    endSaving: () => {
        if (persistTimer) clearInterval(persistTimer);
        return persistCache(true);
    }
};

const logError = (err) => {
    const isString = typeof err === 'string';
    console.log(`\x1b[31m[ERROR] ${isString ? err : err.message}\x1b[0m`);
};

const handleReportRequest = (action, dataTag, data1, data2) => {
    return new Promise((res) => {
        if (dataTag === 'undefined') return res();

        switch (action) {
            case ACTIONS.REPORT_SESSION:
                AnalyticsHandler.updateSessions();
                break;
            case ACTIONS.REPORT_SPAWN:
                AnalyticsHandler.updateCharsSpawned();
                addStat(dataTag, KEYS.SPAWNS, 1);
                break;
            case ACTIONS.REPORT_TRAP_DEATH:
                addStat(dataTag, KEYS.TRAP_DEATHS, 1);
                AnalyticsHandler.updateTotalTrapDeaths();
            case ACTIONS.REPORT_DEATH:
                addStat(dataTag, KEYS.DEATHS, 1);
                addStat(dataTag, KEYS.DAMAGE_DEALTH, data2);
                AnalyticsHandler.updateAverageKills(data1);
                console.log(`\x1b[36m[handlePerformRequest] Death reported (${dataTag} : ${data2})\x1b[32m`);
                break;
            case ACTIONS.REPORT_KILL:
                // console.log(`\x1b[36m[handlePerformRequest] Kill reported ${dataTag} ${data2}\x1b[32m`);
                addStat(dataTag, KEYS.KILLS, 1);
                addStat(dataTag, KEYS.DAMAGE_DEALTH, data2);
                AnalyticsHandler.updateTotalDamage(data2);
                break;
            case ACTIONS.REPORT_ATTACKS:
                addStat(dataTag, KEYS.ATTACKS, data2);
                AnalyticsHandler.updateTotalAttacks(data2);
                break;
            case ACTIONS.REPORT_HEALING:
                addStat(dataTag, KEYS.HEALED, data2);
                AnalyticsHandler.updateHealed(data2);
                break;
            default:
                console.log(`\x1b[32m[handleReportRequest] Unsupported action ${action}\x1b[0m`);
        }
        res();
    });
};

const persistCache = (override = false) => {
    return new Promise(res => {
        if (!touched && !override) return res();

        const data = JSON.stringify(dataCache, null, 2);
        writeFile(LOG_PATH, data, (err) => {
            if (err) logError(err);

            console.log('\x1b[32m[PersistCache] Wrote cache\x1b[0m');
            touched = false;
            res();
        });
    });
};

const loadCache = () => {
    return new Promise(res => {
        if (existsSync(LOG_PATH)) {
            let readStream = createReadStream(LOG_PATH, 'utf8');
            let data = '';
            readStream.on('data', chunk => {
                data += chunk;
            }).on('end', ()  => {
                try {
                    dataCache = JSON.parse(data);
                    console.log('[loadCache] Cache loaded from file');
                } catch (e) {
                    logError(e);
                }
                res();
            });
        } else {
            console.log('[loadCache] No file, skipping load');
            res();
        }
    });
};

const initRow = (name) => {
    if (name === CONSTANTS.ANALYTIC) return AnalyticsHandler.init();

    dataCache[name] = {
        [KEYS.DAMAGE_DEALTH]: 0,
        [KEYS.DEATHS]: 0,
        [KEYS.KILLS]: 0,
        [KEYS.SPAWNS]: 0,
        [KEYS.TRAP_DEATHS]: 0,
        [KEYS.HEALED]: 0
    };
};

const addStat = (target, statName, amount) => {
    if (!dataCache[target] || dataCache[target] === null) initRow(target);

    if (!dataCache[target][statName]) dataCache[target][statName] = 0;
    dataCache[target][statName] += Number(amount);
    touched = true;
};

const setStat = (target, statName, amount, parse = true) => {
    if (!dataCache[target] || dataCache[target] === null) initRow(target);

    dataCache[target][statName] = parse ? Number(amount) : amount;
    touched = true;
}

const AnalyticsHandler = {
    updateAverageKills: (newKills) => {
        const target = CONSTANTS.ANALYTIC;
        const hasData = !!dataCache[target][KEYS.AVG_KILLS];

        if (!hasData) return setStat(target, KEYS.AVG_KILLS, +newKills);

        let currAvg = dataCache[target][KEYS.AVG_KILLS];
        currAvg -= currAvg / dataCache[target][KEYS.CHARS_SPAWNED];
        currAvg += newKills / dataCache[target][KEYS.CHARS_SPAWNED];

        // console.log(`adjust avg: was ${dataCache[target][KEYS.AVG_KILLS]} new data is ${newKills} now is ${currAvg}`);

        setStat(target, KEYS.AVG_KILLS, currAvg);

        // setStat(target, KEYS.AVG_KILLS, hasData ? Math.floor((dataCache[target][KEYS.AVG_KILLS] + parseInt(newKills)) / 2) : +newKills);
    },
    updateCharsSpawned: () => {
        addStat(CONSTANTS.ANALYTIC, KEYS.CHARS_SPAWNED, 1);
    },
    updateTotalDamage: (damage) => {
        addStat(CONSTANTS.ANALYTIC, KEYS.TOTAL_DAMAGE, damage);
    },
    updateTotalTrapDeaths: () => {
        addStat(CONSTANTS.ANALYTIC, KEYS.TOTAL_TRAP_DEATHS, 1);
    },
    updateSessions: () => {
        addStat(CONSTANTS.ANALYTIC, KEYS.SESSIONS, 1);
    },
    updateHealed: (amount) => {
        addStat(CONSTANTS.ANALYTIC, KEYS.TOTAL_HEALED, amount);
    },
    updateTotalAttacks: (amount) => {
        addStat(CONSTANTS.ANALYTIC, KEYS.TOTAL_ATTACKS, amount);
    },
    updateLastTouch: () => {
        let d = new Date();
        setStat(CONSTANTS.ANALYTIC, KEYS.LAST_TOUCH, d.toLocaleString(), false);
    },
    init: () => {
        if (!dataCache[CONSTANTS.ANALYTIC]) {
            dataCache[CONSTANTS.ANALYTIC] = {};
        }
    }
};

const initRoutine = () => {
    loadCache().then(() => {
        CacheHandler.startSaving();
        AnalyticsHandler.init();
        console.log(`\x1b[32mListening on port ${CONSTANTS.SERVER_PORT}\x1b[0m`);
    });
};

/**
 * 
 * Reporting functions
 * 
 */

const divideMod = (a, b) => {
    if (b === 0) return 0;
    return Math.round(a / b);
}

const compileData = () => {
    let result = {};
    for (let key in dataCache) {
        if (key === CONSTANTS.ANALYTIC) {
            result[CONSTANTS.ANALYTIC] = dataCache[CONSTANTS.ANALYTIC];
        } else {
            if (key === 'undefined') continue;
            const temp = dataCache[key];
            result[key] = {
                kills: temp[KEYS.KILLS],
                deaths: temp[KEYS.DEATHS],
                damageDealt: temp[KEYS.DAMAGE_DEALTH],
                spawns: temp[KEYS.SPAWNS],
                trapDeaths: temp[KEYS.TRAP_DEATHS],
                healed: temp[KEYS.HEALED],
                attacks: temp[KEYS.ATTACKS],
                damagePerSpawn: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.SPAWNS]),
                killsPerSpawn: divideMod(temp[KEYS.KILLS], temp[KEYS.SPAWNS]),
                averageDamagePerAttack: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.ATTACKS]),
                averageDamagePerKill: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.KILLS]),
                kdr: (temp[KEYS.KILLS] / temp[KEYS.DEATHS]).toFixed(2)
            };
        }
    }

    return result;
};

const sortFunc = (results, key) => {
    return Object.keys(results).sort((a, b) => (+results[b][key]) - (+results[a][key]));
}

const printSomeStats = () => {
    const results = compileData();

    console.log('\x1b[32m= OVERALL =\x1b[0m');
    printObj(results[CONSTANTS.ANALYTIC]);

    delete results[CONSTANTS.ANALYTIC];
    const sortByKdr = sortFunc(results, 'kdr');
    const printAmt = Math.min(sortByKdr.length, CONSTANTS.PRINT_AMT);

    console.log(`\x1b[32m= TOP ${printAmt} KDR =\x1b[0m`);
    for (let i = 0; i < printAmt; i++) {
        console.log(`\x1b[36m* ${sortByKdr[i]}\x1b[0m`);
        printObj(results[sortByKdr[i]]);
    }
    console.log(`\x1b[32m= BOTTOM ${printAmt} KDR =\x1b[0m`);
    const adjLen = sortByKdr.length - 1;
    for (let i = adjLen; i > adjLen - printAmt; i--) {
        console.log(`\x1b[36m* ${sortByKdr[i]}\x1b[0m`);
        printObj(results[sortByKdr[i]]);
    }
};

const printObj = (obj) => {
    let string = '';
    let rot = 0;
    const flush = () => {
        console.log(string);
        rot = 0;
        string = '';
    }
    for (let key in obj) {
        string += `${key}: \x1b[33m${typeof obj[key] === 'number' ? parseFloat(obj[key].toFixed(4)) : obj[key]}\x1b[0m  `;
        rot++;
        if (rot % CONSTANTS.DATA_PER_ROW === 0) {
            flush();
        }
    }
    if (string !== '') flush();
};

/**
 * 
 * Routes, listener
 * 
 */

app.listen(CONSTANTS.SERVER_PORT, initRoutine);

/**
 * ActionScript caller: loadVariablesNum("http://localhost:4001/report?data=test", 0);
 */
app.get('/report', (req, res) => {
    const { action, dataTag, data1, data2 } = req.query;
    // console.log(`\x1b[36m[REPORT] Incoming [${action}] request received: { data tag: ${dataTag}, data: ${data1}, ${data2} }\x1b[0m`);
    if (!action) return res.send('Missing dataTag or data query');

    handleReportRequest(action, dataTag, data1, data2).then(() => {
        res.send('Report reported');
    });
});

app.get('/reportData', (req, res) => {
    console.log('[reportData] Incoming request to see current status');
    res.send(dataCache);
});

app.get('/', (req, res) => {
    console.log('[/] Misc request received');
    res.send('Invalid route to report.');
});

/**
 * Exit handler
 */
process.on('SIGINT', () => {
    AnalyticsHandler.updateLastTouch();
    CacheHandler.endSaving().then(() => {
        printSomeStats();
        process.exit();
    });
});