const schemasMiddleware= require("./schemas");
const Joi = require("joi");
function validateJoiGetError(data,schema){
    const schemaJoi = Joi.object(schema);
    const {error} = schemaJoi.validate(data);
    let errorResponse=null
    if(error && error.details && error.details[0] && error.details[0].message )
        errorResponse=error.details[0].message
    return errorResponse;
}
function validacionJoi(  tipo ,schema){
    return function(req,res,next) {
        const errorCatch=validateJoiGetError(req[tipo],schemasMiddleware[schema] );
        errorCatch ? next( new Error(errorCatch) ) : next()
    }
}
module.exports = validacionJoi
