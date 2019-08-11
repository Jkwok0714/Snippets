/**
 * @file The test file that tries out the custom Messenger class
 * Created May 2 2018
 */

let Messenger = require('./Messenger.js');

class Component {
  constructor (val) {
    this.val = val || Math.round(Math.random() * 1000);
  }

  listenForEvent (eventName, onceOnly = false) {
    console.log(`Component ${this.val} is listening for ${eventName}`);
    Messenger.subscribe(eventName, onceOnly, (params) => {
      this.heardEvent(params);
    });
  }

  heardEvent (params) {
    console.log(`Component ${this.val} has heard event!`);
  }
}

const events = ['explosion', 'segmentation fault', 'meltdown', 'compiler error'];

const getRandomEvent = () => {
  return events[Math.floor(Math.random()*events.length)];
};

// create one element that listens for one event

let testComp = new Component(1);
testComp.listenForEvent('run', true);

// emit the events
Messenger.emit('run');

console.log('=== CREATING EAVESDROPPERS ===');

// create a bunch of components that listen to some random event
let componentList = Array(10).fill().map(ele => {
  let newComponent = new Component().listenForEvent(getRandomEvent(), true);
  return newComponent;
});

console.log('=== EMITTING EVENTS ===');
// emit 10 random events and see who hears

for (let i = 0; i < 10; i++) {
  let randomEvent = getRandomEvent();
  console.log(`-- Emitting event ${randomEvent}`);
  Messenger.emit(randomEvent);
}
