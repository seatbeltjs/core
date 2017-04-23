import { DRoute, IRoute } from '../../src';

@DRoute({
  path: '/',
  type: 'GET',
  policies: [
    'LocalHost'
  ]
})
export class HomeRoute implements IRoute {
  public controller (route: any) {
    return route.reply(JSON.stringify(Object.keys(route)));
  }
}
