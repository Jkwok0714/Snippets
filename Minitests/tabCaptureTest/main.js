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

pokeTheExtension();
