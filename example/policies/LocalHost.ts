import { Policy } from '../../src';

@Policy()
export class LocalHost {
  public policy (req: any, res: any, next: any) {
    console.log('policy working');
    return next();
  }
}
