var text = require('textbelt');

text.send('4158231330', 'txt balt sez harroo~!', undefined, function(err) {
  if (err) {
    console.log(err);
  }
});

/*
curl -X POST http://textbelt.com/text -d number=4158231330 -d "message=I sent this message for free with textbelt.com"

   */
