Object.defineProperty(exports, "__esModule", { value: true });
function DRegisterServer() {
    return (OriginalClassConstructor) => {
        if (typeof OriginalClassConstructor === 'function') {
            return class extends OriginalClassConstructor {
                constructor() {
                    super();
                    console.log('registering server');
                    this.__name__ = OriginalClassConstructor.name;
                    this.__seatbelt__ = 'server';
                }
            };
        }
        else {
            console.log('server wrapper cannot be used as a property wrapper');
        }
    };
}
exports.DRegisterServer = DRegisterServer;
