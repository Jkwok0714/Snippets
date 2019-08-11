/**
 * @file Main script of Chrome extension test
 * Created Aug 13 2018
 */

// alert('I\'m having a nervous breakdown, drive me insane!');

const pokeInterval = 20 * 1000;
let poker = null;
let port = chrome.runtime.connect({ name: 'caffiene' });

const pokeTheExtension = () => {
  // chrome.runtime.sendMessage({ data: 'Keep awake' }, (res) => {
  //   console.log('Sent message to keep extension awake, extension says:', res ? res.data : '');
  // });
  // console.log('Poking the extension');
  port.postMessage({ data: 'Keep awake!' });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request && request.stateUpdate !== null) {
      if (request.stateUpdate) {
        poker = setInterval(() => {
          pokeTheExtension();
        }, pokeInterval);
      } else {
        if (poker) clearInterval(poker);
      }
    }
});
