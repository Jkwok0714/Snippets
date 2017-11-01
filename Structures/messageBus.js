// Message bus pseudocode
class MessageBus {
  constructor() {
    this.name = 'MUNI';
    this.subscribes = [];
  }

  subscribe (topic, callback) {
    this.subscribes.push({
      topic,
      callback
    });
  }

  publish (topic, payload) {
    console.log('Got a message with topic:', topic);
    for (var i = 0; i < this.subscribes.length; i++) {
      if (this.subscribes[i].topic === topic) {
      	console.log('Found a subscriber to', topic);
        if (!payload) {
          payload = null;
        } else {
          payload = this.subscribes[i].callback(payload);
        }
      }
    }
  }
}

class Component1 {
  constructor () {
    this.name = 'component 1';
    this.stuff = [];
  }

  busCallback (payload) {
 	  this.stuff.push(payload);
    console.log('Pushed the payload to', this.name);
  }

  init (bus) {
    bus.subscribe('emits', this.busCallback.bind(this));
  }
}

class Component2 {
  constructor () {
    this.name = 'component 2';
  }

  init (bus) {
    bus.publish('emits', { item: 'An Object' });
  }
}

class Component3 {
  constructor () {
    this.name = 'component 3';
    this.stuff = [];
  }

  busCallback (payload) {
 	  this.stuff.push(payload);
    console.log('Pushed the payload to', this.name);
  }

  init (bus) {
    bus.subscribe('emits', this.busCallback.bind(this));
  }
}

//test
console.log('==== TESTS ====');

let msgBus = new MessageBus();
let comp1 = new Component1();
let comp2 = new Component2();
let comp3 = new Component3();


console.log('Components 1 & 3 are listening to the message bus for topic emits');
comp1.init(msgBus);
comp3.init(msgBus);
console.log('Subscriber list in the message bus:', msgBus.subscribes);
console.log('Component 2 is going to push an object to the topic emits');
comp2.init(msgBus);
console.log('Component 1\'s stuff list', JSON.stringify(comp1.stuff));
console.log('Component 3\'s stuff list', JSON.stringify(comp1.stuff));
