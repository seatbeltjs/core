import { DExpress, IServer } from '../src';

@DExpress()
export class Server implements IServer {
  public middleware = [
    require('helmet')()
  ];
}
