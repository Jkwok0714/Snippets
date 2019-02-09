/** 
 * Writing the stack trace when a function is called or error thrown
 */

let tracer = (msg) => {
	let tracerError = new Error();
  let traceString = tracerError.stack.toString();
  console.log('%cNEW TRACER LOG', 'color: #4286f4')
  //console.log('TRACE:', traceString);
  console.log('CALLER:', findCaller(traceString));
  console.log('Caller property', tracer.caller.name);
	console.log('LOG:', typeof msg === 'object' ? msg.message : msg);
}

let findCaller = (traceString) => {
	return traceString.split('at ')[3].split(' ')[0];
}

let func1 = () => {
	tracer('tyler');
}

let func2 = () => {
	tracer('isaac');
}

func1();
func2();

let func3 = () => {
	let errorMe = {};
  try {
		let voided = errorMe.hello.nope[5];
  } catch (e) {
		tracer(e);
  }
}

func3();

//Printing Stuff


const COLORS = {
	RED: '#f90727',
  GREEN: '#31c438',
  YELLOW: '#ffec5e',
  GRAY: '#bababa'
}

let messages = [
	{color: '#ddd', message: 'this is a message'},
  {color: '#4286f4', message: 'good stuff'},
  {color: '#f90727', message: 'really bad'}
];

let buildStringForCopy = (array) => {
	return array.map(a => a.message).join('\n');
};

let addInfoLog = (...messageArgs) => {
	messages.push({color: COLORS.GRAY, message: messageArgs.join(' ')});
};
let addSuccessLog = (...messageArgs) => {
	messages.push({color: COLORS.GREEN, message: messageArgs.join(' ')});
};
let addErrorLog = (...messageArgs) => {
	messages.push({color: COLORS.RED, message: messageArgs.join(' ')});
};
let addColoredLog = (color, ...messageArgs) => {
	messages.push({color: color, message: messageArgs.join(' ')});
};

let printMessagesToChromeConsole = (array) => {
	array.map(el => {
  	console.log(`%c ${el.message}`, `color: ${el.color}`);
  	return;
  });
};

addInfoLog('Started the test phase');
addInfoLog('Everything before was starter dummy data');
let number = 69;
addSuccessLog('Initiated a number', number);
try {
	let dummy = fool;
} catch (e) {
	addErrorLog('Got an error', e.message);
}
addColoredLog(COLORS.YELLOW, 'Here is a custom yellow log', number);
addColoredLog('#3697c4', 'Non-constant blue log');
let obj = { name: 'Tylero' };
addInfoLog('What happens if we pass an object?', obj);
addInfoLog('Closing test phase and printing');
printMessagesToChromeConsole(messages);
console.log('Built string of messages:\n', buildStringForCopy(messages));
