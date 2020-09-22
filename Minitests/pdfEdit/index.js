const PDFParser = require('pdf2json');

const main = () => {
	let pdfParser = new PDFParser();

	pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
	pdfParser.on("pdfParser_dataReady", pdfData => {
		console.log(pdfData, 'page data:',
			pdfData.formImage.Pages[0]);
		// fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
	});

	pdfParser.loadPDF("./sample.pdf");
};

main();

// const hummus = require('hummus');

// /**
//  * Returns a byteArray string
//  * 
//  * @param {string} str - input string
//  */
// function strToByteArray(str) {
// 	var myBuffer = [];
// 	var buffer = new Buffer(str);
// 	for (var i = 0; i < buffer.length; i++) {
// 		myBuffer.push(buffer[i]);
// 	}
// 	return myBuffer;
// }

// function replaceText(sourceFile, targetFile, pageNumber, findText, replaceText) {
// 	var writer = hummus.createWriterToModify(sourceFile, {
// 		modifiedFilePath: targetFile
// 	});
// 	var modifier = new hummus.PDFPageModifier(writer, pageNumber);
// 	var sourceParser = writer.createPDFCopyingContextForModifiedFile().getSourceDocumentParser();
// 	var pageObject = sourceParser.parsePage(pageNumber);
// 	var textObjectId = pageObject.getDictionary().toJSObject().Contents.getObjectID();
// 	var textStream = sourceParser.queryDictionaryObject(pageObject.getDictionary(), 'Contents');
// 	//read the original block of text data
// 	var data = [];
// 	var readStream = sourceParser.startReadingFromStream(textStream);
// 	while (readStream.notEnded()) {
// 		Array.prototype.push.apply(data, readStream.read(10000));
// 	}
// 	// var string = new Buffer(data).toString().replace(findText, replaceText);
// 	var string = Buffer.from(data).toString();

// 	var characters = findText;
// 	var match = [];
// 	for (var a = 0; a < characters.length; a++) {
// 		match.push('(-?[0-9]+)?(\\()?' + characters[a] + '(\\))?');
// 	}

// 	string = string.replace(new RegExp(match.join('')), function (m, m1) {
// 		// m1 holds the first item which is a space
// 		return m1 + '( ' + replaceText + ')';
// 	});
 
// 	//Create and write our new text object
// 	var objectsContext = writer.getObjectsContext();
// 	objectsContext.startModifiedIndirectObject(textObjectId);

// 	var stream = objectsContext.startUnfilteredPDFStream();
// 	stream.getWriteStream().write(strToByteArray(string));
// 	objectsContext.endPDFStream(stream);

// 	objectsContext.endIndirectObject();

// 	writer.end();
// }

// const main = async () => {
// 	replaceText('./sample.pdf', './sample-edit.pdf', 0, 'Name', 'Label');
// };

// main().catch(err => console.error(err));
