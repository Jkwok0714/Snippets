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
