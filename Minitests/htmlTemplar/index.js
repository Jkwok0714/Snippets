const express = require('express');
const htmlDir = __dirname;
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const TEMPLATES = require('./templates');

const readFile = promisify(fs.readFile);

const app = express();
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
};

const applyStrings = (baseTemplate, useTemplate) => {
  let result = baseTemplate;
  Object.keys(useTemplate).forEach(key => {
    const target = `*|${key}|*`;
    console.log(`Attempting to replace ${target} with ${useTemplate[key]}`);
    result = result.replace(target, useTemplate[key]);
  })
  return result;
};

const applyTemplate = (baseTemplate, name = 'SIGNUP') => {
  return new Promise ((resolve, reject) => {
    const useTemplate = TEMPLATES[name] ? TEMPLATES[name] : TEMPLATES[defaultTemplate];
    const applyOptionalBlock = (baseTemplate, str) => baseTemplate.replace('*|optionalBlock|*', str);;

    // Do optional block first
    if (useTemplate.optionalBlock) {
      // Read block file
      readFile(path.join(__dirname, `${useTemplate.optionalBlock}.html`), encoding).then(str => {
        baseTemplate = applyOptionalBlock(baseTemplate, str);
        resolve(applyStrings(baseTemplate, useTemplate));
      }).catch(err => {
        baseTemplate = applyOptionalBlock(baseTemplate, '');
        delete useTemplate.optionalBlock;
        resolve(applyStrings(baseTemplate, useTemplate));
      });
    } else {
      baseTemplate = applyOptionalBlock(baseTemplate, '');
      resolve(applyStrings(baseTemplate, useTemplate));
    }
  });
};

const getPage = (res, template = null) => {
  loadHTML().then(htmlString => {
    return applyTemplate(htmlString, template);
  }).then(finalString => {
    res.send(finalString);
  }).catch(err => {
    console.error(err);
  })
};

app.get('/test', (req, res) => {
    res.send(testHtmlString);
});

app.get('/', (req, res) => {
    getPage(res);
});

app.get('/template/:templateName', (req, res) => {
    // console.log('template var', req.params);
    const { templateName } = req.params;
    getPage(res, templateName.toUpperCase());
});

app.listen(port, () => {
  console.log(`Lame static server listening on :${port}`);
});
