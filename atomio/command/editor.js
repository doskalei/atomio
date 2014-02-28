


/*
EDITOR
*/


Command = function(req, res) {


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
			commandGet(req, res)
			break
		case 'POST':
			commandPost(req, res)
			break
		case 'PUT':
			commandPut(req, res)
			break
		case 'DELETE':
			commandDelete(req, res)
			break
		case 'OPTIONS':
			commandOptions(req, res)
			break
		default:
			return 
	}
	return

	function commandGet(req, res){
		console.log("command get")
		res.json({"success":true, "message":"command found" })

	}
	function commandPost(req, res){

		_input = req.body.input
		_values = _input.split(" ")

		if(_values){
			_command = _values[0].toLowerCase().replace(/[^a-z]/g, '')
			console.log(_command)
			res.render('command/'+_command,{ title : 'Home', layout: 'command' })
			return false

		}
		console.log("command post")
		res.json({"success":true, "message":"command found" })
		
		return

	}
	function commandPut(req, res){}
	function commandOptions(req, res){}




}
exports.Command = Command