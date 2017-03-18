export interface IValidator {
  validator: any;
}

export class Validator implements IValidator {
  public validator() {
    console.log('validator strapped');
  }
}
