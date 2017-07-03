Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const _1 = require("../");
const ts_import_creator_1 = require("./ts_import_creator");
const rollup_1 = require("./rollup");
const boot_app_1 = require("./boot_app");
const fs_1 = require("fs");
const CONFIG_FOLDER = '.seatbelt';
const CONFIG_JSON = 'seatbelt.json';
const removeFolder = function removeFolder(location) {
    const files = fs_1.readdirSync(location);
    files.forEach((file) => {
        file = location + '/' + file;
        const stat = fs_1.statSync(file);
        if (stat.isDirectory()) {
            return removeFolder(file);
        }
        else {
            fs_1.unlinkSync(file);
        }
    });
    fs_1.rmdirSync(location);
};
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
        this.strap = this.init;
    }
    init() {
        this._setRoot(callerName());
        if (fs_1.existsSync(path_1.join(this.getRoot(), '.seatbelt'))) {
            removeFolder(path_1.join(this.getRoot(), '.seatbelt'));
        }
        fs_1.mkdirSync(path_1.join(this.getRoot(), '.seatbelt'));
        this.log.system('▬▬▬▬(๑๑)▬▬▬▬ setbelt strapped to', this.getRoot());
        this._createTSImporter();
        this._rollUpFiles(() => {
            this._bootApp();
        });
    }
    ;
    _setRoot(root) {
        this._root = root;
    }
    getRoot() {
        return this._root;
    }
    _bootApp() {
        return new boot_app_1.BootApp(this.getRoot()).init();
    }
    _createTSImporter() {
        return new ts_import_creator_1.TSImportCreator(this.getRoot()).init();
    }
    _rollUpFiles(cb) {
        const rollup = new rollup_1.Rollup(this.getRoot());
        rollup.createImports(() => {
            return rollup.createIndex(cb);
        });
    }
}
exports.Seatbelt = Seatbelt;
