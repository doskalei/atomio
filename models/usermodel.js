
var usersTable = 'users'
/*db.users.ensureIndex( { "name": 1 }, { unique: true } )*/


UserModel = function(host, port) {

	db = require("mongoskin").db('localhost:27017',
		{
			database: 'atomio',
			safe: true,
			strict: false
		}
	)

	this.fetchAllUsers = function(cb) {
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.find().toArray(function(error, results) {
					cb(error, results)
				})
				cb(true, null)
			}
		})
	}

	this.fetchUserById = function(id, cb) {
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.fetchUserByName = function(data, cb) {
		if( data.name ){
			db.collection(usersTable).findOne(
				{
					name : data.name.toLowerCase()
				}, function(error, users) {
					if (error) {
						cb(error, null)
					} else {
						cb(null, users)
					}
				}
			)
		}
	}

	this.fetchUserByCredentials = function(data, cb) {
		if( data.name && data.password ){
			db.collection(usersTable).findOne(
				{
					name : data.name.toLowerCase(),
					password : data.password.toLowerCase()
				}, function(error, users) {
					if (error) {
						cb(error, null)
					} else {
						cb(null, users)
					}
				}
			)
		}
	}

	this.insertUser = function(user, cb) {
		db.collection(usersTable).insert(user, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				cb(null, users)
			}
		})
	}

	this.updateUser = function(user, cb) {
		console.log('updateUser')
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.update({_id:users.db.bson_serializer.ObjectID.createFromHexString(user._id)}, 
					{name:user.name, state:user.state, city:user.city}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.deleteUser = function(id, cb) {
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.remove({_id:users.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}
}

exports.UserModel = UserModel

















/*var usersTable = 'users'

var Db = require('mongodb').Db
var Connection = require('mongodb').Connection
var Server = require('mongodb').Server

UserModel = function(host, port) {

	db = new Db('users', new Server(host, port),{w:1})
	db = require('mongoskin').db('localhost:27017/rockband'); 

	db.open(function(){})

	this.fetchAllUsers = function(cb) {
		db.collection({safe:true},usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.find().toArray(function(error, results) {
					cb(error, results)
				})
				cb(true, null)
			}
		})
	}

	this.fetchUserById = function(id, cb) {
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.fetchUserByCredentials = function(data, cb) {
		if( data.username && data.password ){
			db.collection(usersTable, function(error, users) {
				if (error) {
					cb(error, null)
				} else {
					users.findOne({
						username : data.username,
						pass : data.password
					}, function(error, result) {
						cb(error, result)
					})
					cb(true, null)
				}
			})
		}
	}

	this.insertUser = function(user, cb) {
		db.collection(usersTable, function(error, users) {
			console.log(user)
			if (error) {
				cb(error, null)
			} else {
				users.insert([user], function(data) {
					console.log(data)
					cb(null, user)
				})
				cb(true, null)
			}
		})
	}

	this.updateUser = function(user, cb) {
		console.log('updateUser')
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.update({_id:users.db.bson_serializer.ObjectID.createFromHexString(user._id)}, 
					{name:user.name, state:user.state, city:user.city}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}

	this.deleteUser = function(id, cb) {
		db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null)
			} else {
				users.remove({_id:users.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result)
				})
				cb(true, null)
			}
		})
	}
}

exports.UserModel = UserModel*/