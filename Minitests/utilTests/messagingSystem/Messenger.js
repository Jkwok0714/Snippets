/**
 * @file A messenger class to use as an emitter system to notify of events
 * In actuality it was just made because some things seemed excessive to put in or notify through Redux for a React project
 * Created May 2 2018
 */

let messages = {};

class Messenger {
  subscribe (eventName, singleUse = false, callback) {
    let newListener = {
      callback,
      singleUse
    };

    if (messages[eventName]) {
      messages[eventName].push(newListener);
    } else {
      messages[eventName] = [newListener];
    }
  }

  emit (eventName, params = null) {
    if (messages[eventName]) {
      messages[eventName].forEach(listener => {
        if (typeof listener.callback === 'function') {
          listener.callback(params);
        }
      });
      messages[eventName] = messages[eventName].filter(listener => !listener.singleUse);
    }
  }

  clear (eventName) {
    delete messages[eventName];
  }
}

module.exports = new Messenger();
