import * as Joi from 'joi';

export function DValidateRequest(requiredParams: (Joi: any) => any) {
  return function(hostClass: any, functionName: string, functionAttributes: any) {
    const originalMethod = functionAttributes.value;
    functionAttributes.value = function (controller: any, serverController: any) {
      Joi.validate(controller.params, Joi.object().keys(requiredParams(Joi)), (err: any) => {
        if (!err) {
          return originalMethod.apply(this, [controller, serverController]);
        } else {
          controller.send({status: 400, json: err});
        }
      });
    };
    functionAttributes.value.bind(this);
  };
}
