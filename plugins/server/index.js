Object.defineProperty(exports, "__esModule", { value: true });
var ServerPlugin;
(function (ServerPlugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            class ServerRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'server';
                }
            }
            ServerRegister.prototype = OriginalClassConstructor.prototype;
            ServerRegister.constructor = OriginalClassConstructor.constructor;
            Object.defineProperty(ServerRegister, 'name', { value: OriginalClassConstructor.name });
            return ServerRegister;
        };
    }
    ServerPlugin.Register = Register;
})(ServerPlugin = exports.ServerPlugin || (exports.ServerPlugin = {}));
