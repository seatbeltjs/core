Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var Plugin;
(function (Plugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            class PluginRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'plugin';
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                }
            }
            PluginRegister.prototype = OriginalClassConstructor.prototype;
            PluginRegister.constructor = OriginalClassConstructor.constructor;
            return PluginRegister;
        };
    }
    Plugin.Register = Register;
})(Plugin = exports.Plugin || (exports.Plugin = {}));
