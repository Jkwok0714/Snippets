/**
 * @file String replacement e.g. for localization or custom text
 * Testing to create some form of email template injection system
 * Created Aug 28 2019
 */

/**
 * Dictionary of strings
 */
const localizations = {
  en: {
    lz_today: 'Today is',
    lz_feeling: 'I am very tired'
  },
  ch: {
    lz_today: '今天是',
    lz_feeling: '我現在不開心。'
  }
}

let originalHtmlString = `<div>*(lz_today)* *|date|* *(lz_feeling)*</div>`;

/**
 * Inject stuff
 * @param {string} toLocalize The input value without localizations
 * @param {string} lang Which locale's dictionary to use
 */
const localize = (toLocalize, lang) => {
  const re = new RegExp('\\*\\((.*?)\\)\\*', 'g');
  console.log('re test', re.test(toLocalize));
  console.log(localizations[lang]);
  return toLocalize.replace(re, (match, p1) => localizations[lang][p1]);
};

console.log(localize(originalHtmlString, 'en'));
