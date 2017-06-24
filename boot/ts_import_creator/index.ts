import { Log } from '../../';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
const scanFolder = require('scan-folder');

export class TSImportCreator {
  private log = new Log('Seatbelt-TSImportCreator');
  private appPath: string;
  private seatbeltPath: string;
  private writePath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  private _createRollupConfig() {
    const rollupConfigPath = join(this.seatbeltPath, 'rollupconfig.js');
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
    writeFileSync(rollupConfigPath, rollupTemplate);
  }
  private _createPath() {
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    }
  }
  private _createImportsTS(files: string[]) {
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    let exportTemplate = '';
    files.forEach((file, i) => {
      file = file.slice(0, -3);
      exportTemplate += `export * from '${file}';\n`;
    });
    writeFileSync(join(this.seatbeltPath, 'index.ts'), exportTemplate);
  };
  private _createServerTS(files: string[]) {
    this.writePath = join(this.seatbeltPath, 'server.ts');
    let template = `import * as Request from './index';

class Seatbelt {
  constructor() {

    const hooks = [];
    const pluginNames = [];

    console.log(Request);

    if (Request && typeof Request === 'object') {
      Object.keys(Request).forEach(variable => {
        if (Request[variable] && Request[variable].prototype) {
          const newItem = new Request[variable]();
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
    writeFileSync(this.writePath, template);
    this._createRollupConfig();
  }
  public init() {
    this.log.system('creating ts importer');
    const files = scanFolder(this.appPath, 'ts', true).filter((path: string) => path.indexOf('/.seatbelt/') === -1);
    this.log.system('files found', files);
    this._createPath();
    this._createImportsTS(files);
    this._createServerTS(files);
  }
}
