export interface IGet {
  get: any;
}

export class Get implements IArguments {
  public get() {
    console.log('get strapped');
  }
}
