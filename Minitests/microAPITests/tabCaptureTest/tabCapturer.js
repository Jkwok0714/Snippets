/**
 * @file Use the tab capture API in Chrome to get Media objects
 * Created Aug 22 2018
 */

const defaultSize = {
    width: 1320,
    height: 900
};

const communicationURL = 'http://localhost:3002';
const version = '0.0.1';

const defaultMinFrameRate = 24;
const defaultMaxFrameRate = 30;


// TabCapturer class by Isaac Zhang

class TabCapturer {
  constructor (a, b, options = {}) {
    this.mediaRecorder = null;
    this.socket = null;

    this.recordInterval = 1000;

    this.minFrameRate = options.minFrameRate || defaultMinFrameRate;
    this.maxFrameRate = options.maxFrameRate || defaultMaxFrameRate;
  }

  start () {

    this.socket = io.connect(communicationURL);
    chrome.tabs.getSelected(null, (tab) => {
      this.capture();
    })
  }

  end () {
    this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
    this.mediaRecorder.stop();
  }

  capture () {
    console.log('Calling capture...');
    let resolutions = this.getResolutions();
    const defaultAspectRatio = 16 / 9;

    let constraints = {
      audio: true,
      video: true,
      videoConstraints: {
        mandatory: {
          chromeMediaSource: 'tab',
          // maxWidth: resolutions.maxWidth,
          maxHeight: resolutions.maxHeight,
          minFrameRate: this.minFrameRate,
          maxFrameRate: this.maxFrameRate,
          minAspectRatio: defaultAspectRatio,
          googLeakyBucket: true,
          googTemporalLayeredScreencast: true
        }
      }
    };

    chrome.tabCapture.capture(constraints, this.gotStream.bind(this));
  }

  getResolutions () {
    return {    // 1080p
        maxWidth: 1920,
        maxHeight: 1080
    };
  }

  gotStream(stream) {
    console.log('got stream for capture on v.', version);

    if (!stream) {
      // setDefaults();
      chrome.windows.create({
        url: "data:text/html,<h1>" + chrome.runtime.lastError.message + "Internal error occurred while capturing the screen.</h1>",
        type: 'popup',
        width: screen.width / 2,
        height: 170
      });

      this.sendErrorToServer(chrome.runtime.lastError.message);
      return;
    }

    stream.onended = () => {
      // setDefaults();
      chrome.runtime.reload();
    };

    this.sendStreamToServer(stream);

    // chrome.browserAction.setIcon({
    //   path: 'images/pause22.png'
    // });
  }

  sendStreamToServer(stream) {
    const options = {
      audioBitsPerSecond: this.audioBitsPerSecond,
      videoBitsPerSecond: this.videoBitsPerSecond,
      mimeType: this.mimeType
    };

    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = e => {
      const blob = e.data; //new Blob([e.data], {type: 'video/mp4'});

      console.log('ondataavailable');

      let reader = new FileReader()
      reader.readAsArrayBuffer(blob);
      reader.onloadend = (event) => {
        if (this.socket.connected) {
          this.sendDataToServer(reader.result);
        } else {
          //cache it locally
          this.buffer.push(blob);
        }
      };
    };
    this.mediaRecorder.onerror = (e) => {
      console.log('error ', e);
      this.sendErrorToServer(e.message ? e.message : e);
    };

    this.mediaRecorder.start(this.recordInterval); // each 1000 millisecond, trigger ondataavailable

    this.isRecording = true;
  }

  sendDataToServer(data) {
    if (this.socket) this.socket.emit('data', data);
  }

  sendErrorToServer(errorMessage) {
    this.socket.emit('clientError', errorMessage);
  }
}
