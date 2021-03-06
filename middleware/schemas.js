const Joi = require("joi");
module.exports={
    registerUser:{
        "user":Joi.string().min(3).max(12).required(),
        "password":Joi.string().min(7).max(12).required()
    },
    loginUser:{
        "user":Joi.string().min(3).max(12).required(),
        "password":Joi.string().min(7).max(12).required()
    },
    fileDowload:{
        "Filename":Joi.string().min(3).max(30).required()
    },
    findCsvDB:{
        "limit":Joi.number().min(1).max(50).required(),
        "sort":Joi.string().min(3).max(4).required(),
        "sortField":Joi.string().min(3).max(12).required(),
        "skip":Joi.number().min(0).max(40).required()
    }
}