/**
 * Helper file
 * Shares many methods with the listener tool, should prob use shared funcs/consts
 * @file Helper file companion to aiToyReport.js
 * Created May 17 2019
 */

const { join: pathJoin } = require('path');
const {
    createReadStream,
    existsSync
} = require('fs');

const CONSTANTS = {
    FILE_NAME: 'aiToy.log', // pretty bad practice to use json, and then in a .log file lol
    ANALYTIC: '0_analytics',
    DATA_PER_ROW: 3,
    PRINT_AMT: 20
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
    KDR: 'kdr',
    WAR: 'WAR',
    PERCENT_OF_KILLS: 'percentOfKills',
    PERCENT_OF_DAMAGE: 'percentOfDamage',
    KILLS_PER_SPAWN: 'killsPerSpawn',
    AVG_SPAWNS_PER_SESSION: 'avgSpawnsPerSession',
    TOTAL_TEN_KILL_RUNS: 'totalTenKillRuns',
    MULTI_KILL_RUNS: 'multiKillRuns',
    MULTI_KILL_RATE: 'multiKillRate',
    PERCENT_MULTI_KILL_RATE: 'percentMultiKillRate',
    TOTAL_MULTI_KILL_RUNS: 'totalMultiKillRuns',
    HIGHEST_UNDER_50: 'highestUnder50'
};

const LOG_PATH = pathJoin(__dirname, `/${CONSTANTS.FILE_NAME}`);
let dataCache = {};

const FLAGS = [
    { flag: '-s', usage: 'sort' },
    { flag: '-h', usage: 'help' },
    { flag: '-f', usage: 'find' },
    { flag: '-c', usage: 'csv' }
];

const parseOptions = (args) => {
    let options = {};
    try {
        for (let i = 2; i < args.length; i++) {
            console.log('matching', args[i]);
            const matchingFlag = FLAGS.filter(f => f.flag === args[i]);
            if (matchingFlag.length > 0) {
                if (args[i] === '-h') {
                    options['help'] = true;
                } else if (args[i] === '-c') {
                    options['csv'] = true;
                } else {
                    i++; // skip option
                    options[matchingFlag[0].usage] = args[i];
                }
            }
        }
    } catch (e) {
        console.log(`[parseOptions] Failed parsing options`);
    }
    return options;
}


const divideMod = (a, b) => {
    if (b === 0) return 0;
    return Math.round(a / b);
};

const getPercent = (a, b) => {
    if (b === 0 || !b) return '0.00%';
    return ((a / b) * 100).toFixed(2) + '%';
};

