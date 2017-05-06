"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const fs_1 = require("fs");
const path_1 = require("path");
const scanFolder = require('scan-folder');
class TSImportCreator {
    constructor(path) {
        this.log = new log_1.Log('Seatbelt-TSImportCreator');
        this.appPath = path;
    }
    _createImportsTS(files) {
        this.seatbeltPath = path_1.join(this.appPath, '.seatbelt');
        this.writePath = path_1.join(this.seatbeltPath, 'imports.ts');
        let importTemplate = '';
        let exportTemplate = '\nconst exportsObject = {};\n';
        files.forEach((file, i) => {
            file = file.slice(0, -3);
            importTemplate += `import * as Request${i} from '${file}';\n`;
            exportTemplate += `
if (Request${i} && typeof Request${i} === 'object') {
  Object.keys(Request${i}).forEach(variable => {
    if (Request${i}[variable] && Request${i}[variable].prototype) {
      exportsObject[variable + '__${i}'] = new Request${i}[variable]();
    }
  });
}
`;
        });
        let exportStatement = `
export function allImports() {
  return exportsObject;
}
`;
        if (!fs_1.existsSync(this.seatbeltPath)) {
            fs_1.mkdirSync(this.seatbeltPath);
        }
        const fullTemplate = importTemplate + exportTemplate + exportStatement;
        this.log.system('writing to path', this.writePath, '' + fullTemplate.length);
        fs_1.writeFileSync(this.writePath, fullTemplate);
    }
    init() {
        this.log.system('creating ts importer');
        const files = scanFolder(this.appPath, 'ts', true).filter((path) => path.indexOf('/.seatbelt/') === -1);
        this.log.system('files found', files);
        this._createImportsTS(files);
    }
}
exports.TSImportCreator = TSImportCreator;
