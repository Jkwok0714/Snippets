
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
    PERSIST_INTERVAL: 30 * 1000
};
const KEYS = {
    KILLS: 'kills',
    DEATHS: 'deaths',
    DAMAGE_DEALTH: 'damageDealt',
    SPAWNS: 'spawns',
    CHARS_SPAWNED: 'charsSpawned',
    TOTAL_DAMAGE: 'totalDamage',
    SESSIONS: 'sessions'
};
const ACTIONS = {
    REPORT_KILL: 'reportKill',
    REPORT_DEATH: 'reportDeath',
    REPORT_SPAWN: 'reportSpawn',
    REPORT_SESSION: 'reportSession'
};
const LOG_PATH = pathJoin(__dirname, `/${CONSTANTS.FILE_NAME}`);
let dataCache = {};
let persistTimer;

const app = express();

/** 
 * 
 * Handlers, helpers
 * 
 */

/*
 * Much better to use sqlite, but why bother with something integrating with old Flash
 */
const cacheHandler = {
    startSaving: () => {
        persistTimer = setInterval(persistCache, CONSTANTS.PERSIST_INTERVAL);
    },
    endSaving: () => {
        if (persistTimer) clearInterval(persistTimer);
        return persistCache();
    }
};

const logError = (err) => {
    const isString = typeof err === 'string';
    console.log(`\x1b[31m[ERROR] ${isString ? err : err.message}\x1b[0m`);
};

const handleReportRequest = (action, dataTag, data) => {
    return new Promise ((res) => {
        res();
    });
};

const persistCache = () => {
    return new Promise(res => {
        const data = JSON.stringify(dataCache);
        writeFile(LOG_PATH, data, (err) => {
            if (err) logError(err);
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
                } catch (e) {
                    logError(e);
                }
                res();
            });
        } else {
            console.log('No file, skipping load');
            res();
        }
    });
};

const initRow = () => {

};

const addStat = (target, statName, amount) => {

};

/**
 * 
 * Routes, listener
 * 
 */

app.listen(CONSTANTS.SERVER_PORT, () => {
    loadCache().then(() => {
        cacheHandler.startSaving();
        console.log(`\x1b[32mListening on port ${CONSTANTS.SERVER_PORT}\x1b[0m`);
    });
});

/**
 * ActionScript caller: loadVariablesNum("http://localhost:4001/report?data=test", 0);
 */
app.get('/report', (req, res) => {
    const { action, dataTag, data } = req.query;
    console.log(`\x1b[36m[REPORT] Incoming request received: { data tag: ${dataTag}, data: ${data} }\x1b[0m`);
    if (!dataTag || !action || !data) return res.send('Missing dataTag or data query');

    handleReportRequest(action, dataTag, data).then(() => {
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
    cacheHandler.endSaving().then(() => {
        process.exit();
    });
});