import { Log } from '../../log';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
const scanFolder = require('scan-folder');

export class TSImportCreator {
  private log = new Log('Seatbelt-TSImportCreator');
  private appPath: string;
  private seatbeltPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  private _createImportsTS(files: string[]) {
    let importTemplate = '';
    let exportTemplate = 'const exportsObject = {};';
    files.forEach((file, i) => {
      file = file.slice(0, -3);
      importTemplate += `import * as Request${i} from '${file}';\n`;
      exportTemplate += `
for (let variable in Request${i}) {
    if (Request${i} && Request${i}[variable] && Request${i}[variable].prototype) {
        exportsObject[variable + '__${i}'] = new Request${i}[variable]();
    }
}
`;
    });
    let exportStatement = `
export function allImports() {
  return exportsObject;
}
    `;

    this.log.system();
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    };
    writeFileSync(join(this.seatbeltPath, 'imports.ts'), importTemplate + exportTemplate + exportStatement);
  }
  public init() {
    this.log.system('creating ts importer');
    const files = scanFolder(this.appPath, 'ts', true).filter((path: string) => path.indexOf('/.seatbelt/') === -1);
    this.log.system('files found', files);
    this._createImportsTS(files);
  }
};
