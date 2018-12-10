const func1  = {};
const func2 = () => console.log('Hello there.');

const checkCallback = (func) => {
  const isFunction = func instanceof Function;
  console.log('func is a function?', isFunction);
  if (isFunction) {
    func();
  } else {
    console.log('Invalid callback passed');
  }
};

checkCallback(func1);
checkCallback(func2);
