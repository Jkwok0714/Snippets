/**
 * @file Testing recursion of promise functions
 * Created Apr 30 2020
 */

const MAX_RECUR = 10;

const recursing = (i) => {
    return new Promise(resolve => {
        console.log(`Recursing on ${i}`);
        if (i < MAX_RECUR) {
            return setTimeout(() => {
                resolve(recursing(++i));
            }, 500);
        } else {
            return resolve('Herro');
        }
    });
};

recursing(0).then(data => {
    console.log('Got end data', data);
}).catch(err => {
    console.error(err);
});
