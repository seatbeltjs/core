import { Log } from '../../log';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
const spawn = require('child_process').spawn;

export class Rollup {
  private log = new Log('Seatbelt-Rollup');
  private appPath: string;
  private seatbeltPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init(cb: Function) {
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    this.log.system('rolling up files to path', this.seatbeltPath);
    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    }
    const rollup = require( 'rollup' );

    const npmSpawn = spawn(`npm`, ['bin']);
    let npmBin;
    npmSpawn.stdout.on('data', (data: string) => {
      npmBin = data.toString().replace(/\n/g, '');
      const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/imports.ts', '--output', this.seatbeltPath + '/index.js']);
      rollupSpawn.stdout.on('data', (data: string) => {
        this.log.system(`[rollup]: ${data}`);
      });
      rollupSpawn.stderr.on('data', (data: string) => {
        this.log.error(`[rollup] error: ${data}`);
      });
      rollupSpawn.on('close', (code: number) => {
        cb();
      });
    });
  }
}
