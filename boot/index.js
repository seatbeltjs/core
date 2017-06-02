Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const _1 = require("../");
const ts_import_creator_1 = require("./ts_import_creator");
const rollup_1 = require("./rollup");
const boot_app_1 = require("./boot_app");
const CONFIG_FOLDER = '.seatbelt';
const CONFIG_JSON = 'seatbelt.json';
const callerName = () => {
    if (module.parent && module.parent.parent && module.parent.parent.filename) {
        return path_1.dirname(module.parent.parent.filename);
    }
    else if (module.parent && module.parent.filename) {
        return path_1.dirname(module.parent.filename);
    }
};
class Seatbelt {
    constructor() {
        this.log = new _1.Log('Seatbelt');
        this._root = '';
    }
    _setRoot(root) {
        this._root = root;
    }
    getRoot() {
        return this._root;
    }
    _initConfig(cb) {
        const configFolder = path_1.join(this.getRoot(), CONFIG_FOLDER);
        const configFolderExist = fs_1.existsSync(configFolder);
        const configJson = path_1.join(configFolder, CONFIG_JSON);
        const configJsonExist = fs_1.existsSync(path_1.join(this.getRoot(), CONFIG_FOLDER, CONFIG_JSON));
        return cb();
    }
    _bootApp() {
        return new boot_app_1.BootApp(this.getRoot()).init();
    }
    _createTSImporter() {
        return new ts_import_creator_1.TSImportCreator(this.getRoot()).init();
    }
    _rollUpFiles(cb) {
        const rollup = new rollup_1.Rollup(this.getRoot());
        rollup.initImports();
        return rollup.init(cb);
    }
    strap() {
        this._setRoot(callerName());
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._createTSImporter();
        this._rollUpFiles(() => {
            this._bootApp();
        });
    }
}
exports.Seatbelt = Seatbelt;
