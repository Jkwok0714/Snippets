let groupBy = (input, key) => {
  return input.reduce((accumulator, ele) => {
    //Push element to accumulator's object that is named by its requested key
    let result = accumulator[ele[key]] = accumulator[ele[key]] || [];
    result.push(ele);
    return accumulator;
  }, {});
};

const BEER_SERIES = {
  S1: 'HOPSPLOSION',
  S2: 'WATER GODDESS',
  S3: 'BELIEVING HEARTS'
};

let beers = [
  { name: 'Pyrocumulus Hopslosion', style: 'IPA', series: BEER_SERIES.S1 },
  { name: '#Stoked on Galaxy', style: 'Pale Ale', series: BEER_SERIES.S1 },
  { name: 'H2O Sourdough', style: 'Wheat', series: BEER_SERIES.S2 },
  { name: 'Unfresh Squeezed', style: 'IPA', series: BEER_SERIES.S1 },
  { name: 'Lychee Pagoda', style: 'Blonde', series: BEER_SERIES.S3 },
  { name: 'Touched by Aqua', style: 'American Light', series: BEER_SERIES.S2 }
];

console.log(JSON.stringify(groupBy(beers, 'series'), null, 2));
console.log(JSON.stringify(groupBy(beers, 'style'), null, 2));
