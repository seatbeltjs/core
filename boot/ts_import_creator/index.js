Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
const fs_1 = require("fs");
const path_1 = require("path");
const scanFolder = require('scan-folder');
class TSImportCreator {
    constructor(path) {
        this.log = new _1.Log('Seatbelt-TSImportCreator');
        this.appPath = path;
    }
    _createRollupConfig() {
        const rollupConfigPath = path_1.join(this.seatbeltPath, 'rollupconfig.js');
        const rollupTemplate = `import typescript from 'rollup-plugin-typescript';
export default {
  format: 'cjs',
  useStrict: false,
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfig: './tsconfig.json'
    })
  ]
};
`;
        this.log.system('writing rollup config at path ', rollupConfigPath, rollupTemplate.length);
        fs_1.writeFileSync(rollupConfigPath, rollupTemplate);
    }
    _createPath() {
        this.seatbeltPath = path_1.join(this.appPath, '.seatbelt');
        if (!fs_1.existsSync(this.seatbeltPath)) {
            fs_1.mkdirSync(this.seatbeltPath);
        }
    }
    _createImportsTS(files) {
        this.seatbeltPath = path_1.join(this.appPath, '.seatbelt');
        let exportTemplate = '';
        files.forEach((file, i) => {
            file = file.slice(0, -3);
            exportTemplate += `export * from '${file}';\n`;
        });
        fs_1.writeFileSync(path_1.join(this.seatbeltPath, 'index.ts'), exportTemplate);
    }
    ;
    _createServerTS(files) {
        this.writePath = path_1.join(this.seatbeltPath, 'server.ts');
        let template = `import * as AllFileExportsFromProject from './index';

class Seatbelt {
  constructor() {

    const hooks = [];
    const pluginNames = [];

    if (AllFileExportsFromProject && typeof AllFileExportsFromProject === 'object') {
      Object.keys(AllFileExportsFromProject).forEach(variable => {
        let newItem;
        if (AllFileExportsFromProject[variable] && AllFileExportsFromProject[variable].prototype) {
          newItem = new AllFileExportsFromProject[variable]();
        } else {
          newItem = AllFileExportsFromProject[variable];
        }
        if (typeof newItem === 'object' && newItem.__seatbeltPlugin) {
          if (newItem.__seatbeltPlugin === 'server') {
            this.server = newItem;
          } else if (newItem.__seatbeltPlugin && typeof newItem.__seatbeltPlugin === 'string') {
            if (!this[newItem.__seatbeltPlugin]) {
              this[newItem.__seatbeltPlugin] = [];
              pluginNames.push(newItem.__seatbeltPlugin);
              if (newItem.__seatbelt_hook__ && typeof newItem.__seatbelt_hook__ === 'function') {
                hooks.push(newItem.__seatbelt_hook__);
              }
            }
            this[newItem.__seatbeltPlugin].push(newItem);
          }
        }
      });
    }

    hooks.forEach(hook => {
      hook(this);
    });

    if (!this.server) {
      throw new Error('failed to initialize server, did you forget to export one?')
    }

    if (this.server.plugins && Array.isArray(this.server.plugins)) {
      this.server.plugins.forEach(plugin => {
        pluginNames.forEach(pluginName => {
          if (plugin[pluginName] && typeof plugin[pluginName] === typeof (() => {})) {
            plugin[pluginName](this[pluginName]);
          }
        });
      });
    }

    if (this.server.config(this.route)) {
      this.server.config(this.route);
    }

    if (this.server.plugins && Array.isArray(this.server.plugins)) {
      this.server.plugins.forEach(plugin => {
        if (plugin.server && typeof plugin.server === typeof (() => {})) {
          plugin.server(this.server);
        }
      });
    }
  }
}

const seatbelt = new Seatbelt();

seatbelt.server.init();
`;
        this.log.system('writing to path', this.writePath, '' + template.length);
        fs_1.writeFileSync(this.writePath, template);
        this._createRollupConfig();
    }
    init() {
        this.log.system('creating ts importer');
        const files = scanFolder(this.appPath, 'ts', true).filter((path) => path.indexOf('/.seatbelt/') === -1);
        this.log.system('files found', files);
        this._createPath();
        this._createImportsTS(files);
        this._createServerTS(files);
    }
}
exports.TSImportCreator = TSImportCreator;
