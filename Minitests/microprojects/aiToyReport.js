
/**
 * AI Toy Report test
 * Interfaces with an old Flash project, no sense developing much
 * Condensed to one file
 * @file Listen to data sent out by old Flash project "aiToy2009" and track results
 * Created May 13 2019
 */

const express = require('express');
const { join: pathJoin } = require('path');
const {
    writeFile,
    createReadStream,
    existsSync
} = require('fs');

/*
 * 
 * Constants
 * 
 */
const CONSTANTS = {
    SERVER_PORT: 4001,
    FILE_NAME: 'aiToy.log', /* pretty bad practice to use json, and then in a .log file lol */
    PERSIST_INTERVAL: 60 * 1000,
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
    TOTAL_ATTACKS: 'totalAttacks',
    TWENTY_KILL_RUNS: 'twentyKillRuns',
    HUNDRED_KILL_RUNS: 'hundredKillRuns',
    TEN_KILL_RUNS: 'tenKillRuns',
    TOTAL_TWENTY_KILL_RUNS: 'totalTwentyKillRuns',
    TOTAL_HUNDRED_KILL_RUNS: 'totalHundredKillRuns',
    TOTAL_TEN_KILL_RUNS: 'totalTenKillRuns',
    TOTAL_MULTI_KILL_RUNS: 'totalMultiKillRuns',
    MULTI_KILL_RUNS: 'multiKillRuns',
    HIGHEST_UNDER_50: 'highestUnder50' /* assassins spawn past 50, making it a cutoff */
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

/*
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

const checkKillMilestones = (name, count) => {
    if (count === 20) {
        addStat(name, KEYS.TWENTY_KILL_RUNS, 1);
        AnalyticsHandler.genericUpdate(KEYS.TOTAL_TWENTY_KILL_RUNS, 1);
    } else if (count === 100) {
        addStat(name, KEYS.HUNDRED_KILL_RUNS, 1);
        AnalyticsHandler.genericUpdate(KEYS.TOTAL_HUNDRED_KILL_RUNS, 1);
    } else if (count === 10) {
        addStat(name, KEYS.TEN_KILL_RUNS, 1);
        AnalyticsHandler.genericUpdate(KEYS.TOTAL_TEN_KILL_RUNS, 1);
    }
}

const checkEndKillStats = (name, count) => {
    if (count > 1) {
        addStat(name, KEYS.MULTI_KILL_RUNS, 1);
        AnalyticsHandler.genericUpdate(KEYS.TOTAL_MULTI_KILL_RUNS, 1);
    }
    const currHigh = dataCache[name][KEYS.HIGHEST_UNDER_50] || 0;
    if (count >= currHigh && count < 50) setStat(name, KEYS.HIGHEST_UNDER_50, count);
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

                checkEndKillStats(dataTag, +data1);

                const currAvg = dataCache[dataTag][KEYS.AVG_KILLS];
                const currSpawns = dataCache[dataTag][KEYS.SPAWNS];
                setStat(dataTag, KEYS.AVG_KILLS, computeRollingAverage(currAvg, currSpawns, data1));
                console.log(`\x1b[36m[handlePerformRequest] Death reported (${dataTag} : ${data1} : ${data2})\x1b[32m`);
                break;
            case ACTIONS.REPORT_KILL:
                addStat(dataTag, KEYS.KILLS, 1);
                addStat(dataTag, KEYS.DAMAGE_DEALTH, data2);
                AnalyticsHandler.updateTotalDamage(data2);

                checkKillMilestones(dataTag, +data1);
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
        [KEYS.HEALED]: 0,
        [KEYS.TEN_KILL_RUNS]: 0,
        [KEYS.TWENTY_KILL_RUNS]: 0,
        [KEYS.HUNDRED_KILL_RUNS]: 0,
        [KEYS.AVG_KILLS]: 0,
        [KEYS.MULTI_KILL_RUNS]: 0
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

const computeRollingAverage = (oldAvg, count, newData)  => {
    if (!count || count === 0) return newData;


    let curr = oldAvg;
    curr -= curr / count;
    curr += newData / count;

    return curr;
};

const AnalyticsHandler = {
    updateAverageKills: (newKills) => {
        const target = CONSTANTS.ANALYTIC;
        const hasData = !!dataCache[target][KEYS.AVG_KILLS];

        if (!hasData) return setStat(target, KEYS.AVG_KILLS, +newKills);

        const currAvg = dataCache[target][KEYS.AVG_KILLS];
        const currSpawn = dataCache[target][KEYS.CHARS_SPAWNED];
        setStat(target, KEYS.AVG_KILLS, computeRollingAverage(currAvg, currSpawn, newKills));
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
    genericUpdate: (key, amount) => {
        console.log(`\x1b[36m[AnalyticsHandler] Update key (${key}) with (${amount})\x1b[0m`);
        addStat(CONSTANTS.ANALYTIC, key, amount);
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
        // fill();
        CacheHandler.startSaving();
        AnalyticsHandler.init();
        console.log(`\x1b[32mListening on port ${CONSTANTS.SERVER_PORT}\x1b[0m`);
    });
};

/*
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
                avgKills: temp[KEYS.AVG_KILLS],
                damageDealt: temp[KEYS.DAMAGE_DEALTH],
                spawns: temp[KEYS.SPAWNS],
                trapDeaths: temp[KEYS.TRAP_DEATHS],
                healed: temp[KEYS.HEALED],
                attacks: temp[KEYS.ATTACKS],
                twentyKillRuns: temp[KEYS.TWENTY_KILL_RUNS],
                hundredKillRuns: temp[KEYS.HUNDRED_KILL_RUNS],
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
    const sortedKeys = sortFunc(results, 'kdr');
    const printAmt = Math.min(sortedKeys.length, CONSTANTS.PRINT_AMT);

    console.log(`\x1b[32m= TOP ${printAmt} KDR =\x1b[0m`);
    for (let i = 0; i < printAmt; i++) {
        console.log(`\x1b[36m* ${sortedKeys[i]}\x1b[0m`);
        printObj(results[sortedKeys[i]]);
    }
    console.log(`\x1b[32m= BOTTOM ${printAmt} KDR =\x1b[0m`);
    const adjLen = sortedKeys.length - 1;
    for (let i = adjLen - printAmt; i < sortedKeys.length; i++) {
        console.log(`\x1b[36m* ${sortedKeys[i]}\x1b[0m`);
        printObj(results[sortedKeys[i]]);
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

const fill = () => {
    setStat(CONSTANTS.ANALYTIC, KEYS.TOTAL_TEN_KILL_RUNS, 0);
    for (let key in dataCache) {
        if (key !== CONSTANTS.ANALYTIC) {
            
            AnalyticsHandler.genericUpdate(KEYS.TOTAL_TEN_KILL_RUNS, dataCache[key][KEYS.TEN_KILL_RUNS]);
        }
    }
}

/*
 * 
 * Routes, listener
 * 
 */

/**
 * Start the Express server listening on SERVER_PORT
 */
const server = () => {
    const app = express();
    app.listen(CONSTANTS.SERVER_PORT, initRoutine);
    
    /*
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
    
    /*
     * Exit handler
     */
    process.on('SIGINT', () => {
        AnalyticsHandler.updateLastTouch();
        CacheHandler.endSaving().then(() => {
            printSomeStats();
            process.exit();
        });
    });
};

const main = () => {
    server();
}

main();