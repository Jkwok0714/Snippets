const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const pathToExtension = path.join(__dirname, 'extension');
const videoPath = path.join(__dirname, `video_${Date.now()}.webm`);

/**
 * We need the extension ID in order to launch this whitelist, and I heard it changes often
 * It needs to run in headful to load the extension, etc..
 */
const getExtId = async () => {
    const browser = await puppeteer.launch({
        args: [
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
        ],
        headless: false
    });

    await browser.newPage();

    const targets = await browser.targets();
    const backgroundPageTarget = targets.find(target => target.type() === 'background_page' && target._targetInfo.title === 'Recorder');

    const extensionUrl = backgroundPageTarget._targetInfo.url || '';
    const [, , extensionID] = extensionUrl.split('/');

    console.log('Got extension id', extensionID);
    await browser.close();
    return extensionID;
}

/**
 * Do the youtube navigation stuff
 * @param {puppeteer.Page} page 
 */
const handleYoutubing = async (page) => {
    await page.goto('https://youtube.com', { waitUntil: 'networkidle2' });
    await page.type('#search', 'Insomnium While We Sleep');
    await page.click('button#search-icon-legacy');

    await page.waitForSelector('ytd-thumbnail.ytd-video-renderer');

    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer');
    await videos[0].click();
    await page.waitForSelector('.html5-video-container');
    await page.waitForSelector('button.ytp-ad-skip-button', { visible: true });
    await page.click('button.ytp-ad-skip-button');
};

/**
 * Main runner
 * open browser, search a Youtube link, and invoke a recording
 */
const main = async () => {
    const extensionId = await getExtId();

    const browser = await puppeteer.launch({
        args: [
            `--whitelisted-extension-id=${extensionId}`,
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-notifications',
            '--window-size=1280,720',
            '--disable-dev-shm-usage',
            `--disable-extensions-except=${pathToExtension}`,
            `--load-extension=${pathToExtension}`,
            '--autoplay-policy=no-user-gesture-required',
            '--no-sandbox',
            '--app'
        ],
        headless: false,
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1280,
        height: 720
    });

    await handleYoutubing(page);

    const targets = await browser.targets();
    const backgroundPageTarget = targets.find(target => target.type() === 'background_page' && target.url().startsWith(`chrome-extension://${extensionId}/`));
    const backgroundPage = await backgroundPageTarget.page();

    /** Expose sendData so the data can be sent back to us */
    await backgroundPage.exposeFunction('sendData', (data) => {
        console.log('Send data called with expose functions');
        const buffer = new Buffer(data, 'binary');
        fs.appendFile(videoPath, buffer, () => {

        });
    });

    /** Call the extension to start recording */
    await backgroundPage.evaluate(() => {
        startRecording();
        return Promise.resolve(42);
    });

    await page.waitFor(15 * 1000);
    await browser.close();
    process.exit();
};

main();
