Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var ServerPlugin;
(function (ServerPlugin) {
    function Register() {
        return (OriginalClassConstructor) => {
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super();
                    this.__seatbeltPlugin = 'server';
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    this.__log.system('registering server => ', this.name);
                }
            }
            return ServerRegister;
        };
    }
    ServerPlugin.Register = Register;
})(ServerPlugin = exports.ServerPlugin || (exports.ServerPlugin = {}));
