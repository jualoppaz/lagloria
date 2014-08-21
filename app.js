//server.js

/*
require('nodetime').profile({
    accountKey: '0fdc0d3ef41156c759bd086c430abb61ae23b725',
    appName: 'Node.js Application'
});
*/

var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');
var path        = require("path");

var port = process.env.PORT || 8888;

app.configure(function() {
    app.set('port', port);
    app.set('views', path.join(__dirname + '/app/server/views'));
    app.set('view engine', 'jade');
	app.use(express.static(__dirname + '/public'));		// Localización de los ficheros estáticos
	app.use(express.logger('dev'));						// Muestra un log de todos los request en la consola
	app.use(express.bodyParser());						// Permite cambiar el HTML con el método POST
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'super-duper-secret-secret' }));
    app.use(express.methodOverride());					// Simula DELETE y PUT
    app.use(express.favicon(path.join(__dirname, '/app/public/img/logo.png')));
    app.use(express.static(__dirname + '/app/public'));
    app.use('/img', express.static(__dirname + '/app/public/img'));
    app.use('/js', express.static(__dirname + '/app/public/js'));
});

require('./app/server/router')(app);


app.listen(port, function() {
	console.log('App listening on port ' + port);
});





