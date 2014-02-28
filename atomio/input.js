

var init = function(req, res, atomio) {
	
	console.log("init "+req.url)

	if(!req.session.timestamp) req.session.timestamp = +new Date()
	console.log('session ' + req.session.atomio)

	var http = require('http')
		, url = require('url')
		, qs = require('querystring')
		, crypto = require('crypto')
		, fs = require('fs')


	if(req.body.method)
		var _method = req.body.method
	else
		var _method = req.method

	switch(_method){
		case 'GET':
			inputGet(req, res)
			break
		case 'POST':
			inputPost(req, res, atomio)
			break
		case 'PUT':
			inputPut(req, res)
			break
		case 'DELETE':
			inputDelete(req, res)
			break
		case 'OPTIONS':
			inputOptions(req, res)
			break
		default:
			return 
	}
	return

	function inputGet(req, res){

		var response = {}

		if( req.body.name && req.body.password ){
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
			res.render('input',{ title : 'Home', layout: 'layout' })
		}

	}

	function inputPost(req, res, atomio){

		var mongoServer = 'localhost'
		var mongoPort = 27017

		_input = req.body.input
		_values = _input.split(" ")

		if(_values){
			
			_command = _values[0].toLowerCase().replace(/[^a-z]/g, '')
			try{
				var Command = require('./command/'+_command+'.js').Command
				var command = new Command(req, res)
			}catch(e){
				console.log("File not found")
				return false
			}

/*			var CommandModel = require('../models/commandmodel.js').CommandModel
			var commandModel = new CommandModel(mongoServer, mongoPort)

			commandModel.fetchCommandByName({'name':_command},function(error, commands) {
				if(commands){
					res.json({"success":true, "message":"command found" })
					return false
					atomio.get('/input*', function (req, res, atomio) {
					  require('./atomio/input.js').init(req, res)
					})
					atomio.post('/input*', function (req, res, atomio) {
					  require('./atomio/input.js').init(req, res)
					})
				}else{
					commandModel.fetchAllCommands(function(error, commands){
						if(commands){
							console.log("true")
						}else{
							console.log("false")
						}
					})
					res.json({"success":true, "message":"command not found" })
					return false
				}
			})*/
/*
if(_values[0].toLowerCase() == "hi"){
	res.render('auth',{title : 'Home', layout: 'nolayout' })
	return false
}else if(_values[0].toLowerCase() == "show"){
	res.json({redirect:"/data"})
	return false
}else{
	res.json({"success":true, "message":_input })
	return false
}
*/

		}else{
			res.json({"success":true, "message":"" })
			return false
		}


	}

}
exports.init = init