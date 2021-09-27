module.exports = function(model) {

    const express = require('express');
    const router = express.Router();
    const CsvServices= require("../services/csv")(model)
    var validacionJWT=require("../middleware/middlewareJWT");
    var validacionJoi =require("../middleware/middlewareJoi");
    router.get('/',validacionJoi("query","findCsvDB"),validacionJWT("headers","authorization") ,async function(req, res, next) {
        const {query}=req;
        let result = await CsvServices.findCsv(query)
        let limitResult=result.length
        res.status(200).json({limitResult,"data":result});
    });
    return router
}


