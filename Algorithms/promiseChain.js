const { artifacts, inhabitants } = require('../junkData');;
const execPromiseChain = (arr, input) => {
  return arr.reduce(
    (chain, curr) => chain.then(curr),
    Promise.resolve(input)
  );
}

let startCollection = [];
const possibleArtifacts = artifacts;

const getArtifact = (collection) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const selectIndex = Math.floor(Math.random() * possibleArtifacts.length);
      const selected = possibleArtifacts[selectIndex];
      console.log('>> Collected a', selected);
      possibleArtifacts.splice(selectIndex, 1);
      startCollection.push(selected);
      resolve();
    }, Math.random() * 3000);
  })
}

const getPromiseCollection = (n) => {
  return new Array(5).fill(getArtifact);
}

const main = () => {
  const promiseCollection = getPromiseCollection(Math.floor(Math.random() * 7) + 5);
  console.log(`${inhabitants[Math.floor(Math.random() * inhabitants.length)].name} is embarking on a quest across all Cathedral!`);
  execPromiseChain(promiseCollection, startCollection).then(() => {
    console.log('Items collected!\n>>', startCollection.join(', '));
  });
}

main();
