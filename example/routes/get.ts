import { Route } from '../../src';

@Route({
  path: '/',
  type: 'GET'
})
export class HomeRoute {
  public hello: string = 'hi';
  public policies: string[] = [
    'LocalHost'
  ];
  public controller (req: any, res: any) {
    return res.send('worked');
  }
}
