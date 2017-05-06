const Joi = require('joi');

export function DValidateRequest(requiredParams: any) {
  return function(hostClass: any, functionName: string, functionAttributes: any) {
    const originalMethod = functionAttributes.value;
    functionAttributes.value = (controller: any, serverController: any) => {
      Joi.validate(controller.params, Joi.object().keys(requiredParams), (err: any) => {
        if (!err) {
          return originalMethod(controller, serverController);
        } else {
          controller.send({status: 400, json: err});
        }
      });
    };
  };
}
