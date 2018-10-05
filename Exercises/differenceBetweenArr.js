const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 2];

const compareChanges = (arr1, arr2) => {
  let added = [], removed = [];
  let hash = {};

  let newList = new Set(arr2);
  let oldList = new Set(arr1);
  removed = arr1.filter(el => !newList.has(el));
  added = arr2.filter(el => !oldList.has(el));
  return { added, removed };
}
console.log('arr1', arr1, 'arr2', arr2);
console.log(compareChanges(arr1, arr2));
