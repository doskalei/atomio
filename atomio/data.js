

var init = function(req, res, atomio) {
	
	console.log("init "+req.url)

	if(!req.session.timestamp) req.session.timestamp = +new Date()
	console.log(req.session.atomio)

	var http = require('http')
		, url = require('url')
		, qs = require('querystring')
		, crypto = require('crypto')
		, fs = require('fs')
		, path = require('path')

	if(req.body.method)
		var _method = req.body.method
	else
		var _method = req.method

	switch(_method){
		case 'GET':
			dataGet(req, res)
			break
		case 'POST':
			dataPost(req, res)
			break
		case 'PUT':
			dataPut(req, res)
			break
		case 'DELETE':
			dataDelete(req, res)
			break
		case 'OPTIONS':
			dataOptions(req, res)
			break
		default:
			return 
	}
	return

	function dataGet(req, res){

		var response = {}

		var request = req.url.split("/")
		var service = request[2]

		if( service == "tree"){
			var file = 'tree.json'
			res.sendfile(file, {root: '/var/node/data'})
			return
		}

		res.render('data',{ title : 'Home', layout: 'tree' })
		return

/*		if( req.body.name && req.body.password ){
			var mongoServer = 'localhost'
			var mongoPort = 27017
			var UserModel = require( '../models/usermodel.js').UserModel
			var userModel = new UserModel(mongoServer, mongoPort)

			var _data = {}
			_data['name'] = req.body.name.toLowerCase()

			var shasum = crypto.createHash('sha1')
			shasum.update(req.body.password)
			_data['password'] = shasum.digest('hex').toLowerCase()
			userModel.fetchUserByCredentials(_data,function(error, users) {
				if(users){
					req.session.atomio = users.name
					res.json({"success":true})
				}else{
					res.json({"error": 401, "message": "Incorrect email or password"})
				}
			})
		}else{
		}*/

	}

	function dataPost(req, res, error){

/*		if(req.body.data.toLowerCase() == "hi"){
			res.render('auth',{title : 'Home', layout: 'nolayout' })
			return false
		}else if(req.body.data.toLowerCase() == "show project"){
			res.location('/data/')
			return false
		}else{
			res.json({"success":true, "message":req.body.data })
			return false
		}

		var mongoServer = 'localhost'
		var mongoPort = 27017

		var UserModel = require('../models/usermodel.js').UserModel
		var userModel = new UserModel(mongoServer, mongoPort)
		
		var _check = req.body.check ? req.body.check.toLowerCase() : ""
		var _name = req.body.name ? req.body.name.toLowerCase() : ""
		var _email = req.body.email ? req.body.email.toLowerCase() : ""

		var _password = ""
		if(req.body.password){
			var shasum = crypto.createHash('sha1')
			shasum.update(req.body.password)
			_password = shasum.digest('hex').toLowerCase()
		}		

		if(_check){

			userModel.fetchUserByName({'name':_check},function(error, users) {
				if(users)
					res.json({"error": 401, "message": users.name + " is not available"})
				else
					res.json({"success":_check})
			})

		}else if(_name&&_email&&_password){

			var _data = {'name':_name,'email':_email,'password':_password}

			userModel.insertUser(_data, function(error, user) {
				if (user) {
					res.json({"success":true})
				} else {
					res.json({"error": 403, "message": "Information error"})
				}
			})

		}else{
			res.json({"error": 401, "message": "Information error"})
		}*/


	}

}
exports.init = init