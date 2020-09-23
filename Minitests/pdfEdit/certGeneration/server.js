/**
 * @File Test back end for generating "cert" PDFs
 */

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');

const PORT = 3000;
let cache = null;

app.use(bodyParser.json());

const keyDict = {
	name: 'ATTENDEE_NAME',
	event: 'EVENT_NAME',
	date: 'EVENT_DATE',
	host: 'HOST_NAME',
	innerColor: '#33A6C3',
	outerColor: '#66BCD2',
};

const getTemplate = async () => {
	return new Promise(resolve => {
		fs.readFile('./template.html', 'utf8', (err, data) => {
			cache = data;
			resolve(data);
		});
	});
};

const generatePDF = async (params) => {
	let template = cache ? cache : await getTemplate();
	const re = new RegExp('\\*\\((.*?)\\)\\*', 'g');
	const dict = {};
	Object.keys(params).forEach(key => dict[keyDict[key]] = params[key]);
	template = template.replace(re, (match, p1) => {
		console.log(p1, dict[p1])
		return dict[p1];
	});
	// console.log(template)
	pdf.create(template, {
		// format: 'Letter',
		// orientation: 'landscape',
		height: '750px',
		width: '1200px',
		zoomFactor: '0.75',
	}).toFile(`./cert_${Date.now()}.pdf`, (err, res) => {
		if (err) console.error(err);
	});
};

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/generate', (req, res) => {
	console.log('Generate called', req.body);
	generatePDF(req.body);
	res.end('Done');
});

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
	getTemplate();
});
