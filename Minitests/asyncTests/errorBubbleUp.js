/**
 * @file Test if ack of catches in child funcs can bubble up
 * Created Dec 5 2019
 */

const errorCauser = async () => {
    return JSON.parse('{');
};

const promiseWrapper = async () => {
    return errorCauser();
};

const promiseWrapperOuter = async () => {
    await promiseWrapper();
    return '';
};

const main = async () => {
    try {
        await promiseWrapperOuter();
    } catch (e) {
        console.log('\x1b[31m>>> Catch caught an error.\x1b[0m', e.message)
    }
};

main();
