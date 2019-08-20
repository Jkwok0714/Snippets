const expect = require('chai').expect;
const Utility = require('../Minitests/utility/index');

const NUM_TESTS = 5;

describe('Utility helper', () => {
    describe ('getRngBetween', () => {
        it('Can get a random number properly', () => {
            const generated = Utility.getRngBetween(50, 100);
            expect(generated).to.be.greaterThan(49);
            expect(generated).to.be.lessThan(101);
        });

        it('Can get a random number properly with changing params', () => {
            for (let i = 0; i < NUM_TESTS; i++) {
                const lowRange = Math.floor(Math.random() * 100);
                const highRange = Math.floor(Math.random() * 100) + lowRange + 10;
                const generated = Utility.getRngBetween(lowRange, highRange);
                expect(generated).to.be.greaterThan(lowRange - 1);
                expect(generated).to.be.lessThan(highRange + 1);
            }
        });

        it('Also handles negative numbers', () => {
            const generated = Utility.getRngBetween(-50, -10);
            expect(generated).to.be.greaterThan(-51);
            expect(generated).to.be.lessThan(-9);
        });

        it('Will just get a random number 0-100 if the params are bad', () => {
            const generated = Utility.getRngBetween('agda', () => console.log('EXPLOSION'));
            expect(generated).to.be.greaterThan(-1);
            expect(generated).to.be.lessThan(101);
        });
    });

    describe('makeArrayOfNLength', () => {
        it('Returns an array', () => {
            const arr = Utility.makeArrayOfNLength(9, () => '');
            expect(Array.isArray(arr)).to.be.true;
        });

        it('Returns an empty array when provided with bad params', () => {
            const arr = Utility.makeArrayOfNLength('Oh, you\'re apporaching me?', () => '');
            expect(Array.isArray(arr)).to.be.true;
            expect(arr.length).to.be.equal(0);
        });

        it('Returns the correct length', () => {
            const len = Utility.getRngBetween(4, 10);
            const arr  = Utility.makeArrayOfNLength(len, () => '');
            expect(Array.isArray(arr)).to.be.true;
            expect(arr.length).to.be.equal(len);
        });

        it('Can generate with respect to the index as a seed', () => {
            const arr = Utility.makeArrayOfNLength(100, i => i + 5);
            for (let i = 0; i < arr.length; i++) {
                expect(arr[i] - 5).to.be.equal(i);
            }
        });
    });

    describe('chooseRandom', () => {
        const arr = ['qwerty', 'asdfg', 'zxcvb', '12345'];
        let chosen = Utility.chooseRandom(arr);
        it('Returns stuff', () => {
            expect(chosen).to.exist;
        });

        it('Is an element in the array', () => {
            expect(arr).to.contain(chosen);
        });

        it('Should be hiiiighly unlikely to choose the same thing 100 times', () => {
            let results = new Array(100).fill('').map(() => Utility.chooseRandom(arr));
            const allSame = results.every(e => e === results[0]);
            expect(allSame).to.be.false;
        });
    });

    describe('makeToken', () => {
        it('Should return a little string', () => {
            const str = Utility.makeToken();
            expect(str).to.exist;
            expect(typeof str).to.be.equal('string');
        });

        it('should make them of different lengths', () => {
            for (let i = 0; i < NUM_TESTS; i++) {
                const targetLen = Utility.getRngBetween(2, 10);
                const newToken  = Utility.makeToken(targetLen);
                expect(newToken.length).to.be.equal(targetLen);
            }
        });
    });

    describe('uniqByKey', () => {
        const KEY = 'key';

        it('Should return some array', () => {
            const result = Utility.uniqByKey([
                { key: 1 },
                { key: 2 }
            ], 'key');

            expect(result).to.exist;
            expect(result.length).to.be.greaterThan(0);
        });

        it('Should remove duplicate values in a key', () => {
            const type1 = { [KEY]: 'a' };
            const type2 = { [KEY]: 'b' };
            const input = Utility.makeArrayOfNLength(100, () => Utility.getRngBetween(0, 100) > 70 ? type1 : type2);
            const result = Utility.uniqByKey(input, KEY);

            expect(input.length).to.be.greaterThan(result.length);
        });

        it('Should not remove if there are no duplicates', () => {
            const input = Utility.makeArrayOfNLength(100, i => ({ [KEY]: i }));
            const result = Utility.uniqByKey(input, KEY);

            expect(input.length).to.be.equal(result.length);
        });
    });

    describe('promiseLoop', function () {
        /* Expect these async calls to take up to 1s */
        this.slow(1000);

        it('Should resolve if empty array is provided', async () => {
            await Utility.promiseLoop([], () => {});
            return;
        });

        it('Should actually be asynchronous', () => {
            const useTime = 10;
            let arr = Utility.makeArrayOfNLength(Utility.getRngBetween(10, 20), i => i);
            let completed = 0;
            Utility.promiseLoop(arr, (ele, done) => {
                setTimeout(() => {
                    completed++;
                    done();
                }, useTime);
            });
            expect(arr.length).to.be.greaterThan(0);
            expect(completed).to.be.equal(0);
        });

        it('Should run a given callback-based task on an array', async () => {
            const input = Utility.makeArrayOfNLength(Utility.getRngBetween(5, 10), i => i);
            const result = [];
            await Utility.promiseLoop(input, (ele, done) => {
                setTimeout(() => {
                    result.push(ele * 2);
                    done();
                }, 100);
            });
            expect(result.length).to.be.equal(input.length);
        });
    });
});