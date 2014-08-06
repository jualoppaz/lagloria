var DBM           = require('./modules/data-base-manager');

var roles = ['provider', 'admin'];

module.exports = function(app){

    // Vistas de la web

    app.get('/gamaPropia/blandos.html', function(req, res) {
        res.render('blandos');
    });

    // Barra principal

    app.get('/', function(req, res) {
        funcionesComunes(req);
        res.render('index');
    });

    app.get('/gamaPropia', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia');
    });

    app.get('/gamaPropia2', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia2');
    });

    // Gama propia

    app.get('/gamaPropia/toffeesYMasticables', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/toffeesYMasticables');
    });

    app.get('/gamaPropia/toffeesYMasticables/toffees', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/toffeesYMasticables/toffees');
    });

    app.get('/gamaPropia/toffeesYMasticables/toffees/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/toffeesYMasticables/toffees/infoToffee');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables', function(req, res) {
        actualizarUltimaPagina(req);
        res.render('gamaPropia/toffeesYMasticables/masticables');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/toffeesYMasticables/masticables/infoMasticable');
    });

    app.get('/gamaPropia/duros', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros');
    });

    app.get('/gamaPropia/duros/crystal', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/crystals');
    });

    app.get('/gamaPropia/duros/crystal/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/crystals/infoCrystal');
    });

    app.get('/gamaPropia/duros/gloria', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/glorias');
    });

    app.get('/gamaPropia/duros/gloria/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/glorias/infoGloria');
    });

    app.get('/gamaPropia/duros/ponny', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/ponnies');
    });

    app.get('/gamaPropia/duros/ponny/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/ponnies/infoPonny');
    });

    app.get('/gamaPropia/duros/sinGrupo', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/sinGrupo');
    });

    app.get('/gamaPropia/duros/sinGrupo/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/sinGrupo/infoSinGrupo');
    });

    app.get('/gamaPropia/grageados', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/grageados');
    });

    app.get('/gamaPropia/grageados/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/grageados/infoGrageados');
    });

    app.get('/gamaPropia/conPalo', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/conPalo');
    });

    app.get('/gamaPropia/conPalo/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/conPalo/infoConPalo');
    });

    app.get('/buscar', function(req, res) {
        funcionesComunes(req);
        res.render('buscar');
    });

    app.get('/login', function(req, res){
        res.render('login');
    });

    app.get('/signup', function(req, res){
        res.render('signup');
    });

    app.get('/webAntigua/blandos', function(req, res) {
        res.sendfile('app/server/views/webAntigua/blandos.html');
    });

    app.get('/webAntigua/blandos2', function(req, res) {
        res.sendfile('app/server/views/webAntigua/blandos2.html');
    });

    // API REST

    app.get('/api/toffees', function(req, res) {
        DBM.getAllProductsByCategoryType('Toffee', function(err, toffees){
            res.send(toffees);
        });
    });

    app.get('/api/toffees/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Toffee', req.params.id, function(err, toffee){
            res.send(toffee[0]);
        });
    });

    app.get('/api/masticables', function(req, res) {
        DBM.getAllProductsByCategoryType('Masticable', function(err, masticables){
            res.send(masticables);
        });
    });

    app.get('/api/masticables/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Masticable', req.params.id, function(err, masticable){
            res.send(masticable[0]);
        });
    });

    app.get('/api/crystals', function(req, res) {
        DBM.getAllProductsByCategoryType('Crystal', function(err, crystals){
            res.send(crystals);
        });
    });

    app.get('/api/crystals/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Crystal', req.params.id, function(err, crystal){
            res.send(crystal[0]);
        });
    });

    app.get('/api/glorias', function(req, res) {
        DBM.getAllProductsByCategoryType('Gloria', function(err, glorias){
            res.send(glorias);
        });
    });

    app.get('/api/glorias/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Gloria', req.params.id, function(err, gloria){
            res.send(gloria[0]);
        });
    });

    app.get('/api/ponnies', function(req, res) {
        DBM.getAllProductsByCategoryType('Ponny', function(err, glorias){
            res.send(glorias);
        });
    });

    app.get('/api/ponnies/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Ponny', req.params.id, function(err, gloria){
            res.send(gloria[0]);
        });
    });

    app.get('/api/sinGrupo', function(req, res) {
        DBM.getAllProductsByCategoryType('Sin grupo', function(err, sinGrupo){
            res.send(sinGrupo);
        });
    });

    app.get('/api/sinGrupo/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Sin grupo', req.params.id, function(err, sinGrupo){
            res.send(sinGrupo[0]);
        });
    });

    app.get('/api/grageados', function(req, res) {
        DBM.getAllProductsByCategoryType('Grageados', function(err, grageados){
            res.send(grageados);
        });
    });

    app.get('/api/grageados/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Grageados', req.params.id, function(err, grageados){
            res.send(grageados[0]);
        });
    });

    app.get('/api/conPalo', function(req, res) {
        DBM.getAllProductsByCategoryType('Con palo', function(err, conPalo){
            res.send(conPalo);
        });
    });

    app.get('/api/conPalo/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Con palo', req.params.id, function(err, conPalo){
            res.send(conPalo[0]);
        });
    });

    app.post('/api/buscar', function(req, res) {
        var seccion = req.body.seccion.texto;
        var criterio = req.body.criterio.texto;
        var categoria = req.body.categoria.texto;
        var nombre = req.body.nombre.texto;
        console.log("Datos recibidos:");
        console.log("Seccion: " + seccion);
        console.log("Criterio: " + criterio);
        console.log("Categoria: " + categoria);
        console.log("Nombre: " + nombre);

        if(seccion == "Gama propia"){
            if(criterio == "Categoría"){
                if(categoria == "Toffees y Masticables"){
                    DBM.getAllProductsByCategoryType('Toffee', function(err, toffees){

                        DBM.getAllProductsByCategoryType('Masticable', function(err, masticables){

                            var json = {
                                toffees: toffees,
                                masticables: masticables
                            };

                            res.json(json);
                        });
                    });
                }else if(categoria == "Duros"){
                    DBM.getAllProductsByCategoryType('Crystal', function(err, crystals){
                        DBM.getAllProductsByCategoryType('Gloria', function(err, glorias){
                            DBM.getAllProductsByCategoryType('Ponny', function(err, ponnies){
                                DBM.getAllProductsByCategoryType('Sin grupo', function(err, sinGrupo){

                                    var json = {
                                        crystals: crystals,
                                        glorias: glorias,
                                        ponnies: ponnies,
                                        sinGrupo: sinGrupo
                                    };

                                    res.json(json);
                                });
                            });
                        });
                    });
                }else if(categoria == "Grageados"){
                    DBM.getAllProductsByCategoryType('Grageados', function(err, grageados){
                        var json = {
                            grageados: grageados
                        };
                        res.json(json);
                    });
                }else if(categoria == "Con palo"){
                    DBM.getAllProductsByCategoryType('Con palo', function(err, conPalo){
                        var json = {
                            conPalo: conPalo
                        };
                        res.json(json);
                    });
                }
            }
        }
    });

    // Login como usuario proveedor o administrador

    app.post('/api/login', function(req, res){
        DBM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
            if (!o){
                res.send(e, 400);
            }	else{
                console.log("Usuario: " + o.user);
                console.log("Pass: " + o.pass);
                req.session.user = o;
                if (req.param('remember-me') == 'true'){
                    res.cookie('user', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.send(o, 200);
            }
        });
    });

    // Cierre de sesion

    app.get('/api/logout', function(req, res){
        res.clearCookie('user');
        res.clearCookie('pass');
        req.session.destroy(function(e){
            res.send('ok', 200);
        });
    });

    app.get('/api/lastURL', function(req, res){
        res.send(req.session.ultimaPagina, 200);
    })


    // Registrarse como nuevo usuario

    app.post('/api/signup', function(req, res){
        // FALTA COMPROBAR SI EL USUARIO YA EXISTE O NO. EN EL PROYECTO DE CBD SOLO SE COMPRUEBA EN EL CLIENTE
        DBM.addNewAccount({
            //name 	: req.param('name'),
            //email 	: req.param('email'),
            user 	: req.param('user'),
            pass	: req.param('pass'),
            active  : false,
            role    : roles[0]
            //country : req.param('country')
        }, function(e){
            if (e){
                console.log(e, 400);
                res.send(e, 400);
            }	else{
                console.log('ok', 200);
                res.send('ok', 200);
            }
        });
    });

    app.get('/api/user', function(req, res) {
        if(req.session.user == null){
            res.send("not-loguedin-user", 400);
        }else{
            var data = {
                user : req.session.user.user,
                name : req.session.user.name
            };
            res.send(JSON.stringify(data), 200);
        }
    });

    var actualizarUltimaPagina = function(req){
        // El if se podria omitir, pero lo dejamos para tener un mayor control

        console.log("Ruta previa: " + req.path);
        if(req.path.indexOf("api") == -1 && req.path.indexOf("login") == -1){
            req.session.ultimaPagina = req.path;
        }
    };

    var funcionesComunes = function(req){
        actualizarUltimaPagina(req);
    };

    app.get('*', function(req, res) {
        res.render('index');
    });
}
