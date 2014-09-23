var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');
var mongoose    = require('mongoose');


var dbPort, dbHost, dbName, dbUser, dbPass;

if (process.env.MONGOHQ_URL){
    var elems   = String(process.env.MONGOHQ_URL).split(":");
    dbPort      = Number(elems[elems.length-1].split("/")[0]);
    dbHost      = elems[2].split("@")[1];
    dbName      = elems[elems.length-1].split("/")[1];
    dbUser      = elems[1].split("//")[1];
    dbPass      = elems[2].split("@")[0];
}else{

    dbPort      = 27017;
    dbHost 		= 'localhost';
    dbName 		= 'lagloria';
}

console.log("Puerto: " + dbPort);
console.log("DbHost: " + dbHost);
console.log("dbName: " + dbName);
console.log("dbUser: " + dbUser);
console.log("dbPass: " + dbPass);

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);

        if(process.env.MONGOHQ_URL){
            db.authenticate(dbUser, dbPass, function(err, result){
                if(err){
                    console.log("Error en la autenticacion");
                }else{
                    console.log("Autenticado");
                }
            });
        }
	}
});

// Collections definition

var accounts                = db.collection('accounts');
var mails                   = db.collection('mails');
var orders                  = db.collection('orders');
var toffeesYMasticables     = db.collection('toffeesYMasticables');
var duros                   = db.collection('duros');
var grageados               = db.collection('grageados');
var conPalo                 = db.collection('conPalo');

/* login validation methods */

exports.autoLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({user:user}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			validatePassword(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newData, callback)
{
	accounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}else{

            // Email unico en la web

			/*accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
					// append date stamp when record was created //
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						accounts.insert(newData, {safe: true}, callback);
                        if(e){
                            console.log("Error: " + e);
                        }
					});
				}
			});*/

            saltAndHash(newData.pass, function(hash){
                newData.pass = hash;
                // append date stamp when record was created //
                //newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                newData.date = new Date();
                accounts.insert(newData, {safe: true}, callback);
                if(e){
                    console.log("Error: " + e);
                }
            });
		}
	});
}

exports.updateAccount = function(newData, callback)
{
	accounts.findOne({
        user:newData.user
    }, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			accounts.save(o, {safe: true}, function(err) {
				if (err) callback(err);
				else callback(null, o);
			});
		}	else{
			saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				accounts.save(o, {safe: true}, function(err) {
					if (err) callback(err);
					else callback(null, o);
				});
			});
		}
	});
};

