const request = require('request');
const { promisify } = require('util');
const get = promisify(request.get);
const put = promisify(request.put);

const { apiKey, apiToken, boardToken } = require('./config.js');

const baseUrl = 'https://api.trello.com/1';
const authQuery = `key=${apiKey}&token=${apiToken}`;

const sourceListIndex = 0;
const targetListIndex = 1;

const promiseLoop = (array, task) => {
  let pLoop = array.map(item => {
    return new Promise((res, rej) => {
      task(item, (data) => {
        res(data);
      });
    });
  });
  return Promise.all(pLoop);
}

const urlTypes = {
  getLists: 0,
  getListsCards: 1,
  putCard: 2
}

const constructUrl = (type, params) => {
  switch (type) {
    case urlTypes.getLists:
      return `${baseUrl}/boards/${boardToken}/lists?${authQuery}`;
    case urlTypes.getListsCards:
      return `${baseUrl}/lists/${params.listId}/cards?fields=id,name&${authQuery}`;
    case urlTypes.putCard:
      return `${baseUrl}/cards/${params.cardId}?idList=${params.listId}&${authQuery}`;
    default:
      return null;
  }
}

const main = () => {
  let listData;
  // Get the lists for this board
  get(constructUrl(urlTypes.getLists)).then(res => {
    const data = JSON.parse(res.body);
    console.log('Data', data);
    listData = data;
    const firstListId = listData[sourceListIndex].id;
    // Get the first list's cards
    const url = constructUrl(urlTypes.getListsCards, { listId: firstListId });
    return get(url);
  }).then(res => {
    const data = JSON.parse(res.body);
    console.log('cards in this list are', data);
    // Iterate through all cards and PUT request to Trello
    const idOfTargetList = listData[targetListIndex].id;
    return promiseLoop(data, (card, done) => {
      const url = constructUrl(urlTypes.putCard, { cardId: card.id, listId: idOfTargetList });
      put(url, { idList: idOfTargetList }).then(res => {
        console.log('> PUT card');
        done();
      }).catch(err => {
        console.log('error on POST', err);
        done();
      })
    });
  }).then(res => {
    console.log('Card migration complete.');
  }).catch(err => {
    console.log('Encountered an error', err);
  });
}

main();
