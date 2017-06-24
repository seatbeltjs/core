Object.defineProperty(exports, "__esModule", { value: true });
function isClassDecorator(constructorFunction) {
    return typeof constructorFunction === 'function';
}
exports.isClassDecorator = isClassDecorator;
function isPropertyDecorator(constructorFunction) {
    return typeof constructorFunction !== 'function';
}
exports.isPropertyDecorator = isPropertyDecorator;
