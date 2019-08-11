/**
 * @file Chain promises together
 * Created Oct 18 2018
 */

const { artifacts, inhabitants } = require('../junkData');;
const execPromiseChain = (arr, input) => {
  return arr.reduce(
    (chain, curr) => chain.then(curr),
    Promise.resolve(input)
  );
}

let startCollection = [];
const possibleArtifacts = artifacts;

/**
 * Return a promise that takes some time to retrieve a dummy data object
 * @param {*} collection 
 */
const getArtifact = (collection) => {
  return new Promise(resolve => {
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

/**
 * Create an array of promises that will retrieve dummy data objects
 * @param {number} n 
 */
const getPromiseCollection = (n) => {
  return new Array(n || 5).fill(getArtifact);
}

/**
 * Main test runner
 */
const main = () => {
  const promiseCollection = getPromiseCollection(Math.floor(Math.random() * 7) + 5);
  console.log(`${inhabitants[Math.floor(Math.random() * inhabitants.length)].name} is embarking on a quest across all Cathedral!`);
  execPromiseChain(promiseCollection, startCollection).then(() => {
    console.log('Items collected!\n>>', startCollection.join(', '));
  });
}

main();
