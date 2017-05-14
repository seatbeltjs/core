Object.defineProperty(exports, "__esModule", { value: true });
function DRoute(config) {
    return function (OriginalClassConstructor) {
        return class extends OriginalClassConstructor {
            constructor() {
                super();
                if (typeof config.type === 'string') {
                    config.type = [config.type];
                }
                if (typeof config.path === 'string') {
                    config.path = [config.path];
                }
                if (!config.policies) {
                    config.policies = [];
                }
                if (typeof config.policies === 'string') {
                    config.policies = [config.policies];
                }
                this.__seatbelt_config__ = config;
                this.__seatbelt__ = 'route';
            }
        };
    };
}
exports.DRoute = DRoute;
