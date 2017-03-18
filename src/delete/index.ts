export interface ISeatbelt {
  strap: any;
}

export class Delete implements ISeatbelt {
  public strap() {
    console.log('delete strapped');
  }
}
