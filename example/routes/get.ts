import { DRoute, IRoute } from '../../src';

@DRoute({
  path: '/',
  type: 'GET',
  policies: [
    'LocalHost'
  ]
})
export class HomeRoute implements IRoute {
  public controller (req: any, res: any) {
    return res.send('worked');
  }
}
