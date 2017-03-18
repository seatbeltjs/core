export interface IPut {
  put: any;
}

export class Put implements IPut {
  public put() {
    console.log('put strapped');
  }
}
