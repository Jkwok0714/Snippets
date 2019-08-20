const expect = require('chai').expect;
const sinon = require('sinon');
const Messenger = require('../Minitests/utilTests/messagingSystem/Messenger');

describe('Mini messenger mailperson fellow', () => {
    let watchfulNyanEye = sinon.spy();
    const MESSAGE1 = 'msg';
    const MESSAGE2 = 'msg';
    it ('Should have a messages listener queue', () => {
        const messages = Messenger.getListeners();
        expect(messages).to.exist;
    });

    it('Should begin empty', () => {
        const messages = Messenger.getListeners();
        expect(messages.totalListeners).to.be.equal(0);
    });

    it('Should add listeners on subscribe', () => {
        Messenger.subscribe(MESSAGE1, true, watchfulNyanEye);
        const messages = Messenger.getListeners();
        expect(messages.totalListeners).to.be.eq(1);
    });

    it('Should call the callback when events emit and delete the single use listener', () => {
        Messenger.emit(MESSAGE1);
        const messages = Messenger.getListeners();
        expect(watchfulNyanEye.calledOnce).to.be.true;
        expect(messages.totalListeners).to.be.eq(0);
    });

    it('Should register a multi use listener', () => {
        watchfulNyanEye.resetHistory();
        Messenger.subscribe(MESSAGE2, false, watchfulNyanEye);
        for (let i = 0; i < 3; i++) {
            Messenger.emit(MESSAGE2);
        }
        expect(watchfulNyanEye.calledThrice).to.be.true;
    });

    it('Should clear listeners when called', () => {
        Messenger.clear(MESSAGE2);
        const messages = Messenger.getListeners();
        expect(messages.totalListeners).to.be.eq(0);
    });

    it('Should pass params through the message', () => {
        watchfulNyanEye.resetHistory();
        const MSG = 'hellothere';
        const PAYLOAD = 'generalkannobii';
        Messenger.subscribe(MSG, true, watchfulNyanEye);
        Messenger.emit(MSG, PAYLOAD);

        expect(watchfulNyanEye.calledOnce).to.be.true;
        expect(watchfulNyanEye.calledWith(PAYLOAD)).to.be.true;
    });
});