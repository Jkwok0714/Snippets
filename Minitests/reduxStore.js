const Redux = require('Redux');

const ADD_TRIP = 'ADD_TRIP';
const CHANGE_OWNER = 'CHANGE_OWNER';

const addTrip = (trip = {destination: ''}) => ({
  type: ADD_TRIP,
  trip
});

const changeOwner = (owner = '') => ({
  type: CHANGE_OWNER,
  owner
});

const initialState = {
  items: [],
  owners: '',
  id: ''
};

const tripsReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
  case ADD_TRIP:
    return Object.assign({}, state,
      {items: [...state.items, {id: Math.floor(Math.random() * 1000), destination: action.trip.destination}]});
    // return {
    //   state: state,
    //   items: [...state.items, {id: Math.random(), destination: action.trip.destination}]
    // };
  case CHANGE_OWNER:
    return Object.assign({}, state, {owner: action.owner});
    // return {
    //   state: state,
    //   owner: action.owner
    // };
  default:
    return state;
  }
};

//Tests

const { createStore } = Redux;
const store = createStore(tripsReducer);
const { getState } = store;

console.log(getState());

let trips = [
  {destination: 'Poveglia'},
  {destination: 'Reykjavik'},
  {destination: 'Bergen'}];

console.log('===\nAdding some items to the store\n===');
// let trips = ['Poveglia', 'Bodie', 'Chernobyl', 'Tombstone'];

trips.map((trip) => {
  store.dispatch(addTrip(trip));
});

store.dispatch(changeOwner('ChristieV'));

console.log(getState());

store.dispatch(addTrip({destination: 'Bodie'}));
store.dispatch(addTrip({destination: 'Kennicott'}));


console.log(getState());
console.log(getState().owner, 'is looking first to visit', getState().items[0].destination);
store.dispatch(changeOwner('Dandai'));
console.log(getState().owner, 'has taken over the itinerary');
