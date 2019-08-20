const expect = require('chai').expect;
const sinon = require('sinon');

/** Practice some test utlities */
describe('Testing the test', () => {
    it('Should be a test and is good', (done) => {
        done();
    });

    describe('Slomo', function () {
        this.slow(1000);
        this.timeout(5000);
        it('should not consider 200ms as slow', (done) => {
            setTimeout(done, 200);
        });

        it('should not timeout at 2s', (done) => {
            setTimeout(done, 3000);
        });
    });

    describe('ZA WARUUDOOOO', function () {
        let clock;

        this.beforeEach(function () {
            clock = sinon.useFakeTimers();
        });

        this.afterEach(function () {
            clock.restore();
        });

        it('Toki wo tamare', function () {
            let elapsed = false;
            setTimeout(() => elapsed = true, 900);
            expect(elapsed).to.be.false;
            clock.tick(1000);
            expect(elapsed).to.be.true;
        });

        it('Muda muda muda', function () {
            const muda = sinon.spy();
            let mudaInterval = setInterval(muda, 1000);
            expect(muda.callCount).to.equal(0);
            clock.tick(7001);
            expect(muda.callCount).to.equal(7);
            clearInterval(mudaInterval);
        });

        it('Ora ora ora', function () {
            const Jotaro = {
                ora: () => {}
            };
            const oraSpy = sinon.spy(Jotaro, 'ora');
            let oraInterval = setInterval(Jotaro.ora, 1000);
            expect(oraSpy.callCount).to.equal(0);
            clock.tick(7001);
            expect(oraSpy.callCount).to.equal(7);
            clearInterval(oraInterval);
        });
    });

    describe('Stubs', () => {
        it('Should call instead of an original method', () => {
            let stuff = '';
            let serverContacted = false;
            const Handler = {
                save: (callback) => {
                    setTimeout(() => {
                        callback();
                        serverContacted = true;
                    }, 5000);
                }
            }
            const Data = {
                saveData: (data, callback) => {
                    stuff = data;
                    Handler.save(callback);
                }
            }

            const stubber = sinon.stub(Handler, 'save');
            stubber.yields();

            const callback = sinon.spy();
            Data.saveData('Wanners', callback);

            expect(serverContacted).to.be.false;
            expect(stuff.length).to.be.greaterThan(0);
            expect(callback.calledOnce).to.be.true;
            stubber.restore();
        });
    });
});