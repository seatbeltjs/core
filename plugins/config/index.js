Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
var ConfigPlugin;
(function (ConfigPlugin) {
    function Register(config) {
        return (OriginalClassConstructor) => {
            class PluginRegister extends OriginalClassConstructor {
                constructor(...params) {
                    super(...params);
                    this.__seatbeltPlugin = 'config';
                    this.__log = new _1.Log('ServerRegister');
                    this.name = OriginalClassConstructor.name;
                    if (config && config.name) {
                        this.__seatbeltPlugin = config.name;
                    }
                    this.__log.system('registering plugin => ', this.name);
                }
            }
            return PluginRegister;
        };
    }
    ConfigPlugin.Register = Register;
})(ConfigPlugin = exports.ConfigPlugin || (exports.ConfigPlugin = {}));
