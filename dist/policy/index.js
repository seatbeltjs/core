"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DPolicy(config) {
    return (OriginalClassConstructor) => {
        return function () {
            const origin = OriginalClassConstructor.prototype;
            if (config && config.name) {
                origin.__name__ = config.name;
            }
            else {
                origin.__name__ = OriginalClassConstructor.name;
            }
            origin.__seatbelt__ = 'policy';
            return OriginalClassConstructor.prototype;
        };
    };
}
exports.DPolicy = DPolicy;
