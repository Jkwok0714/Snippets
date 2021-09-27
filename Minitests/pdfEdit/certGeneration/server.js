/**
 * @File Test back end for generating "cert" PDFs
 * Created Sep 23 2020
 */

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const fs = require('fs');

const PORT = 3000;
let cache = null;

app.use(bodyParser.json());

/**
 * Translate keys into placeholders found in template
 */
const keyDict = {
	name: 'ATTENDEE_NAME',
	event: 'EVENT_NAME',
	date: 'EVENT_DATE',
	host: 'HOST_NAME',
	innerColor: '#33A6C3',
	outerColor: '#66BCD2',
};

/**
 * Read template into memory
 */
const getTemplate = async () => {
	return new Promise(resolve => {
		fs.readFile('./template.html', 'utf8', (err, data) => {
			cache = data;
			resolve(data);
		});
	});
};

/**
 * Build the HTML data with the params
 * @param {*} params 
 * @returns {Promise<string>}
 */
const buildHTML = async (params) => {
	let template = cache ? cache : await getTemplate();
	const re = new RegExp('\\*\\((.*?)\\)\\*', 'g');
	const dict = {};
	Object.keys(params).forEach(key => dict[keyDict[key]] = params[key]);
	return template.replace(re, (match, p1) => {
		console.log(p1, dict[p1])
		return dict[p1];
	});
};

const getFilePath = () => `./cert_${Date.now()}.pdf`;

/**
 * Generate a PDF using node-html-pdf
 * @param {*} params 
 */
const generatePDF = async (params) => {
	const template = await buildHTML(params);
	pdf.create(template, {
		height: '750px',
		width: '1200px',
		zoomFactor: '0.75',
	}).toFile(getFilePath(), (err, res) => {
		if (err) console.error(err);
	});
};

/**
 * Generate a PDF using puppeteer
 * @param {*} params 
 */
const generatePDFPuppeteer = async (params) => {
	console.log('Using Puppeteer method');
	const template = await buildHTML(params);
	/* Puppeteer renders the size differently */
	template.replace('height: 730px;', 'height: 100vh;');
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.setContent(template);
	// await (await page).addStyleTag({
	// 	content: '@page { size: auto; }',
	// })
	await page.emulateMedia('screen');
	await page.pdf({
		path: getFilePath(),
		// format: 'Letter',
		height: '750px',
		width: '1200px',
		// landscape: true,
		printBackground: true,
	});
	await browser.close();
};

/**
 * Remove all the PDFs
 */
const cleanUpServer = () => {
	fs.readdir('./', (err, files) => {
		for (const file of files) {
			if (file.indexOf('.pdf') > -1) {
				fs.unlink(`./${file}`, () => { });
			}
		}
	});
};

/*
 * ==== Express Stuff ====
 */

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/generate', (req, res) => {
	console.log('Generate called', req.body);
	if (req.body.puppeteer) {
		generatePDFPuppeteer(req.body);
	} else {
		generatePDF(req.body);
	}
	res.end('Done');
});

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
	getTemplate();
});

/* Call cleanup when Node quits */
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
	process.on(eventType, cleanUpServer.bind(null, eventType));
});
