
var commandsTable = 'commands'
/*db.commands.ensureIndex( { "name": 1 }, { unique: true } )*/


CommandModel = function(host, port) {

	db = require("mongoskin").db('localhost:27017',
		{
			database: 'atomio',
			safe: true,
			strict: false
		}
	)

	this.fetchAllCommands = function(cb) {
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.find().toArray(function(error, results) {
					cb(error, results)
				})
				cb(true, null)
			}
		})
	}

	this.fetchCommandById = function(id, cb) {
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.findOne({
					_id:commands.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.fetchCommandByName = function(data, cb) {
		if( data.name ){
			db.collection(commandsTable).findOne(
				{
					name : data.name.toLowerCase()
				}, function(error, commands) {
					if (error) {
						cb(error, null)
					} else {
						cb(null, commands)
					}
				}
			)
		}
	}

	this.fetchCommandByCredentials = function(data, cb) {
		if( data.name && data.password ){
			db.collection(commandsTable).findOne(
				{
					name : data.name.toLowerCase(),
					password : data.password.toLowerCase()
				}, function(error, commands) {
					if (error) {
						cb(error, null)
					} else {
						cb(null, commands)
					}
				}
			)
		}
	}

	this.insertCommand = function(command, cb) {
		db.collection(commandsTable).insert(command, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				cb(null, commands)
			}
		})
	}

	this.updateCommand = function(command, cb) {
		console.log('updateCommand')
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.update({_id:commands.db.bson_serializer.ObjectID.createFromHexString(command._id)}, 
					{name:command.name, state:command.state, city:command.city}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.deleteCommand = function(id, cb) {
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.remove({_id:commands.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}
}

exports.CommandModel = CommandModel

















/*var commandsTable = 'commands'

var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

CommandModel = function(host, port) {

	db = new Db('commands', new Server(host, port),{w:1})
	db = require('mongoskin').db('localhost:27017/rockband'); 

	db.open(function(){})

	this.fetchAllCommands = function(cb) {
		db.collection({safe:true},commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.find().toArray(function(error, results) {
					cb(error, results)
				})
				cb(true, null)
			}
		})
	}

	this.fetchCommandById = function(id, cb) {
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.findOne({
					_id:commands.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.fetchCommandByCredentials = function(data, cb) {
		if( data.commandname && data.password ){
			db.collection(commandsTable, function(error, commands) {
				if (error) {
					cb(error, null)
				} else {
					commands.findOne({
						commandname : data.commandname,
						pass : data.password
					}, function(error, result) {
						cb(error, result)
					})
					cb(true, null)
				}
			})
		}
	}

	this.insertCommand = function(command, cb) {
		db.collection(commandsTable, function(error, commands) {
			console.log(command)
			if (error) {
				cb(error, null)
			} else {
				commands.insert([command], function(data) {
					console.log(data)
					cb(null, command)
				})
				cb(true, null)
			}
		})
	}

	this.updateCommand = function(command, cb) {
		console.log('updateCommand')
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.update({_id:commands.db.bson_serializer.ObjectID.createFromHexString(command._id)}, 
					{name:command.name, state:command.state, city:command.city}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.deleteCommand = function(id, cb) {
		db.collection(commandsTable, function(error, commands) {
			if (error) {
				cb(error, null)
			} else {
				commands.remove({_id:commands.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}
}

exports.CommandModel = CommandModel*/