const compileData = () => {
    let result = {};
    const globalAnalytic = dataCache[CONSTANTS.ANALYTIC];
    for (let key in dataCache) {
        if (key === CONSTANTS.ANALYTIC) {
            result[CONSTANTS.ANALYTIC] = dataCache[CONSTANTS.ANALYTIC];
        } else {
            const temp = dataCache[key];
            const killsPerSpawn = +((temp[KEYS.KILLS] / temp[KEYS.SPAWNS]).toFixed(2));
            const multiKillPerSpawn = (temp[KEYS.MULTI_KILL_RUNS] || 0) / temp[KEYS.SPAWNS];
            const globalMultiKillRate = globalAnalytic[KEYS.TOTAL_MULTI_KILL_RUNS] / globalAnalytic[KEYS.CHARS_SPAWNED];
            result[key] = {
                kills: temp[KEYS.KILLS],
                avgKills: temp[KEYS.AVG_KILLS],
                deaths: temp[KEYS.DEATHS],
                damageDealt: temp[KEYS.DAMAGE_DEALTH],
                spawns: temp[KEYS.SPAWNS],
                trapDeaths: temp[KEYS.TRAP_DEATHS],
                healed: temp[KEYS.HEALED],
                attacks: temp[KEYS.ATTACKS],
                highestKillsUnder50: temp[KEYS.HIGHEST_UNDER_50] || 0,
                damagePerSpawn: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.SPAWNS]),
                tenKillRuns: temp[KEYS.TEN_KILL_RUNS],
                twentyKillRuns: temp[KEYS.TWENTY_KILL_RUNS],
                hundredKillRuns: temp[KEYS.HUNDRED_KILL_RUNS],
                multiKillRuns: temp[KEYS.MULTI_KILL_RUNS] || 0,
                killsPerSpawn: killsPerSpawn,
                percentMultiKillRate: getPercent((temp[KEYS.MULTI_KILL_RUNS] || 0), temp[KEYS.SPAWNS]),
                avgDmgPerAttack: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.ATTACKS]),
                avgDmgPerKill: divideMod(temp[KEYS.DAMAGE_DEALTH], temp[KEYS.KILLS]),
                avgAttacksPerKill: divideMod(temp[KEYS.ATTACKS], temp[KEYS.KILLS]),
                kdr: (temp[KEYS.KILLS] / (temp[KEYS.DEATHS] || 1)).toFixed(2),

                percentOfKills: ((temp[KEYS.KILLS] / globalAnalytic[KEYS.CHARS_SPAWNED]) * 100).toFixed(2) + '%',
                percentOfDamage: ((temp[KEYS.DAMAGE_DEALTH] / globalAnalytic[KEYS.TOTAL_DAMAGE]) * 100).toFixed(2) + '%',
                avgSpawnsPerSession: (temp[KEYS.SPAWNS] / globalAnalytic[KEYS.SESSIONS]).toFixed(2),
                percentOfTenKillRuns: getPercent(temp[KEYS.TEN_KILL_RUNS], globalAnalytic[KEYS.TOTAL_TEN_KILL_RUNS]),
                percentOfTwentyKillRuns: getPercent(temp[KEYS.TWENTY_KILL_RUNS], globalAnalytic[KEYS.TOTAL_TWENTY_KILL_RUNS]),
                percentOfHundredKillRuns: getPercent(temp[KEYS.HUNDRED_KILL_RUNS], globalAnalytic[KEYS.TOTAL_HUNDRED_KILL_RUNS]),
                kDiff: (killsPerSpawn - globalAnalytic[KEYS.AVG_KILLS]),
                mkDiff: (multiKillPerSpawn - globalMultiKillRate),
                WAR: (killsPerSpawn - globalAnalytic[KEYS.AVG_KILLS]) + (multiKillPerSpawn - globalMultiKillRate)
            };
        }
    }

    return result;
};

const sortFunc = (results, key) => {
    return Object.keys(results).sort((a, b) => (+results[b][key]) - (+results[a][key]));
}

const sortFuncForPercentStrings = (results, key) => {
    try {
        return Object.keys(results).sort((a, b) => {
            return parseFloat(results[b][key].slice(0, -1)) - parseFloat(results[a][key].slice(0, -1));
        });
    } catch (e) {
        console.log('Err', e, key);
    }
}

const printGlobal = (results) => {
    console.log('\n\n\x1b[32m===========\x1b[0m');
    console.log('\x1b[32m= OVERALL =\x1b[0m');
    console.log('\x1b[32m===========\x1b[0m');
    printObj(results[CONSTANTS.ANALYTIC]);
    delete results[CONSTANTS.ANALYTIC];
}

const isPercent = (statName) => {
    return statName.indexOf('percent') !== -1;
}

const removeFromKeyList = (arr, key) => {
    arr.splice(arr.indexOf(key), 1);
}

const printSomeStats = (stat) => {
    const results = compileData();

    printGlobal(results);

    let statdisp = stat || 'kdr';
    let sortedKeys = isPercent(statdisp) ? sortFuncForPercentStrings(results, statdisp) : sortFunc(results, statdisp);
    removeFromKeyList(sortedKeys, 'Hunter');
    const printAmt = Math.min(sortedKeys.length, CONSTANTS.PRINT_AMT);

    const statdispDisplay = statdisp.toUpperCase();
    console.log(`\x1b[32m= TOP ${printAmt} ${statdispDisplay} =\x1b[0m`);
    for (let i = 0; i < printAmt; i++) {
        console.log(`\x1b[36m*[${i + 1}] ${sortedKeys[i]}\x1b[0m`);
        printObj(results[sortedKeys[i]], statdisp);
    }
    console.log(`\x1b[32m= BOTTOM ${printAmt} ${statdispDisplay} =\x1b[0m`);
    const adjLen = sortedKeys.length - 1;
    for (let i = adjLen - printAmt; i < sortedKeys.length; i++) {
        console.log(`\x1b[36m*[${i + 1}] ${sortedKeys[i]}\x1b[0m`);
        printObj(results[sortedKeys[i]], statdisp);
    }
};

