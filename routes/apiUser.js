module.exports = function(model) {
  var express = require('express');
  var router = express.Router();
  var validacionJoi =require("../middleware/middlewareJoi");
  const UserServices= require("../services/user")(model)
  router.post('/login',validacionJoi("body","loginUser"), async function(req, res, next) {
    const {body}=req;
    let result = await UserServices.loginUser(body)
    res.status(200).json(result);
  });

  router.post('/register',validacionJoi("body","registerUser"),async function(req, res, next) {
    const {body}=req;
    let result = await UserServices.CreateUser(body)
    res.status(200).json(result);
  });

  return router
}
