/**
 * @file Testing trapping errors into a specified contexxt
 * Created Dec 4 2019
 */

 const domain = require('domain');
require('zone.js');

/**
 * Junk that will throw an error that normally crashes the process
 * @param {Function} done 
 */
const badCallback = (done) => {
    setTimeout(() => {
        done(JSON.parse('{'));
    }, 100);
};

/**
 * Wrapping the junk in a promise, it shouldn't do anything really
 */
const wrappedInPromise = () => {
    return new Promise(resolve => {
        badCallback(resolve);
    });
}

/**
 * Using Domains to wrap around the error, but it looks like it is a deprectated API
 */
const wrappedInDomain = () => {
    const d = domain.create();
    d.on('error', e => console.log('\x1b[31m>>> Domain caught an error.\x1b[0m', e.message));
    d.run(() => {
        badCallback();
    });
};

/**
 * Using Zone.js to encapsulate the error, though it seems it will only work with certain async callbacks
 */
const wrappedInZone = () => {
    Zone.current.fork({
        onHandleError:
            (parentZoneDelegate, currentZone, targetZone,
                e) => {
                console.log('\x1b[31m>>> Zone caught an error.\x1b[0m', e.message)
                // return parentZoneDelegate.handleError(targetZone, e);
            }
    }).run(() => {
        badCallback();
    });
};

/**
 * Wait for some amount of time
 * @param {number} time 
 */
const sleep = (time) => {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
};

const announce = msg => console.log(`\x1b[32m${msg}\x1b[0m`);

const main = async () => {
    announce('Running first test: unprotected');
    badCallback(() => {});

    await sleep(1000);

    announce('Running second test: unprotected in promise');
    wrappedInPromise();

    await sleep(1000);

    announce('Running third test: wrapped in domain');
    wrappedInDomain();

    await sleep(1000);

    announce('Running fourth test: wrapped in a zone');
    wrappedInZone();
};

process.on('uncaughtException', (e) => {
    console.error('\x1b[31m>>> Uncaught exception!! CRASH, BOOM!!\x1b[0m', e.message);
});

main();