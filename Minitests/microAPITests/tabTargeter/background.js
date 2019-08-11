/**
 * @file Test  some Chrome APIs for tab targeting, captires, etc.
 * Created Aug 27 2018
 */

const STATES = {
  QUERY_TABS: 0,
  CAPTURE_TABS: 1,
  STOP_CAPTURES: 2,
  CLOSE_TABS: 3
};
const RECORD_INTERVAL = 1000;

let state = STATES.QUERY_TABS;
let mediaRecorder = null;
let chosenTabId = null;

const constraints = {
  audio: true,
  video: true,
  videoConstraints: {
    mandatory: {
      chromeMediaSource: 'tab',
    }
  }
};

const pickRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];;
}

const handleCaptureStream = (stream) => {
  if (!stream) {
    console.log('No stream, probably active tab error ahh');
    return;
  }
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = e => {
    const blob = e.data;
    console.log('Got data');
  }
  mediaRecorder.start(RECORD_INTERVAL);
}

const stopCaptureStream = () => {
  try {
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    mediaRecorder.stop();
  } catch (e) {

  }
}

chrome.browserAction.onClicked.addListener(() => {
  switch (state) {
    case STATES.QUERY_TABS:
      chrome.tabs.query({}, arr =>{
        console.log('Queried tabs data:', arr);
        console.log('The IDs are,', arr.map(tab => tab.id));
      })
      break;
    case STATES.CAPTURE_TABS:

      chrome.tabs.query({}, arr => {
        const selectedTab = pickRandom(arr);
        console.log(`Selected tab ${selectedTab.id}, named "${selectedTab.title}"`);
        chosenTabId = selectedTab.id;
        chrome.tabs.highlight({ tabs: [selectedTab.index] }, (win) => {
          chrome.tabCapture.capture(constraints, stream => {
            handleCaptureStream(stream);
          });
        });
      })
      break;
    case STATES.STOP_CAPTURES:
      console.log('Stopping capture stream');
      stopCaptureStream();
      break;
    case STATES.CLOSE_TABS:
      if (!chosenTabId) break;
      console.log(`Closing tab of ID ${chosenTabId}`);
      chrome.tabs.remove(chosenTabId, () => {
        console.log('Closed the tab.');
        chosenTabId = null;
      });
      state = STATES.QUERY_TABS;
      break;
    default:
      break;
  }
  state++;
});
