import { DExpressServer, CExpressServer, IExpressServer } from '../src';

@DExpressServer()
export class Server implements IExpressServer {
  public middleware = [
    require('helmet')()
  ];
}
