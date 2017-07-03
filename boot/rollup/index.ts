import { Log } from '../../';
import { join } from 'path';
const spawn = require('child_process').spawn;

export class Rollup {
  private log = new Log('Seatbelt-Rollup');
  private appPath: string;
  private seatbeltPath: string;

  constructor(path: string) {
    this.appPath = path;
  }

  public createImports(cb: Function) {
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    this.log.system('rolling up files to path', this.seatbeltPath);
    const rollup = require( 'rollup' );

    const npmSpawn = spawn(`npm`, ['bin']);
    let npmBin;
    const logs: string[] = [];
    npmSpawn.stdout.on('data', (data: string) => {
      npmBin = data.toString().replace(/\n/g, '');
      const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/index.ts', '--output', this.seatbeltPath + '/index.js']);
      const logs: string[] =  [];
      rollupSpawn.stdout.on('data', (data: string) => {
        logs.push(data.toString());
      });
      rollupSpawn.stderr.on('data', (data: string) => {
        logs.push(data.toString());
      });
      rollupSpawn.on('close', (code: number) => {
        this.log.system(`[rollup]`, ...logs);
        cb();
      });
    });
  }

  public createIndex(cb: Function) {
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    this.log.system('rolling up files to path', this.seatbeltPath);
    const rollup = require( 'rollup' );

    const npmSpawn = spawn(`npm`, ['bin']);
    let npmBin;
    npmSpawn.stdout.on('data', (data: string) => {
      npmBin = data.toString().replace(/\n/g, '');
      const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/index.ts', '--output', this.seatbeltPath + '/index.js']);
      const logs: string[] = [];
      rollupSpawn.stdout.on('data', (data: string) => {
        logs.push(data.toString());
      });
      rollupSpawn.stderr.on('data', (data: string) => {
        logs.push(data.toString());
      });
      rollupSpawn.on('close', (code: number) => {
        this.log.system(`[rollup]`, ...logs);
        cb();
      });
    });
  }
}
