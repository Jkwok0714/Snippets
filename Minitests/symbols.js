/**
 * @file A test for the symmbol structures of JS
 * > "JavaScript introduced symbols in ES6 as a way to prevent property name collisions.
 * > As an added bonus, symbols also provide a way to simulate private properties in 2015-2019 JavaScript."
 */

/* Instantiate two symbols, they will not be equal */
const key1 = Symbol('The first test key');
const key2 = Symbol('The second test key');
let obj = {};

/* Set values to them */
obj[key1] = 'Ishida';
obj[key2] = 'Shouko';

console.log(`Obj key1: ${obj[key1]}\nObj key2: ${obj[key2]}`);
console.log('For debugging, the symbols have a description, such as:', key1);

const locationSymbolDec = 'A kinda private thing for location';

/**
 * A sample class to simulate truw private properties
 */
class PrivacyNotReal {
    /**
     * @param {{ name: string, lcoation: string }} param0 
     */
    constructor ({ name, location }) {
        const sym = Symbol(locationSymbolDec);
        this.info = {
            name,
            [sym]: location
        }
    }

    getOwnInfoSymbols () {
        return Object.getOwnPropertySymbols(this.info);
    }

    getInfoStoredInSymbols () {
        return Object.getOwnPropertySymbols(this.info).map(sym => this.info[sym]);
    }
}

/**
 * Main test runner to try accessing the properties in different ways
 */
const main = () => {
    const userData = new PrivacyNotReal({ name: 'Yukako', location: 'Morioh-Cho' });
    console.log('- userData.info: ', userData.info);
    console.log('- Object.keys(userData.info): ', Object.keys(userData.info));
    console.log('- userData.info[Symbol(const)]: ', userData.info[Symbol(locationSymbolDec)] );
    console.log('- get info symbols', userData.getOwnInfoSymbols());
    console.log('- Get info stored with symbols', userData.getInfoStoredInSymbols());
};

main();

