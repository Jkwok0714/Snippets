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

function startRecording() {
    console.log('Starting to record.');

    const videoConstraints = {
        mandatory: {
            chromeMediaSource: 'tab'
        }
    }

    const options = { audio: true, video: true, videoConstraints };
    chrome.tabCapture.capture(options, (stream) => {
        if (stream === null) {
            console.log(`Last Error: ${chrome.runtime.lastError.message}`);
            return;
        }

        let recorder;
        try {
            recorder = new MediaRecorder(stream);
        } catch (err) {
            console.log(err.message);
            return;
        }

        recorder.addEventListener('dataavailable', event => {
            const { data: blob } = event;
            let reader = new FileReader();
            reader.readAsBinaryString(blob);
            reader.onloadend = () => {
                if (window.sendData) {
                    window.sendData(reader.result);
                }
            };

        });
        const timeslice = 1 * 1000;
        recorder.start(timeslice);
    });
}