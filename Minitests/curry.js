const { inhabitants, locations } = require('../junkData');
const Utility = require('./utility');

const TEST_TIMES = 6;

const setLocation = (location) => {
  return function (person) {
    return `${person} visited ${location} and ordered curry to consume.`;
  };
}

const chooseToSend = setLocation(Utility.chooseRandom(locations));

for (let i = 0; i < TEST_TIMES; i++) {
  console.log(chooseToSend(Utility.chooseRandom(inhabitants).name));
}
