/**
 * @file The background script for a test Chrome extension. Looking to test communication between elements
 * Created Aug 13 2018
 */

console.log('Background script firing up');

const communicationURL = 'http://localhost:3002';

let socketOn = false;
let socket = null;
let count = 0;

const getDateString = () => {
  let d = new Date();
  return d.toString();
}

const applyBehaviours = (socket) => {
  let pingInterval = null;

  socket.on('reconnect_attempt', (n) => {
    alert('Reconnect attempt made');
  });

  socket.on('disconnect', () => {
    console.log('socket disconnected:', getDateString());
    // alert('on socket disconnected event!');
    clearInterval(pingInterval);
  });

  socket.on('connect', () => {
    console.log('socket connected:', getDateString());
    pingInterval = setInterval(() => {
      let dateTime = new Date(null);
      dateTime.setSeconds(count);

      const randumb = `T${dateTime.toISOString().substr(11, 8)} -- ${Math.floor(Math.random() * 100)}`;
      socket.emit('newMessage', randumb);
      console.log('Sending to server', randumb);
      count++;
    }, 1000);
  });
};

const manageContentTimer = (state) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { stateUpdate: state }, (response) => {
    });
  });
}

chrome.browserAction.onClicked.addListener(() => {
    //  this is for testing purpose
    if (socketOn) {
      if (socket) socket.disconnect();
      manageContentTimer(false);
      alert('I was clickeded, stopped the socket');
      socketOn = false;
    } else {
      socket = io.connect(communicationURL);
      applyBehaviours(socket);
      manageContentTimer(true);
      alert('I been clicked, started socket');
      socketOn = true;
    }
});

// ฅ^•ﻌ•^ฅ
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log('The content script poked me');
  sendResponse({ data: 'I am still awake' });
  if (socket) socket.emit('newMessage', 'The content script poked me ಠ_ಠ');
});

// Listen for a connection to keep the background page active
chrome.runtime.onConnect.addListener((port) => {
  if (socket) socket.emit('newMessage', 'A content script connected to the extension ฅ^•ﻌ•^ฅ');
  port.onMessage.addListener((msg) => {
    if (socket) socket.emit('newMessage', 'The content script poked me with message port ಠ_ಠ');
  });
});
