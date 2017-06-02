Object.defineProperty(exports, "__esModule", { value: true });
function DRoute(config) {
    return function (OriginalClassConstructor) {
        class Route extends OriginalClassConstructor {
            constructor() {
                super();
                this.__seatbelt_config__ = config;
                this.name = OriginalClassConstructor.name;
                this.__seatbelt__ = 'route';
                if (typeof this.__seatbelt_config__.type === 'string') {
                    this.__seatbelt_config__.type = [this.__seatbelt_config__.type];
                }
                if (typeof this.__seatbelt_config__.path === 'string') {
                    this.__seatbelt_config__.path = [this.__seatbelt_config__.path];
                }
                if (!this.__seatbelt_config__.policies) {
                    this.__seatbelt_config__.policies = [];
                }
                if (typeof this.__seatbelt_config__.policies === 'string') {
                    this.__seatbelt_config__.policies = [this.__seatbelt_config__.policies];
                }
            }
        }
        return Route;
    };
}
exports.DRoute = DRoute;
