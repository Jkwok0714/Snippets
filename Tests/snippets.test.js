const expect = require('chai').expect;
const {
    bifurcateBy,
    capitalizeEveryWord,
    countOccurrences,
    deepFlatten,
    uniqueOnly
} = require('../Minitests/snippets');

describe('Little snippets from Medium:', () => {
    describe('bifurcateBy', () => {
        it('can take an array as an argument and return a result', () => {
            let arr = [1, 2];
            let result = bifurcateBy(arr, e => !!e);

            expect(result).to.exist;
            expect(result.length).to.be.equal(2);
        });

        it('will put all elements into truthy pile if given a callback always returning true', () => {
            let arr = new Array(Math.floor(Math.random() * 10)).fill('A');
            let result = bifurcateBy(arr, e => !!e);

            expect(result[0].length).to.be.equal(arr.length);
            expect(result[1].length).to.be.equal(0);
        });

        it('will put all elements into false pile if given a callback always returning false', () => {
            let arr = new Array(Math.floor(Math.random() * 10)).fill('A');
            let result = bifurcateBy(arr, e => !e);

            expect(result[1].length).to.be.equal(arr.length);
            expect(result[0].length).to.be.equal(0);
        });

        it('will properly sort items into truth and false in an assorted pile', () => {
            let arr = [];
            let putInTrue = 0;
            let putInFalse = 0;

            const NUM_TEST = 10;

            for (let i = 0; i < NUM_TEST; i++) {
                if (Math.random() > .5) {
                    arr.push(true);
                    putInTrue++;
                } else {
                    arr.push(false);
                    putInFalse++;
                }
            }

            const result = bifurcateBy(arr, e => e);
            expect(result[0].length).to.be.equal(putInTrue);
            expect(result[1].length).to.be.equal(putInFalse);
        });
    });

    describe('capitalizeEveryWord', () => {
        it('should take a string input and spit one back out', () => {
            const str = 'a string test';
            const result = capitalizeEveryWord(str);
            expect(result).to.exist;
            expect(typeof result).to.be.equal('string');
        });

        it('should not alter the string if it is only numberic or not alphabetic', () => {
            const str = `${Math.random() * 100}`;
            const result = capitalizeEveryWord(str);
            expect(result).to.exist;
            expect(result).to.be.equal(str);
        });

        it('should alter the string by capitalizing the words', () => {
            const str = 'a test string here';
            const result = capitalizeEveryWord(str);
            expect(str).to.not.equal(result);
            const split = result.split(' ');
            split.forEach(word => {
                expect(word[0].toUpperCase()).to.equal(word[0]);
            });
        });
    });

    describe('countOccurrences', () => {
        it('should return a number', () => {
            let arr = ['a', 'b', 'c'];
            const result = countOccurrences(arr, 'd');
            expect(result).to.exist;
            expect(typeof result).to.be.equal('number');
        });

        it ('should count properly', () => {
            let arr = [];
            let added = 0;
            const NUM_ELES = 30;
            const FIND_ME = 'abc';
            for (let i = 0; i < NUM_ELES; i++) {
                if (Math.random() > .6) {
                    arr.push(FIND_ME);
                    added++;
                } else {
                    arr.push('no');
                }
            }
            const result = countOccurrences(arr, FIND_ME);
            expect(result).to.be.equal(added);
        });

        it('should return zero for something not in array', () => {
            let arr = new Array(Math.floor(Math.random() * 10) + 10).fill('a');
            const result = countOccurrences(arr, 'b');
            expect(result).to.equal(0);
        });
    });

    describe('deepFlatten', () => {
        it('should return an array', () => {
            let arr = new Array(5).fill('a');
            const result = deepFlatten(arr);

            expect(Array.isArray(result)).to.be.true;
        });

        it('should not contain arrays in result after flattening', () => {
            let arr = [1, 2, 3, [4, 5, [6, 7]], [8], 9];
            const result = deepFlatten(arr);

            result.forEach(v => expect(Array.isArray(v)).to.be.false);
        });
    });

    describe('removeDuplicates', () => {
        it('should return the original array if there are no duplicates', () => {
            let arr = [1, 2, 3];
            const result = uniqueOnly(arr);
            expect(arr.length).to.be.equal(result.length);
            arr.forEach((e, i) => expect(e).to.be.equal(result[i]));
        });

        it('should trim an array of repeated elements to nothing', () => {
            let arr = new Array(10).fill('1');
            const result = uniqueOnly(arr);
            expect(result.length).to.be.equal(0);
        });

        it('should leave the one element that is not repeated', () => {
            let arr = new Array(10).fill('1');
            arr.push('2');
            const result = uniqueOnly(arr);
            expect(result.length).to.be.equal(1);
        });
    });
});