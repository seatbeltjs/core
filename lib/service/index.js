Object.defineProperty(exports, "__esModule", { value: true });
const serviceRegister = {};
function DService() {
    return (OriginalClassConstructor, wrappedName, valueObject) => {
        if (typeof OriginalClassConstructor === 'function') {
            const origin = new OriginalClassConstructor();
            origin.__name__ = OriginalClassConstructor.name;
            origin.__seatbelt__ = 'service';
            serviceRegister[OriginalClassConstructor.name] = origin;
            return origin;
        }
        else {
            OriginalClassConstructor[wrappedName] = serviceRegister;
        }
    };
}
exports.DService = DService;
