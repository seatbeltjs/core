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
  this.seatbeltPath = join(this.appPath, '.seatbelt');
  this.writePath = join(this.seatbeltPath, 'server.ts');
  let template = `import * as Request from './index';

class Seatbelt {
  constructor() {

    if (Request && typeof Request === 'object') {
      Object.keys(Request).forEach(variable => {
        if (Request[variable] && Request[variable].prototype) {
          const newItem = new Request[variable]();
          if (newItem.__seatbelt__ === 'server') {
            this.server = newItem;
          } else if (newItem.__seatbelt__) {
            if (!this[newItem.__seatbelt__]) {
              this[newItem.__seatbelt__] = [];
            }
            this[newItem.__seatbelt__].push(newItem);
          }
        }
      });
    }

    if (this.server && this.server.plugins && Array.isArray(this.server.plugins)) {
      this.server.plugins.forEach(plugin => {
        if (plugin.routes && typeof plugin.routes === typeof (() => {})) {
          plugin.routes(this.route);
        }
      });
    }

    this.server.__seatbelt_server_config__(this.route);

    if (this.server && this.server.plugins && Array.isArray(this.server.plugins)) {
      this.server.plugins.forEach(plugin => {
        if (plugin.server && typeof plugin.server === typeof (() => {})) {
          plugin.server(this.server);
        }
      });
    }
  }
}

const seatbelt = new Seatbelt();

seatbelt.server.__seatbelt_server_init__();
`;

    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    }
    this.log.system('writing to path', this.writePath, '' + template.length);
    writeFileSync(this.writePath, template);
    this._createRollupConfig();
  }
  public init() {
    this.log.system('creating ts importer');
    const files = scanFolder(this.appPath, 'ts', true).filter((path: string) => path.indexOf('/.seatbelt/') === -1);
    this.log.system('files found', files);
    this._createImportsTS(files);
    this._createServerTS(files);
  }
}
