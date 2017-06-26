Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
var ConfigPlugin;
(function (ConfigPlugin) {
    function Register(config) {
        return function (OriginalClassConstructor) {
            const createNameExtension = () => {
                i = i + 1;
                return '_PluginConfig_' + OriginalClassConstructor.name + i;
            };
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
                value: createNameExtension()
            });
            return PluginConfigRegister;
        };
    }
    ConfigPlugin.Register = Register;
})(ConfigPlugin = exports.ConfigPlugin || (exports.ConfigPlugin = {}));
