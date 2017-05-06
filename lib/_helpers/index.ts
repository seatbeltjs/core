declare var Error: any;

function getStack() {
  // Save original Error.prepareStackTrace
  const origPrepareStackTrace = Error.prepareStackTrace;

  // Override with function that just returns `stack`
  Error.prepareStackTrace = function (_: any, stack: any) {
    return ;
  };

  // Create a new `Error`, which automatically gets `stack`
  const err = new Error();

  // Evaluate `err.stack`, which calls our new `Error.prepareStackTrace`
  const stack = err.stack;

  // Restore original `Error.prepareStackTrace`
  Error.prepareStackTrace = origPrepareStackTrace;

  // Remove superfluous function call on stack
  stack.shift(); // getStack --> Error

  return stack;
}

function getCaller() {
  const stack: any = getStack();

  // Remove superfluous function calls on stack
  stack.shift(); // getCaller --> getStack
  stack.shift(); // omfg --> getCaller

  // Return caller's caller
  return stack[1].receiver;
}

export function getCallerPath() {
  const caller = getCaller();
  console.log(caller.filename);
}
