/**
 * @file Trying out the textbelt API
 * Created Oct 17 2017
 */

var text = require('textbelt');

const textelt = process.argv[2];

text.send(textelt, 'txt balt sez harroo~!', undefined, function(err) {
  if (err) {
    console.log(err);
  }
});

/*
curl -X POST http://textbelt.com/text -d number=4158231330 -d "message=I sent this message for free with textbelt.com"

   */
