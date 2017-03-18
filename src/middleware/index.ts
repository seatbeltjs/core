export interface IMiddleware {
  middleware: any;
}

export class Middleware implements IMiddleware {
  public middleware() {
    console.log('middleware strapped');
  }
}
