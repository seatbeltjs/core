Object.defineProperty(exports, "__esModule", { value: true });
var ConfigPlugin;
(function (ConfigPlugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            class PluginConfigRegister extends OriginalClassConstructor {
                constructor() {
                    super(...arguments);
                    this.__seatbeltPluginName = config.name;
                    this.__seatbeltPluginType = 'config';
                }
            }
            PluginConfigRegister.prototype = OriginalClassConstructor.prototype;
            PluginConfigRegister.constructor = OriginalClassConstructor.constructor;
            Object.defineProperty(PluginConfigRegister, 'name', {
                value: OriginalClassConstructor.name
            });
            return PluginConfigRegister;
        };
    }
    ConfigPlugin.Register = Register;
})(ConfigPlugin = exports.ConfigPlugin || (exports.ConfigPlugin = {}));
