const express = require('express');
const htmlDir = __dirname;
const app = express();
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const TEMPLATES = require('./templates');

const readFile = promisify(fs.readFile);

const port = process.env.PORT || 3001;
const encoding = 'utf8';
const defaultTemplate = 'SIGNUP';

app.use(express.static(__dirname));

app.use((req, res, next) => {
  console.log('Got request', req.method, req.url);
  next();
});

const testHtmlString = `<body><h2>Insomnium</h2><ul>
  <li>Markus Hirvonen</li><li>Niilo Sevanen</li>
  <li>Markus Vanhala</li><li>Ville Friman</li>
  </ul></body>`;

const loadHTML = () => {
  return new Promise((res, rej) => {
    readFile(path.join(__dirname, '/template.html'), encoding).then(str => {
      res(str);
    }).catch(err => {
      rej(err);
    })
  });
}

const applyStrings = (baseTemplate, useTemplate) => {
  let result = baseTemplate;
  Object.keys(useTemplate).forEach(key => {
    const target = `*|${key}|*`;
    console.log(`Attempting to replace ${target} with ${useTemplate[key]}`);
    result = result.replace(target, useTemplate[key]);
  })
  return result;
}

const applyTemplate = (baseTemplate, name = 'SIGNUP') => {
  return new Promise ((resolve, reject) => {
    const useTemplate = TEMPLATES[name] ? TEMPLATES[name] : TEMPLATES[defaultTemplate];

    const applyOptionalBlock = (baseTemplate, str) => baseTemplate.replace('*|optionalBlock|*', str);;

    console.log('useTemplate', useTemplate);
    // Do optional block first
    if (useTemplate.optionalBlock) {
      // Read block file
      console.log('There is an optional block');
      readFile(path.join(__dirname, `${useTemplate.optionalBlock}.html`), encoding).then(str => {
        baseTemplate = applyOptionalBlock(baseTemplate, str);
        resolve(applyStrings(baseTemplate, useTemplate));
      }).catch(err => {
        console.log('Optional block template does not exist!');
        baseTemplate = applyOptionalBlock(baseTemplate, '');
        delete useTemplate.optionalBlock;
        resolve(applyStrings(baseTemplate, useTemplate));
      });
    } else {
      console.log('There is no optional block');
      baseTemplate = applyOptionalBlock(baseTemplate, '');
      resolve(applyStrings(baseTemplate, useTemplate));
    }
  });
}

const getPage = (res, template = null) => {
  loadHTML().then(htmlString => {
    return applyTemplate(htmlString, template);
  }).then(finalString => {
    res.send(finalString);
  }).catch(err => {
    console.error(err);
  })
}

app.get('/test', (req, res) => {
    // response.sendfile(htmlDir + 'template.html');
    res.send(testHtmlString);
});

app.get('/', (req, res) => {
    // response.sendfile(htmlDir + 'template.html');
    getPage(res);
});

app.get('/welcome', (req, res) => {
    // response.sendfile(htmlDir + 'template.html');
    getPage(res, 'WELCOME');
    // res.send(htmlString);
});

app.listen(port, function() {
  console.log(`Lame static server listening on :${port}`);
});
