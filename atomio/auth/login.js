var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , util = require("util")
  , http = require('http')
  , url = require('url')
  , qs = require('querystring');

var module = module.exports = express();

module.use(express.bodyParser());
module.get('/auth/', function(req, res){
	console.log("___---___");
	res.send("___---___");
});