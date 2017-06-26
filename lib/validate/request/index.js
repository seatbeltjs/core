Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const _1 = require("../../");
function ValidateRequest(joyFunction) {
    return function (hostClass, functionName, functionAttributes) {
        const originalMethod = functionAttributes.value;
        functionAttributes.value = function (req, res, server) {
            return Joi.validate(req.allParams, Joi.object().keys(joyFunction(Joi)), (err) => {
                if (!err) {
                    return originalMethod.apply(this, [req, res, server]);
                }
                else {
                    const log = hostClass.log || new _1.Log('Joi');
                    log.error(err);
                    return res.send(400, err);
                }
            });
        };
    };
}
exports.ValidateRequest = ValidateRequest;
