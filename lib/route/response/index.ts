import { Plugin } from '../../../plugins';
import { Decorator } from '../../../helpers';
import { Log, Route } from '../../';

const __allRegisteredResponses: any = [];

export namespace Response {
  export interface Base {
    send: (status: number, body: Object) => any;
    ok: (body: Object) => any;
    created: (body: Object) => any;
    badRequest: (body: Object) => any;
    unauthorized: (body: Object) => any;
    forbidden: (body: Object) => any;
    notFound: (body: Object) => any;
    serverError: (body: Object) => any;
  }
}
