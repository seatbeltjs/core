import { Middleware } from '../../src';

@Middleware({
  weight: 1
})
export class HelmetJSMiddleware {
  public middleware = require('helmet')();
}
