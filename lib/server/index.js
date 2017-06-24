Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
const helpers_1 = require("../../helpers");
var Server;
(function (Server) {
    function Register() {
        return (OriginalClassConstructor) => {
            if (helpers_1.isPropertyDecorator(OriginalClassConstructor)) {
                const log = new log_1.Log('ServerRegister');
                return log.system('server wrapper cannot be used as a property wrapper');
            }
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.__seatbeltPlugin = 'server';
                    this.__log = new log_1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    this.__log.system('registering server => ', this.name);
                }
            }
            return ServerRegister;
        };
    }
    Server.Register = Register;
})(Server = exports.Server || (exports.Server = {}));
