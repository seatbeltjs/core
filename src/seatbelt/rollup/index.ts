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
    this.seatbeltPath = join(this.appPath, '.seatbelt');
    this.log.system('rolling up files to path', this.seatbeltPath);
    if (!existsSync(this.seatbeltPath)) {
      mkdirSync(this.seatbeltPath);
    }
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
      onwarn: ( loc: any, frame: any, message: any ) => {
        console.log('warning');
        if ( loc ) {
          console.warn( `${loc.file} (${loc.line}:${loc.column}) ${message}` );
          if ( frame ) {
            console.warn( frame );
          }
        } else {
          console.warn( message );
        }
      },
      dest: this.seatbeltPath + '/index.js'
    })
    .then(( bundle: any ) => {
      this.log.system('rollup bundle created', bundle);
      const result = bundle.generate({
        // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
        format: 'cjs'
      });
      this.log.system('writing rollup bundle', join(this.seatbeltPath, 'index.js'), result.code.length);
      writeFileSync(join(this.seatbeltPath, 'index.js'), result.code);
      return cb();
    })
    .catch((err: Error) => {
      this.log.error('error with rollup', err.stack);
    });
  }
}