exports.actualizarCuenta = function(nuevoUsuario, callback){
    var usernameTaken = false;
    accounts.find({user: nuevoUsuario.user}).toArray(
        function(err,result){
            if(err){
                callback(err);
            }else{
                if(result.length > 0){ // Vamos a comprobar si se trata de este usuario o de otro
                    if(result[0]._id != nuevoUsuario._id){ // Son usuarios distintos
                        console.log("Usuario cogido");
                        usernameTaken = true;
                        callback('username-taken');
                    }
                }
                if(!usernameTaken){
                    accounts.findOne({
                        _id: getObjectId(nuevoUsuario._id)
                    }, function(err, o){
                        o.user          = nuevoUsuario.user;
                        o.role          = nuevoUsuario.role;
                        o.estaActivo    = nuevoUsuario.estaActivo;
                        o.estaBaneado   = nuevoUsuario.estaBaneado;

                        if(nuevoUsuario.pass == ''){
                            accounts.save(o, {safe:true}, function(err2){
                                if (err2){
                                    callback(err2);
                                }else{
                                    callback(null, o);
                                }
                            });
                        }else{
                            saltAndHash(nuevoUsuario.pass, function(hash){
                                o.pass = hash;
                                accounts.save(o, {safe: true}, function(err2) {
                                    if (err2){
                                        callback(err2);
                                    }else{
                                        callback(null, o);
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
};

exports.updatePassword = function(email, newPass, callback)
{
	accounts.findOne({email:email}, function(e, o){
		if (e){
			callback(e, null);
		}	else{
			saltAndHash(newPass, function(hash){
		        o.pass = hash;
		        accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	accounts.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

exports.getAccountById = function(id, callback)
{
    accounts.findOne({_id: getObjectId(id)},
        function(e, res) {
            if (e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
}

exports.delAllRecords = function(callback)
{
	accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

/* auxiliary methods */

var getObjectId = function(id)
{
	return accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getToffeeYMasticableId = function(id){
    return toffeesYMasticables.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getDuroId = function(id){
    return duros.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getGrageadoId = function(id){
    return grageados.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getConPaloId = function(id){
    return conPalo.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getMailId = function(id)
{
    return mails.db.bson_serializer.ObjectID.createFromHexString(id)
}

var getOrderId = function(id)
{
    return orders.db.bson_serializer.ObjectID.createFromHexString(id)
}



var findById = function(id, callback)
{
	accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};


var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

// Trips

var trips = db.collection('trips');

exports.findAllTrips = function(callback)
{
    trips.find({ $query: {}, $orderby: { moment : 1 } }).toArray(
        function(e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};

var getTripObjectId = function(id)
{
    return trips.db.bson_serializer.ObjectID.createFromHexString(id)
}

exports.findTripById = function(id, callback)
{
    trips.findOne({_id: getTripObjectId(id)},
        function(e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};

exports.findUsersByTripId = function(id, callback)
{
    trips.find({_id: getTripObjectId(id)}, {users:1, _id:0}).toArray(
        function(e, res){
            if(e) callback(e)
            else callback(null, res)
        });
};

exports.findUserById = function(id, callback)
{
    accounts.findOne({_id: getObjectId(id)},
        function(e, res) {
            if (e) callback(e)
            else callback(null, res)
        });
};

exports.addNewUserToTrip = function(tripId, user, callback)
{
    trips.update({_id: getObjectId(tripId)},{$addToSet: {'users': {name: user.name,user: user.user}}},
        function(e, res){
            if(e) callback(e)
            else callback(null, res)
        });
};

exports.addNewCommentToProduct = function(json, user, callback)
{
    if(json.category == "Toffees y Masticables"){
        toffeesYMasticables.update({_id: getToffeeYMasticableId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(json.category == "Duros"){
        duros.update({_id: getDuroId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(json.category == "Grageados"){
        grageados.update({_id: getGrageadoId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(json.category == "Con palo"){
        conPalo.update({_id: getConPaloId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else{
        callback('category-does-not-exist');
    }
}

exports.getComment = function(usuario, json, callback){
    if(json.category == "Toffees y Masticables"){
        console.log("Usuario: " + usuario);
        console.log("Fecha: " + json.nuevoComentario.date);
        toffeesYMasticables.aggregate({
            $unwind: '$comments'
        },{
            $match: {
                'comments.user': usuario,
                'comments.date': new Date(json.nuevoComentario.date)
            }
        },{
            $group: {
                _id: '$_id',
                comments: {
                    $push: '$comments'
                }
            }
        },
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }
};

exports.editProductComment = function(json, usuario, callback){
    if(json.category == "Toffees y Masticables"){
        console.log("Usuario: " + usuario);
        console.log("Fecha: " + json.nuevoComentario.date);
        console.log("Comentario: " + json.nuevoComentario.text);
        toffeesYMasticables.update({
            "comments.user": usuario,
            "comments.date": new Date(json.nuevoComentario.date)
        },{
            $set: {
                "comments.$.text": json.nuevoComentario.text
            }
        }, function(e, res){
            if(e || !res){ // El !res es para saber si no se ha actualizado el comentario.
                callback('Not updated');
            }else{
                callback(null, res);
            }
        });
    }else if(json.category == "Duros"){
        duros.update({
            _id: getDuroId(json._id)
        },{
            $push: {
                'comments': {
                    text: json.comment,
                    user: user.user,
                    date: new Date()
                }
            }
        }, function(e, res){
            if(e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
    }else if(json.category == "Grageados"){
        grageados.update({_id: getGrageadoId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(json.category == "Con palo"){
        conPalo.update({_id: getConPaloId(json._id)},
            {
                $push: {
                    'comments': {
                        text: json.comment,
                        user: user.user,
                        date: new Date()
                    }
                }
            }, function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else{
        callback('category-does-not-exist');
    }
};


// Products

exports.getAllProductsByCategoryType = function(categoryType, callback)
{
    if(categoryType == "Toffee" || categoryType == "Masticable"){
        toffeesYMasticables.find({ $query: {type:categoryType}, $orderby: {position:1}}).toArray(
            function(e, res) {
                if (e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Crystal" || categoryType == "Gloria" || categoryType == "Ponny" || categoryType == "Especial"){
        duros.find({ $query: {type:categoryType}, $orderby: {position:1}}).toArray(
            function(e, res) {
                if (e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Grageados"){
        grageados.find({ $query: {}, $orderby: {position:1}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Con palo"){
        conPalo.find({ $query: {}, $orderby: {position:1}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else{
        callback(null, {message: "La categoria no existe."});
    }
};

exports.getAllProductsByCategory = function(category, callback){
    if(category == "Toffees y Masticables"){
        toffeesYMasticables.find({
            $or: [{
                type: 'Toffee'
            }, {
                type:'Masticable'
            }]
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(category == "Duros"){
        duros.find({
            $or: [{
                type: 'Gloria'
            }, {
                type:'Ponny'
            },{
                type: 'Especial'
            },{
                type: 'Crystal'
            }]
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }
    if(category == "Grageados"){
        grageados.find({
            $query: {}
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }
    if(category == "Con palo"){
        conPalo.find({
            $query: {}
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }
};

exports.getAllProductCommentsByCategoryAndId = function(category, id, callback){
    if(category == 'Toffees y Masticables'){
        toffeesYMasticables.find({
            $query: {
                _id: getToffeeYMasticableId(id)
            }
        },{
            comments: 1
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(category == 'Duros'){
        duros.find({
            $query: {
                _id: getDuroId(id)
            }
        },{
            comments: 1
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(category == 'Grageados'){
        grageados.find({
            $query: {
                _id: getGrageadoId(id)
            }
        },{
            comments: 1
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(category == 'Con palo'){
        conPalo.find({
            $query: {
                _id: getConPaloId(id)
            }
        },{
            comments: 1
        })
        .toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else{
        callback('category-not-found');
    }
};

exports.getProductByCategoryTypeAndId = function(categoryType, id, callback){
    if(categoryType == "Toffee" || categoryType == "Masticable"){
        toffeesYMasticables.find({ $query: {type:categoryType, _id: getToffeeYMasticableId(id)}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Crystal" || categoryType == "Gloria" || categoryType == "Ponny" || categoryType == "Especial"){
        duros.find({ $query: {type:categoryType, _id: getDuroId(id)}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Grageados"){
        grageados.find({ $query: {_id: getGrageadoId(id)}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else if(categoryType == "Con palo"){
        conPalo.find({ $query: {_id: getConPaloId(id)}}).toArray(
            function(e, res){
                if(e){
                    callback(e);
                }else{
                    callback(null, res);
                }
            });
    }else{
        callback(null, {message: "La categoria no existe."});
    }
}

exports.editProductByCategoryTypeAndId = function(categoryType, id, newProduct, callback){
    if(categoryType == "Toffee" || categoryType == "Masticable"){
        toffeesYMasticables.findOne({
            type:categoryType,
            _id: getToffeeYMasticableId(id)
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                res.model = newProduct.model;
                res.minimumOrder = newProduct.minimumOrder;
                res.price = newProduct.price;
                toffeesYMasticables.save(res, {safe: true}, function(err2){
                    if(err2){
                        callback(err2);
                    }else{
                        callback(null, res)
                    }
                });
            }
        });
    }else if(categoryType == "Crystal" || categoryType == "Gloria" || categoryType == "Ponny" || categoryType == "Especial"){
        duros.findOne({
            type: categoryType,
            _id: getDuroId(id)
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                res.model = newProduct.model;
                res.minimumOrder = newProduct.minimumOrder;
                res.price = newProduct.price;
                duros.save(res, {safe: true}, function(err2){
                    if(err2){
                        callback(err2);
                    }else{
                        callback(null, res)
                    }
                });
            }
        });
    }else if(categoryType == "Grageados"){
        grageados.findOne({
            category: categoryType,
            _id: getGrageadoId(id)
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                res.model = newProduct.model;
                res.minimumOrder = newProduct.minimumOrder;
                res.price = newProduct.price;
                grageados.save(res, {safe: true}, function(err2){
                    if(err2){
                        callback(err2);
                    }else{
                        callback(null, res)
                    }
                });
            }
        });
    }else if(categoryType == "Con palo"){
        conPalo.findOne({
            category:categoryType,
            _id: getConPaloId(id)
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                res.model = newProduct.model;
                res.minimumOrder = newProduct.minimumOrder;
                res.price = newProduct.price;
                conPalo.save(res, {safe: true}, function(err2){
                    if(err2){
                        callback(err2);
                    }else{
                        callback(null, res)
                    }
                });
            }
        });
    }else{
        callback(null, {message: "La categoria no existe."});
    }
}

exports.addNewEmail = function(newData, callback){
    newData.fecha = new Date();
    mails.insert(newData, callback);
}

exports.addNewOrder = function(productos, usuario, direccion, telefono, callback){
    var fecha = new Date();
    orders.insert({
        leido: false,
        fecha: fecha,
        productos: productos,
        usuario: usuario,
        datosContacto: {
            direccion: direccion,
            telefono: telefono
        }
    }, {
        w:1
    },function(e, res){
        if(e){
            callback(e);
        }else{
            callback(null, res);
        }
    });
};

exports.getAllEmails = function(callback){
    mails.find({
        $query: {},
        $orderby: {
            fecha: 1
        }
    }).toArray(
        function(e, res) {
            if (e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
};

exports.getAllOrders = function(callback){
    orders.find({
        $query: {},
        $orderby: {
            fecha: 1
        }
    }).toArray(
        function(e, res){
            if(e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
};

exports.getOrderById = function(id, callback){
    orders.findOne({_id:getOrderId(id)}, function(e, res){
        if (e){
            callback(e);
        }else{
            callback(null, res);
        }
    });
};


exports.getEmailById = function(id, callback){
    mails.findOne({_id:getMailId(id)}, function(e, res){
        if (e){
            callback(e);
        }else{
            callback(null, res);
        }
    });
}

exports.getOrderById = function(id, callback){
    orders.findOne({_id:getOrderId(id)}, function(e, res){
        if (e){
            callback(e);
        }else{
            callback(null, res);
        }
    });
}

exports.getNotReadedEmails = function(callback){
    mails.find({ $query: {leido: false}, $orderby: {fecha:1}}).toArray(
        function(e, res) {
            if(e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
}

exports.setEmailReaded = function(id, callback){
    mails.findOne({
        _id: getMailId(id)
    }, function(err, res){
        if(err){
            callback(err);
        }else{
            res.leido = true;
            mails.save(res, {safe: true}, function(err2){
                if(err2){
                    callback(err2);
                }else{
                    callback(null, res)
                }
            })
        }
    })
};

exports.actualizarPedido = function(pedido, callback){
    orders.findOne({_id: getOrderId(pedido._id)}, function(err, res){
        if(err){
            callback(err);
        }else{
            res.productos = pedido.productos;
            orders.save(res, {safe: true}, function(err2){
                if(err2){
                    callback(err2);
                }else{
                    callback(null, res);
                }
            })
        }
    })
};

exports.setOrderReaded = function(id, callback){
    orders.findOne({
        _id: getOrderId(id)
    }, function(err, res){
        if(err){
            callback(err);
        }else{
            res.leido = true;
            orders.save(res, {safe: true}, function(err2){
                if(err2){
                    callback(err2);
                }else{
                    callback(null, res)
                }
            })
        }
    })
};

exports.deleteEmail = function(id, callback){
    mails.remove({
        _id:getMailId(id)
    }, callback);
};

exports.deleteOrderById = function(id, callback){
    orders.remove({
        _id:getOrderId(id)
    }, callback);
};

exports.deleteProductByCategoryTypeAndId = function(category, id, callback){
    if(category == 'Toffees y Masticables'){
        toffeesYMasticables.remove({
            _id: getToffeeYMasticableId(id)
        }, callback);

    }else if(category == 'Duros'){
        duros.remove({
            _id: getDuroId(id)
        }, callback);

    }else if(category == 'Grageados'){
        grageados.remove({
            _id: getGrageadoId(id)
        }, callback);

    }else if(category == 'Con palo'){
        conPalo.remove({
            _id: getConPaloId(id)
        }, callback);

    }
};

exports.deleteProductCommentByCategoryTypeAndId = function(category, id, comentario, callback){
    if(category == 'Toffees y Masticables'){
        console.log("Usuario: " + comentario.user);
        console.log("Texto: " + comentario.text);
        toffeesYMasticables.update({
            _id: getToffeeYMasticableId(id)
        },{
            $pull: {
                comments: {
                    user: comentario.user,
                    text: comentario.text
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Duros'){
        duros.update({
            _id: getDuroId(id)
        },{
            $pull: {
                comments: {
                    user: comentario.user,
                    text: comentario.text
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Grageados'){
        grageados.update({
            _id: getGrageadoId(id)
        },{
            $pull: {
                comments: {
                    user: comentario.user,
                    text: comentario.text
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Con palo'){
        conPalo.update({
            _id: getConPaloId(id)
        },{
            $pull: {
                comments: {
                    user: comentario.user,
                    text: comentario.text
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });
    }else{
        callback('category-not-found');
    }
};

exports.deleteLikeByCategoryTypeAndId = function(category, id, like, callback){
    console.log("Categoria: " + category);
    console.log("Id: " + id);
    console.log("Usuario: " + like.user);
    console.log("Body: " + JSON.stringify(like, null, 4));

    if(category == 'Toffees y Masticables'){
        toffeesYMasticables.update({
            _id: getToffeeYMasticableId(id)
        },{
            $pull: {
                likes: {
                    user: like.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Duros'){
        duros.update({
            _id: getDuroId(id)
        },{
            $pull: {
                likes: {
                    user: like.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Grageados'){
        grageados.update({
            _id: getGrageadoId(id)
        },{
            $pull: {
                likes: {
                    user: like.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Con palo'){
        conPalo.update({
            _id: getConPaloId(id)
        },{
            $pull: {
                likes: {
                    user: like.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });
    }else{
        callback('category-not-found');
    }
};

exports.deleteDislikeByCategoryTypeAndId = function(category, id, dislike, callback){
    console.log("Categoria: " + category);
    console.log("Id: " + id);
    console.log("Usuario: " + dislike.user);
    console.log("Body: " + JSON.stringify(dislike, null, 4));

    if(category == 'Toffees y Masticables'){
        toffeesYMasticables.update({
            _id: getToffeeYMasticableId(id)
        },{
            $pull: {
                dislikes: {
                    user: dislike.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Duros'){
        duros.update({
            _id: getDuroId(id)
        },{
            $pull: {
                dislikes: {
                    user: dislike.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Grageados'){
        grageados.update({
            _id: getGrageadoId(id)
        },{
            $pull: {
                dislikes: {
                    user: dislike.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });

    }else if(category == 'Con palo'){
        conPalo.update({
            _id: getConPaloId(id)
        },{
            $pull: {
                dislikes: {
                    user: dislike.user
                }
            }
        }, function(e, res){
            if(e || !res){
                callback('El comentario no ha sido borrado.');
            }else{
                callback(null, res);
            }
        });
    }else{
        callback('category-not-found');
    }
};

exports.deleteUser = function(id, callback){
    accounts.remove({_id:getObjectId(id)}, callback);
};

exports.getNotReadedOrders = function(callback){
    orders.find({
        $query: {
            leido: false
        },
        $orderby: {
            fecha:1
        }
    })
    .toArray(
        function(e, res){
            if(e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
};

exports.getNotActiveUsers = function(callback){
    accounts.find({
        $query: {
            estaActivo: false
        }
    })
    .toArray(
        function(e, res){
            if(e){
                callback(e);
            }else{
                callback(null, res);
            }
        });
};

exports.addLikeToProduct = function(caramelo, usuario, callback){
    if(caramelo.category == 'Toffees y Masticables'){
        toffeesYMasticables.update({_id: getToffeeYMasticableId(caramelo._id)}, {
            $push: {
                'likes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Duros'){
        duros.update({
            _id: getDuroId(caramelo._id)
        }, {
            $push: {
                'likes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Grageados'){
        grageados.update({_id: getGrageadoId(caramelo._id)}, {
            $push: {
                'likes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Con palo'){
        conPalo.update({_id: getConPaloId(caramelo._id)}, {
            $push: {
                'likes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }
};

exports.addDislikeToProduct = function(caramelo, usuario, callback){
    if(caramelo.category == 'Toffees y Masticables'){
        toffeesYMasticables.update({_id: getToffeeYMasticableId(caramelo._id)}, {
            $push: {
                'dislikes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Duros'){
        duros.update({_id: getDuroId(caramelo._id)}, {
            $push: {
                'dislikes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Grageados'){
        grageados.update({_id: getGrageadoId(caramelo._id)}, {
            $push: {
                'dislikes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }else if(caramelo.category == 'Con palo'){
        conPalo.update({_id: getConPaloId(caramelo._id)}, {
            $push: {
                'dislikes':{
                    'user': usuario
                }
            }
        }, function(err, res){
            if(err){
                callback(err);
            }else{
                console.log();
                callback(null, res)
            }
        });
    }
};
