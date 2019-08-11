/**
 * Made to test addressing solutions to call stack issues caused by Isaac-Shahin abstraction model
 * @file For testing the length of call stacks when using a callback loop
 * Created Nov 14 2018
 */

Error.stackTraceLimit = Infinity;

const NUM_USERS = parseInt(process.argv[2]) || 5;
const NUM_PROPERTIES = parseInt(process.argv[3]) || 5;

let users;

/**
 * Tool for async looping
 * @param {*[]} array
 * @param {number} counter Index to start iteration
 * @param {Function} fnc Operation to perform on each element
 * @param {Function} onDone
 */
const recursiveLoopCallback = (array, counter, fnc, onDone) => {
  if (counter < array.length) {
      fnc(array[counter], () => {
          recursiveLoop(array, counter + 1, fnc, onDone);
      }, counter);
  } else if (onDone)
      onDone();
}

/**
 * Tool for async looping that won't blow up the call stack
 * @param {*[]} array
 * @param {number} counter Index to start iteration
 * @param {Function} fnc Operation to perform on each element
 * @param {Function} onDone
 */
const recursiveLoop = (array, counter, fnc, onDone) => {
    let p = [];
    for (let i = counter; i < array.length; i++) {
        p.push(new Promise((res) => {
            fnc(array[i], res, i);
        }));
    }
    if (p.length)
        Promise.all(p).then(() => onDone());
    else
        onDone();
};

/**
 * Get a random number
 * @param {number} n 
 */
const generateRandom = (n) => {
  return Math.floor(Math.random() * n);
}

/**
 * Return the value of a cached variable
 * @param {Function} callback 
 */
const getProperty = (callback) => {
  callback(generateRandom(1000));
}

/**
 * Get the state, which is a CachedDictionary object
 * @param {Function} callback 
 */
const getState = (callback) => {
  let result = {};
  recursiveLoop(new Array(NUM_PROPERTIES), 0, (prop, done, i) => {
    getProperty((value) => {
      result[i] = value;
      done();
    });
  }, () => {
    callback(result);
  });
}

/**
 * Get the profile, which is a CachedDictionary object
 * @param {Function} callback 
 */
const getProfile = (callback) => {
  let result = {};
  recursiveLoop(new Array(NUM_PROPERTIES), 0, (prop, done, i) => {
    getProperty((value) => {
      result[i] = value;
      done();
    });
  }, () => {
    callback(result);
  });
}

/**
 * Get the state and profile of all users as it appears in a UsersManager instance
 * @param {*[]} users 
 * @param {Function} callback 
 */
const getAllUsers = (users, callback) => {
  recursiveLoop(users, 0, (user, done, i) => {
    getState((state) => {
      getProfile((profile) => {
        const userID = i;
        users[i] = { userID, state, profile };
        done();
      })
    })
  }, () => {
    callback();
  })
}

/**
 * Get a stack trace
 */
const printTrace = () => {
  const errStack = new Error().stack;
  console.log('\x1b[33m!!! STACK !!!', errStack, '\x1b[0m');
  console.log(`\x1b[35mOperation ran successfully\nFinal stack length: ${errStack.split('at ').length}\x1b[0m`);
}

/**
 * Main process runner
 */
const main = () => {
  /* populate users */
  users = new Array(NUM_USERS);
  console.log(`\x1b[36m==== Now running stack bloating simulator ====\x1b[0m`);
  console.log(`\x1b[36mCreated array of ${NUM_USERS} users. State and Profile have ${NUM_PROPERTIES} properties\x1b[0m`);
  try {
    getAllUsers(users, () => {
      console.log('\x1b[32mGot all users and their states/profiles\x1b[0m');
      printTrace();
      // console.log(users);
    });
  } catch (e) {
    console.log('\x1b[31m!!!! ERROR:', e.message, '\x1b[0m');
  }
}

main();
