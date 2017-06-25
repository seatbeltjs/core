import * as Joi from 'joi';
import { Decorator } from '../../../helpers';

export type Joi = typeof Joi;

export type JoyCallback = (Joi: Joi) => Joi.SchemaMap;

export function ValidateRequest(joyFunction: JoyCallback): Decorator.MethodDecorator {
  return function(hostClass: any, functionName: string, functionAttributes: any): void {
    const originalMethod = functionAttributes.value;

    functionAttributes.value = function (req: any, res: any, server: any) {
      return Joi.validate(req.allParams, Joi.object().keys(joyFunction(Joi)), (err: any) => {
        if (!err) {
          return originalMethod.apply(this, [req, res, server]);
        } else {
          return res.send(400, err);
        }
      });
    };
  };
}
