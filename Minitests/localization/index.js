const localizations = {
  en: {
    lz_today: 'Today is',
    lz_feeling: 'I am very tired'
  }
}

let originalHtmlString = `<div>*(lz_today)* *|date|* *(lz_feeling)*</div>`;

const localize = (toLocalize, lang) => {
  const re = new RegExp('\\*\\((.*?)\\)\\*', 'g');
  console.log('re test', re.test(toLocalize));
  console.log(localizations[lang]);
  return toLocalize.replace(re, (match, p1) => localizations[lang][p1]);
};

console.log(localize(originalHtmlString, 'en'));
