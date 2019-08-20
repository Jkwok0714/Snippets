const expect = require('chai').expect;
const Mocker = require('../Minitests/microprojects/Mocker');

describe('Mocker Helper', () => {
    it('Can get a random number properly', () => {
        const generated = Mocker.getRandomBetween(50, 100);
        expect(generated).to.be.greaterThan(49);
        expect(generated).to.be.lessThan(101);
    });

    it('Can get a random number properly with changing params', () => {
        const NUM_TESTS = 5;
        for (let i = 0; i < NUM_TESTS; i++) {
            const lowRange = Math.floor(Math.random() * 100);
            const highRange = Math.floor(Math.random() * 100) + lowRange + 10;
            const generated = Mocker.getRandomBetween(lowRange, highRange);
            expect(generated).to.be.greaterThan(lowRange - 1);
            expect(generated).to.be.lessThan(highRange + 1);
        }
    });

    describe('event mocker', () => {
        let event = Mocker.getEvent();

        it('Can generate a random event with specific properties', () => {
            expect(event.title).to.exist;
            expect(event.token).to.exist;
        });

        it('Has absolute rubbish as its event description', () => {
            expect(event.description).to.exist;
            expect(event.description.length).to.be.greaterThan(5);
        });
    });

    describe('User Mocker', () => {
        let user = Mocker.getParticipant();

        it('Makes a dummy user', () =>  {
            expect(user).to.exist;
            expect(user.fullName).to.exist;
            expect(user.firstName).to.exist;
            expect(user.lastName).to.exist;
            expect(user.email).to.exist;
        });

        it('Has a fullname consisting of first and last name', () => {
            expect(user.fullName.indexOf(user.firstName)).to.not.equal(-1);
            expect(user.fullName.indexOf(user.lastName)).to.not.equal(-1);
        });

        it('Has email with name and domain', () => {
            const emailSplit = user.email.split('@');
            expect(emailSplit.length).to.equal(2);
        });
    });

});