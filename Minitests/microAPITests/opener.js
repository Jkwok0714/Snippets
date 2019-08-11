/**
 * @file Opens stuff from node. yee
 * Created Apr 24 2018
 */

"use strict";

const express = require('express');
const opn = require('opn');
const app = express();
const PORT_NUMBER = 3000;

/*
// Specify the app to open in
opn('http://sindresorhus.com', {app: 'firefox'});

// Specify app arguments
opn('http://sindresorhus.com', {app: ['google chrome', '--incognito']});
*/

app.get('/open', (req, res) => {
  let requestedSite = req.query.site || 'google';
  console.log('Request query', requestedSite);
  opn(`https://www.${requestedSite}.com`, {app: 'google chrome'});
  res.send('OPENEDED');
});

app.post('/post', (req, res) => {
  console.log('Request', req.query);
  res.send('POST');
});

app.listen(PORT_NUMBER, () => console.log(`The Opener listening on port ${PORT_NUMBER}!`));
