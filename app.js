const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const settings={
	connectURI:process.env.DB ||"sin",
	secretJWT:process.env.SECRET_JWT ||"sin",
	timeJWT:process.env.TIME_JWT || "sin",
	domain: process.env.DOMAIN || "localhost",
  actualUrl: process.env.ACTUAL_URL
}
const model = require('./models/model.js')(settings);
const apiUser = require('./routes/apiUser')(model);
const apiCsv =require('./routes/apiCsv')(model)
const apiFile=require('./routes/apiFile')(settings)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use('/file',apiFile)
app.use('/user', apiUser);
app.use('/data',apiCsv)
app.use('/', function(req,res){
  res.render("index")
});

app.use(function(err, req, res, next) {
  const message = err.message|| err;
  res.status(err.status || 500).json({"error":message})
});

module.exports = app;
