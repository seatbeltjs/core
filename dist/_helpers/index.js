"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStack() {
    const origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
        return;
    };
    const err = new Error();
    const stack = err.stack;
    Error.prepareStackTrace = origPrepareStackTrace;
    stack.shift();
    return stack;
}
function getCaller() {
    const stack = getStack();
    stack.shift();
    stack.shift();
    return stack[1].receiver;
}
function getCallerPath() {
    const caller = getCaller();
    console.log(caller.filename);
}
exports.getCallerPath = getCallerPath;
