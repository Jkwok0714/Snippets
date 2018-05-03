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
