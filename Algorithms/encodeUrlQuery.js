const encodeUrlQuery = (params) => {
    return Object.entries(params).map(p => encodeURIComponent(p[0]) + '=' + encodeURIComponent(p[1])).join('&');
};

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

const test = (params) => {
    console.log(`> Running test with params`, params);
    let queryString = encodeUrlQuery(params);
    console.log(`Constructed query string: ${queryString}`);
}

main();
