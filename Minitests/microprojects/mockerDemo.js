/**
 * @file Generate some BS with the mocker and print to almighty console.log
 */
const Mocker = require('./Mocker');

/** How many of each thing to generate */
const AMOUNT = 5;

/**
 * Create an empty array to map
 * @param {number} n elements
 */
const createArr = (n) => new Array(n).fill('');

/**
 * Main process runner
 */
const main = () => {
    const events = createArr(AMOUNT).map(() => Mocker.getEvent());
    console.log('EVENTS:\n', events);
    const participants = createArr(AMOUNT).map(() => Mocker.getParticipant());
    console.log('PARTICIPANTS:\n', participants);
};

main();
