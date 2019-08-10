/**
 * @file Construct URL queries from an object
 * Created Feb 3 2019
 */

 /**
  * The bulk of the function to encode to url
  * @param {Object} params 
  */
const encodeUrlQuery = (params) => {
    return Object.entries(params).map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1])).join('&');
};

/**
 * Test runner
 */
const main = () => {
    test({
        user: 'Raphtalia',
        species: 'Tanuki'
    });

    test({
        region: 'EU',
        time: 96,
        provider: 'Commucast'
    });
};

/**
 * Run a single test
 * @param {Object} params 
 */
const test = (params) => {
    console.log(`> Running test with params`, params);
    let queryString = encodeUrlQuery(params);
    console.log(`Constructed query string: ${queryString}`);
}

main();
