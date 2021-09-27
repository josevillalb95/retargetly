module.exports = function(settings) {
	const mongoose = require('mongoose');
	const options_db={
	};
	const con = mongoose.connect(settings.connectURI, options_db);
	mongoose.connection.on("open", function (ref) {
		console.log("********* open connection to mongo server: " + settings.connectURI);
	});
	mongoose.connection.on("connected", function (ref) {
		console.log("Mongoose default connection open to " + settings.connectURI);
	});
	const Schema = mongoose.Schema;
	const ObjectId = Schema.ObjectId;

	const csvUser = new Schema({
		"_id":String,
		"user" : String,
		"password" : String
	}); 
	const csv = new Schema({
		"name" : String,
		"segment1" : Boolean,
		"segment2" : Boolean,
		"segment3" : Boolean,
		"segment4" : Boolean,
		"platformId" : Number,
		"clientId" : Number
	})
	const ModelCsv = mongoose.model('csv', csv, 'csv');
	const ModelUsuarios = mongoose.model('csvUser', csvUser, 'csvUser');
	const moduloModel = {};
	moduloModel.generateId = function() {
		return mongoose.Types.ObjectId().toString() 
	}
	moduloModel.searchUser = function(query) {
		return ModelUsuarios.findOne(query) 
	}
	moduloModel.searchCsv = function(limit,skip,sort) {
		console.log(limit,sort,skip)
		return ModelCsv.find({}).limit(limit).skip(skip).sort(sort)
	}
	moduloModel.modifyUser = function(query,update){
		return ModelUsuarios.update(query, update, { upsert: true } )
	}
  	return moduloModel;
};
