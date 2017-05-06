"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
function DValidateRequest(requiredParams) {
    return function (hostClass, functionName, functionAttributes) {
        const originalMethod = functionAttributes.value;
        functionAttributes.value = (controller, serverController) => {
            console.log('decorator called', requiredParams.isJoi);
            Joi.validate(controller.params, requiredParams, (err) => {
                if (!err) {
                    return originalMethod(controller, serverController);
                }
                else {
                    controller.send({ status: 400, json: err });
                }
            });
        };
    };
}
exports.DValidateRequest = DValidateRequest;