const printStatsFor = (name) => {
    const results = compileData();

    printGlobal(results);

    // analytics key will be deleted now, only chars left
    const searchResults = Object.keys(results).filter(k => k.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    if (searchResults.length > 0) {
        const sortedCache = {
            byKdr: sortFunc(results, KEYS.KDR),
            byTenKillRuns: sortFunc(results, KEYS.TEN_KILL_RUNS),
            byTwentyKillRuns: sortFunc(results, KEYS.TWENTY_KILL_RUNS),
            byPercentKills: sortFuncForPercentStrings(results, KEYS.PERCENT_OF_KILLS),
            byPercentDamage: sortFuncForPercentStrings(results, KEYS.PERCENT_OF_DAMAGE),
            byMultiKillRate: sortFuncForPercentStrings(results, KEYS.PERCENT_MULTI_KILL_RATE),
            byAvgSpawns: sortFunc(results, KEYS.AVG_SPAWNS_PER_SESSION),
            byWAR: sortFunc(results, KEYS.WAR),
            entries: Object.keys(results).length
        };
        searchResults.forEach(name => printSingleCharsDetail(name, results, sortedCache));
    } else {
        console.log(`[Error] Name not found: ${name}`);
    }
}

const getRank = (name, sortedList) => {
    return sortedList.indexOf(name) + 1;
}

const printSingleCharsDetail = (name, results, sortedCache) => {
    console.log(`\x1b[36m* ${name}\x1b[0m`);
    const charInfo = results[name];
    printObj(charInfo);
    console.log(`\x1b[35m  Rankings\x1b[0m`);
    console.log(`  10-Kill Runs: \x1b[33m#${getRank(name, sortedCache.byTenKillRuns)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  20-Kill Runs: \x1b[33m#${getRank(name, sortedCache.byTwentyKillRuns)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  % of Kills: \x1b[33m#${getRank(name, sortedCache.byPercentKills)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  % of Damage: \x1b[33m#${getRank(name, sortedCache.byPercentDamage)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  Avg Spawns/Session: \x1b[33m#${getRank(name, sortedCache.byAvgSpawns)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  KDR: \x1b[33m#${getRank(name, sortedCache.byKdr)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  Multi-Kill Rate: \x1b[33m#${getRank(name, sortedCache.byMultiKillRate)}/${sortedCache.entries}\x1b[0m`);
    console.log(`  WAR: \x1b[33m#${getRank(name, sortedCache.byWAR)}/${sortedCache.entries}\x1b[0m`);
}

const printObj = (obj, highlightKey) => {
    let string = '';
    let rot = 0;
    const flush = () => {
        console.log('  ' + string);
        rot = 0;
        string = '';
    }
    for (let key in obj) {
        const keyPrint = key === highlightKey ? `\x1b[4m${key}\x1b[0m` : key;
        string += `${keyPrint}: \x1b[33m${typeof obj[key] === 'number' ? parseFloat(obj[key].toFixed(4)) : obj[key]}\x1b[0m  `;
        rot++;
        if (rot % CONSTANTS.DATA_PER_ROW === 0) {
            flush();
        }
    }
    if (string !== '') flush();
};

const loadCache = () => {
    return new Promise(res => {
        if (existsSync(LOG_PATH)) {
            let readStream = createReadStream(LOG_PATH, 'utf8');
            let data = '';
            readStream.on('data', chunk => {
                data += chunk;
            }).on('end', () => {
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

const writeCsv = () => {
    const results = compileData();
};

const main = () => {
    let options = parseOptions(process.argv);
    loadCache().then(() => {
        const sortBy = options['sort'] && Object.keys(KEYS).filter(k => KEYS[k] === options['sort']).length > 0 ? options['sort'] : 'killsPerSpawn';
        console.log(`[main] options parsed sort by ${sortBy}`);
        if (options['find']) {
            printStatsFor(options['find']);
        } else if (options['csv']) {
            writeCsv();
        } else {
            printSomeStats(sortBy);
        }
    });
};

main();
