import * as Request0 from '/home/thomas/git/seatbelt/example/middleware/helmet';
import * as Request1 from '/home/thomas/git/seatbelt/example/routes/get';
const exportsObject = {};
for (let variable in Request0) {
    if (Request0 && Request0[variable] && Request0[variable].prototype) {
        exportsObject[variable + '__0'] = new Request0[variable]();
    }
}

for (let variable in Request1) {
    if (Request1 && Request1[variable] && Request1[variable].prototype) {
        exportsObject[variable + '__1'] = new Request1[variable]();
    }
}

export function allImports() {
  return exportsObject;
}
    