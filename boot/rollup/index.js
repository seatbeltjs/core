Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../../");
const fs_1 = require("fs");
const path_1 = require("path");
const spawn = require('child_process').spawn;
class Rollup {
    constructor(path) {
        this.log = new _1.Log('Seatbelt-Rollup');
        this.appPath = path;
    }
    createImports(cb) {
        this.seatbeltPath = path_1.join(this.appPath, '.seatbelt');
        this.log.system('rolling up files to path', this.seatbeltPath);
        if (!fs_1.existsSync(this.seatbeltPath)) {
            fs_1.mkdirSync(this.seatbeltPath);
        }
        const rollup = require('rollup');
        const npmSpawn = spawn(`npm`, ['bin']);
        let npmBin;
        const logs = [];
        npmSpawn.stdout.on('data', (data) => {
            npmBin = data.toString().replace(/\n/g, '');
            const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/index.ts', '--output', this.seatbeltPath + '/index.js']);
            const logs = [];
            rollupSpawn.stdout.on('data', (data) => {
                logs.push(data.toString());
            });
            rollupSpawn.stderr.on('data', (data) => {
                logs.push(data.toString());
            });
            rollupSpawn.on('close', (code) => {
                this.log.system(`[rollup]`, ...logs);
                cb();
            });
        });
    }
    createIndex(cb) {
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
            const rollupSpawn = spawn(`node`, [`${npmBin}/rollup`, '--config', this.seatbeltPath + '/rollupconfig.js', '--input', this.seatbeltPath + '/index.ts', '--output', this.seatbeltPath + '/index.js']);
            const logs = [];
            rollupSpawn.stdout.on('data', (data) => {
                logs.push(data.toString());
            });
            rollupSpawn.stderr.on('data', (data) => {
                logs.push(data.toString());
            });
            rollupSpawn.on('close', (code) => {
                this.log.system(`[rollup]`, ...logs);
                cb();
            });
        });
    }
}
exports.Rollup = Rollup;
