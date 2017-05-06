"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../../log");
const fs_1 = require("fs");
const path_1 = require("path");
const spawn = require('child_process').spawn;
class Rollup {
    constructor(path) {
        this.log = new log_1.Log('Seatbelt-Rollup');
        this.appPath = path;
    }
    init(cb) {
        this.seatbeltPath = path_1.join(this.appPath, '.seatbelt');
        this.log.system('rolling up files to path', this.seatbeltPath);
        if (!fs_1.existsSync(this.seatbeltPath)) {
            fs_1.mkdirSync(this.seatbeltPath);
        }
        const rollup = require('rollup');
        const npmSpawn = spawn(`npm`, ['bin']);
        let npmBin;
        npmSpawn.stdout.on('data', (data) => {
            npmBin = data.toString().replace(/\n/g, '');
            const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/imports.ts', '--output', this.seatbeltPath + '/index.js']);
            rollupSpawn.stdout.on('data', (data) => {
                this.log.system(`[rollup]: ${data}`);
            });
            rollupSpawn.stderr.on('data', (data) => {
                this.log.error(`[rollup] error: ${data}`);
            });
            rollupSpawn.on('close', (code) => {
                cb();
            });
        });
    }
}
exports.Rollup = Rollup;
