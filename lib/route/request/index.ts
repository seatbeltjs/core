import { Plugin } from '../../../plugins';
import { Decorator } from '../../../helpers';
import { Log, Route } from '../../';

const __allRegisteredRequest: any = {};

export namespace Request {
  export interface Base {
    allParams: Object;
  }
}
