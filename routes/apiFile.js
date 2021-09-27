module.exports = function(settings) {
    const fs = require('fs')
    const express = require('express');
    const router = express.Router();
    var validacionJWT=require("../middleware/middlewareJWT");
    var validacionJoi =require("../middleware/middlewareJoi");
    const multer  = require('multer')
    var path = require('path')
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    var upload = multer({ storage: storage });
    router.get('/',validacionJoi("query","fileDowload"), validacionJWT("headers","authorization"),function(req, res, next) {
        const {query}=req;
        let files=fs.readdirSync("./upload")
        let archivoFind=files.find( arc => arc.indexOf(query.Filename)!= -1 )
        if(!archivoFind){
            return res.status(500).json({"error":`Archivo inexistente. Archivos guardados ${files}`});
        }
        res.status(200).json({"download":`${settings.actualUrl}/${archivoFind}`});
    });
    router.post('/' ,validacionJWT("headers","authorization"),upload.single('subida'),function(req, res, next) {
        const {body}=req;
        res.status(200).json({"name":req.file.originalname});
    });
    return router
}


