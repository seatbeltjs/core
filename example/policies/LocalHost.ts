import { DPolicy, IPolicy } from '../../src';

@DPolicy()
export class LocalHost implements IPolicy {
  public policy (req: any, res: any, next: any) {
    console.log('policy working');
    return next();
  }
}
