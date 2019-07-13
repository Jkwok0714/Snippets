/**
 * Simulating some style of server selection algorithm
 */

// Config
let customServerCount, customRunAmount;
try {
  customServerCount = parseInt(process.argv[2]);
  customRunAmount = parseInt(process.argv[3]);
} catch (e) {
}

const NUM_SERVERS = customServerCount || 6;
const LARGE_LOAD = 5;
const SMALL_LOAD = 1;
const LOOP_TIME = 500;
const CHANCE_FOR_SMALL_LOAD = .9;
const TIMES_TO_RUN = customRunAmount || 60;
const REMOVE_ENABLED = true;
const TIMES_TO_DELETE = 10;

// Used variables
const servers = [];
let rrIndex = 0;

const lookupLoad = (index) => servers[index].load;
const getServerIndexFromRr = () => rrIndex % servers.length;

const printLoads = (emphasize = null, remove = false) => {
  const loadString = servers.map((server, i) => `s${server.id}: ${emphasize === i ? remove ? '\x1b[31m' : '\x1b[33m' : ''}[${server.load}]\x1b[35m`).join(' ');
  console.log(`\x1b[35mLoads of servers: ${loadString}\x1b[0m`);
}

const addConnectionToServer = (load) => {
  // Get load at current servers
  const lastServerLoad = lookupLoad(getServerIndexFromRr());
  // Increase rrIndex
  rrIndex++;
  // Find load at new rrIndex
  const newServerIndex = getServerIndexFromRr();
  const newServerLoad = lookupLoad(newServerIndex);
  // Subtract to see if this load is less or more
  const delta = newServerLoad - lastServerLoad;
  if (delta > 0) {
    //    If more, increase rrindex and look again. Call self recursively
    console.log(`\x1b[33m....Skipping server ${servers[newServerIndex].id} because delta is ${delta}\x1b[0m`);
    addConnectionToServer(load);
  } else {
    //    If less or is zero, add load to this server
    console.log(`\x1b[32m....Choosing server ${servers[newServerIndex].id} because delta is ${delta}\x1b[0m`);
    servers[newServerIndex].load += load;
    printLoads(newServerIndex);
  }
}

const removeConnectionFromServer = (serverIndex, load) => {
  // Simply remove load from the server at index
  console.log(`\x1b[2mRemoving load ${load} from ${servers[serverIndex].id}\x1b[0m`);
  servers[serverIndex].load -= load;
  printLoads(serverIndex, true);
}

// Funtions for test

const createServer = (id) => {
  servers.push({
    id,
    load: 0
  });
};

const setupInitialServers = (totalServers) => {
  for (let i = 0; i < totalServers; i++) {
    createServer(i);
  }
}

const addLoadNTimes = (n, loopTime) => {
  const loadToAdd = Math.random() > CHANCE_FOR_SMALL_LOAD ? LARGE_LOAD : SMALL_LOAD;
  console.log(`\x1b[36m\n>> New user! Adding load of ${loadToAdd}.. ${n} left\x1b[0m`);
  addConnectionToServer(loadToAdd);
  if (n <= 0) return;
  setTimeout(() => {
    addLoadNTimes(n - 1, loopTime);
  }, loopTime);
}

const removeLoadNTimes = (n, loopTime) => {
  const loadToRemove = Math.random() > CHANCE_FOR_SMALL_LOAD ? LARGE_LOAD : SMALL_LOAD;
  removeConnectionFromServer(Math.floor(Math.random() * servers.length), loadToRemove);
  if (n <= 0) return;
  setTimeout(() => {
    removeLoadNTimes(n - 1, loopTime);
  }, loopTime);
}

const runTest = () => {
  console.log(`\x1b[36m *** Running the Round Shadfar: ${NUM_SERVERS} servers, +${TIMES_TO_RUN} users *** \x1b[0m`);
  setTimeout(() => {
    setupInitialServers(NUM_SERVERS);
    // Add a new heavy load to begin with
    addConnectionToServer(LARGE_LOAD);
    addLoadNTimes(TIMES_TO_RUN, LOOP_TIME);
    if (REMOVE_ENABLED) setTimeout(() => {
      const removeDelay = Math.ceil(((TIMES_TO_RUN * LOOP_TIME) - LOOP_TIME * 6) / TIMES_TO_DELETE);
      console.log(`Starting remove cycle ${TIMES_TO_DELETE}x with delay ${removeDelay}`);
      removeLoadNTimes(TIMES_TO_DELETE, removeDelay);
    }, LOOP_TIME * 6)
  }, 1000);
}

runTest();
