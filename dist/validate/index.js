"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require('joi');
function DValidateRequest(requiredParams) {
    return function (hostClass, functionName, functionAttributes) {
        const originalMethod = functionAttributes.value;
        functionAttributes.value = (route) => {
            console.log('decorator called', requiredParams.isJoi);
            Joi.validate(route.params, requiredParams, (err) => {
                if (!err) {
                    return originalMethod(route);
                }
                else {
                    route.reply(err);
                }
            });
        };
    };
}
exports.DValidateRequest = DValidateRequest;
;
