Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var ConfigPlugin;
(function (ConfigPlugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            class PluginConfigRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'config';
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                }
            }
            PluginConfigRegister.prototype = OriginalClassConstructor.prototype;
            PluginConfigRegister.constructor = OriginalClassConstructor.constructor;
            return PluginConfigRegister;
        };
    }
    ConfigPlugin.Register = Register;
})(ConfigPlugin = exports.ConfigPlugin || (exports.ConfigPlugin = {}));
