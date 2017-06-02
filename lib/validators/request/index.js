Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
function DValidateRequest(requiredParams) {
    return function (hostClass, functionName, functionAttributes) {
        const originalMethod = functionAttributes.value;
        functionAttributes.value = function (controller, serverController) {
            Joi.validate(controller.params, Joi.object().keys(requiredParams(Joi)), (err) => {
                if (!err) {
                    return originalMethod.apply(this, [controller, serverController]);
                }
                else {
                    controller.send({ status: 400, json: err });
                }
            });
        };
        functionAttributes.value.bind(this);
    };
}
exports.DValidateRequest = DValidateRequest;
