//server.js

var express 	= require('express');
var app 		= express();
var mongoose 	= require('mongoose');
var path        = require("path");

var port = process.env.PORT || 8888;
// Conexión con la base de datos

/*
if (process.env.MONGOHQ_URL){
	mongoose.connect(process.env.MONGOHQ_URL);
}else{
    mongoose.connect('mongodb://localhost:27017/angular-users');
}
*/

// Configuración
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
    //app.use('/app/public/css', express.static(__dirname + '/app/public/css'));
    //app.use('/app/public/img', express.static(__dirname + '/app/public/img'));
    app.use(express.favicon(path.join(__dirname, '/app/public/img/logo.png')));
    app.use(express.static(__dirname + '/app/public'));
    app.use('/img', express.static(__dirname + '/app/public/img'));
    app.use('/js', express.static(__dirname + '/app/public/js'));
});

require('./app/server/router')(app);

app.listen(port, function() {
	console.log('App listening on port ' + port);
});