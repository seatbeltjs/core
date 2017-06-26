import { Log } from '../../';
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync } from 'fs';
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
    const rollupTemplate = readFileSync(join(__dirname, 'rollup.js.template'));
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
    writeFileSync(join(this.seatbeltPath, 'imports.ts'), exportTemplate);
  };

  private _createServerTS(files: string[]) {
    this.writePath = join(this.seatbeltPath, 'index.ts');
    let template = readFileSync(join(__dirname, 'boot.ts.template'));

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
