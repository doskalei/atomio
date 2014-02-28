/*
 * Module dependencies
 */
var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , util = require("util")
  , http = require('http')
  , url = require('url')
  , qs = require('querystring')
  , redisStore = require("connect-redis")(express)


var atomio = express()


atomio.set( 'views', __dirname + '/views' )
atomio.set( 'view engine', 'jade' )
atomio.use( express.logger('dev') )


function compile(str, path) {
  return stylus(str).set('filename', path).use(nib())
}
atomio.use( stylus.middleware({ src: __dirname + '/public', compile: compile}))
atomio.use( express.static( __dirname + '/public' ) )
atomio.use( express.bodyParser() )


atomio.use(express.cookieParser("secretfromthecave"))
atomio.use(express.session({
    store: new redisStore({ host: 'localhost', port: 6379, prefix: 'atm-sess' })
}))

atomio.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

atomio.get('/', function (req, res, atomio) {
  res.render('index',{ title : 'Home', layout: 'layout' })
})
atomio.post('/', function (req, res, atomio) {
  res.render('index',{ title : 'Home', layout: 'layout' })
})


atomio.get('/auth*', function (req, res, atomio) {
  require('./atomio/auth.js').init(req, res)
})
atomio.post('/auth*', function (req, res, atomio) {
  require('./atomio/auth.js').init(req, res)
})

atomio.all('/data*', function (req, res, atomio) {
  require('./atomio/data.js').init(req, res)
})

atomio.get('/input*', function (req, res, atomio) {
  require('./atomio/input.js').init(req, res)
})
atomio.post('/input*', function (req, res, atomio) {
  require('./atomio/input.js').init(req, res)
})

atomio.listen(8844)