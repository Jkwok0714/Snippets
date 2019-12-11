chrome.runtime.onMessage.addListener(request => {
    switch (request) {
        case 'START_RECORDING':
            console.log('START_RECORDING');
            startRecording();
            break;
        case 'STOP_RECORDING':
            console.log('STOP_RECORDING');
            break;
        default:
            console.log('UNKNOWN_REQUEST');
    }
});

/**
 * Leverage chrome's tabCapture API with this fake extension
 */
const startRecording = () => {
    const videoConstraints = {
        mandatory: {
            chromeMediaSource: 'tab'
        }
    }
    const options = { audio: true, video: true, videoConstraints };
    chrome.tabCapture.capture(options, (stream) => {
        if (stream === null) return console.log(`Last Error: ${chrome.runtime.lastError.message}`);

        const recorder = new MediaRecorder(stream);

        /** When we have data, read it into a binary string so it can be sent. */
        recorder.addEventListener('dataavailable', event => {
            const { data: blob } = event;
            let reader = new FileReader();
            reader.readAsBinaryString(blob);
            reader.onloadend = () => {
                /** Check if sendData function given to us. If so, send */
                if (window.sendData) {
                    window.sendData(reader.result);
                }
            };

        });

        /** Utlimate mathings for record time */
        const timeslice = 1 * 1000;
        recorder.start(timeslice);
    });
}