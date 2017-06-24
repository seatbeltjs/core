Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
function DServerRegister() {
    return (OriginalClassConstructor) => {
        if (typeof OriginalClassConstructor === 'function') {
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.log = new log_1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    this.__seatbelt_plugin_name__ = 'server';
                    this.log.system('registering server');
                }
            }
            return ServerRegister;
        }
        else {
            const log = new log_1.Log('ServerRegister');
            log.system('server wrapper cannot be used as a property wrapper');
        }
    };
}
exports.DServerRegister = DServerRegister;
