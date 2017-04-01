import { Route } from '../../src';

@Route({
  path: '/',
  type: 'GET'
})
export class HomeRoute {
  public hello: string = 'hi';
  public init(req: Object, res: Object) {
    return 'worked';
  }
}
