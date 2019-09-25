/**
 * @file From "Six Things You probably Didn't Know JS Could Do Natively"
 */

 /**
  * Cast a list to the specified type
  */
 const castList = () => {
    let originalList = [1, '10', '100'];
    const casted = originalList.map(Number);

    const added = casted.reduce((v, i) => v + i, 0);
    console.log('Cast List:', added);
 };

 /**
  * Flatten nested arrays, if supported
  */
const flattenNested = () => {
    try {
        let list = [1, 2, 40, [4, 5, 7], [[5, 6], [8, 9, 10], 10]];
        const flattened = list.flat();
        console.log('Flat:', flattened);
    } catch (e) {
        console.log('Seems flat is not supported? Confirm:', e.message);
    }
};

/**
 * Freezing and sealing an object from mutability
 */
const objectFunctions = () => {
    let obj = {
        key: 'init val'
    };

    Object.seal(obj);

    obj.key = 'not init val';
    obj.anotherKey = 'another key';

    console.log('After Sealing:', Object.keys(obj), Object.values(obj));

    Object.freeze(obj);

    obj.key = 'should not be this';
    console.log('After Freezing:', Object.keys(obj), Object.values(obj));
};

 const main = () => {
    castList();
    flattenNested();
    objectFunctions();
 };

main();
