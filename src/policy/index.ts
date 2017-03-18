export interface IPolicy {
  policy: any;
}

export class Policy implements IPolicy {
  public policy() {
    console.log('policy strapped');
  }
}
