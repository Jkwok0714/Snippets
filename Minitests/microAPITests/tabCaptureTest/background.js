/**
 * @file The extension background scripts page for the tab capturer test
 * Created Aug 22 2018
 */

let capturers = {};

const actions = {
    START : 'start',
    STOP : 'stop'
};

console.log('Extension bg page loaded');
const clickCapturerName = 'webinato' + "_" + '10';

chrome.browserAction.onClicked.addListener(() => {
    //  this is for testing purpose
    if (capturers[clickCapturerName]) {
        stopTabCapture('webinato', '10');
    } else {
        let capturer = new TabCapturer('a1', Math.floor(Date.now() / 1000), {resolutionType:1, width: 1450, height: 900});
        capturers[clickCapturerName] = capturer;
        capturer.start();
        // startTabCapture('a1', '10', {resolutionType:1, width: 1450, height: 900});
    }
});

chrome.runtime.onMessageExternal.addListener(
     (request, sender, sendResponse) => {
         console.log('GOT MESSAGE', request, sender);
         const actionName = request.actionName;
         const accountToken = 'a';
         const presentationID = 12;
         switch (actionName) {
             case actions.START :
                 const options = request.options;
                startTabCapture(accountToken, presentationID, options);
                 break;
             case actions.STOP:
                 stopTabCapture(accountToken, presentationID);
                 break;
         }
    });

let startTabCapture = (accountToken, presentationID, options) =>{
    chrome.tabs.getSelected(null, (tab) => {
        let capturer = new TabCapturer(accountToken, presentationID, options);
        capturers[accountToken + "_" + presentationID] = capturer;
        capturer.start();
    });
};

let stopTabCapture = (accountToken, presentationID) =>{
    let capturer = capturers[accountToken + "_" + presentationID];

    if(capturer) {
        capturer.end();

        delete capturers[accountToken + "_" + presentationID];
    }
};

chrome.runtime.onConnect.addListener((port) => {
  // if (socket) socket.emit('newMessage', 'A content script connected to the extension ฅ^•ﻌ•^ฅ');
  port.onMessage.addListener((msg) => {
    console.log('newMessage', 'The content script poked me with message port ಠ_ಠ');
  });
});
