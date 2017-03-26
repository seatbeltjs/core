import { Route } from '../../src';

@Route({
  path: '/',
  type: 'GET'
})
export class HomeRoute {
  public init(req: Object, res: Object) {

  }
}
