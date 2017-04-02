import { Log } from '../../log';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

export class Rollup {
  private log = new Log('Seatbelt-Rollup');
  private appPath: string;
  private seatbeltPath: string;
  constructor(path: string) {
    this.appPath = path;
  }
  public init(cb: Function) {
    this.log.system('rolling up files');
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    };
    const rollup = require( 'rollup' );

    return rollup.rollup({
      entry: this.seatbeltPath + '/imports.ts',
      format: 'cjs',
      plugins: [
        require('rollup-plugin-node-resolve')({
          extensions: [ '.ts', '.js', '.json' ]
        }),
        require('rollup-plugin-typescript')({
          typescript: require('typescript')
        })
      ],
      dest: this.seatbeltPath + '/index.js'
    })
    .then(( bundle: any ) => {
      const result = bundle.generate({
        // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
        format: 'cjs'
      });
      writeFileSync(join(this.seatbeltPath, 'index.js'), result.code);
      return cb();
    });
  }
};
