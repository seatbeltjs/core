Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var ServerPlugin;
(function (ServerPlugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'server';
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                }
            }
            ServerRegister.prototype = OriginalClassConstructor.prototype;
            ServerRegister.constructor = OriginalClassConstructor.constructor;
            return ServerRegister;
        };
    }
    ServerPlugin.Register = Register;
})(ServerPlugin = exports.ServerPlugin || (exports.ServerPlugin = {}));
