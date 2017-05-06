const Joi = require('joi');

export function DValidateRequest(requiredParams: any) {
  return function(hostClass: any, functionName: string, functionAttributes: any) {
    const originalMethod = functionAttributes.value;
    functionAttributes.value = (route: any) => {
      console.log('decorator called', requiredParams.isJoi);
      Joi.validate(route.params, requiredParams, (err: any) => {
        if (!err) {
          return originalMethod(route);
        } else {
          route.reply(err);
        }
      });
    };
  };

};
