const { inhabitants } = require('../junkData');

const hash = inhabitants.reduce((acc, char) => {
  acc[char.id] = char;
  return acc;
}, {});

let list = [];

const generateList = (n) => {
  for (let i = 0; i < n; i++) {
    list.push({
      id : i,
      value: Math.floor(Math.random() * 100),
      owner: Math.floor(Math.random() * inhabitants.length),
      type: Math.random() > 0.5 ? 'Artifact' : 'Skill'
    });
  }
};

const mapFunction = (el) => {
  return Object.assign({}, el, { owner: hash[el.owner] });
}

const filterFunction = (el) => {
  return el.type !== 'Artifact';
}

const fmap = (list, filterFunc, mapFunc) => {
  return list.reduce((acc, curr) => {
    return filterFunc(curr) ? [...acc, mapFunc(curr)] : acc;
  }, []);
}

const main = () => {
  generateList(7);
  console.log(list);

  let mapThenFilter = list.map(mapFunction).filter(filterFunction);
  console.log('Using map then filter\n', mapThenFilter);
  let fmapped = fmap(list, filterFunction, mapFunction);
  console.log('Using fmap\n', fmapped);
}

main();
