var DBM           = require('./modules/data-base-manager');

var roles = ['provider', 'admin'];

var ultimaPagina = "";

var https = require('https');

module.exports = function(app){

    // Vistas de la web

    app.get('/gamaPropia/blandos.html', function(req, res) {
        res.render('blandos');
    });

    // Vista principal


    app.get('/', function(req, res) {
        funcionesComunes(req);
        if(req.session.user == null){
            res.render('index');
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/dashboard');
            }else{
                res.render('index');
            }
        }
    });

    app.get('/gamaPropia', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia');
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

    app.get('/gamaPropia/duros/especiales', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/especiales');
    });

    app.get('/gamaPropia/duros/especiales/:id', function(req, res) {
        funcionesComunes(req);
        res.render('gamaPropia/duros/especiales/infoEspeciales');
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
        if(req.session.user == null){
            res.render('login');
        }else{
            res.render('error',{
                message : 'No puede acceder de nuevo a la aplicación porque ya está logueado.'
            });
        }
    });

    app.get('/signup', function(req, res){
        res.render('signup');
    });

    app.get('/carrito', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al carrito de la compra si no está logueado.'
            });
        }else{
            res.render('carrito');
        }
    });

    app.get('/contacto', function(req, res){
        res.render('contacto');
    });

    app.get('/emails', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder a los emails enviados a La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/emails', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder a los emails enviados a La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/emails/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder a los emails enviados a La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/email', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder a los emails enviados a La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
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
            if(err){
                console.log(err);
            }else{
                res.send(toffees);
            }
        });
    });

    app.get('/api/toffees/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Toffee', req.params.id, function(err, toffee){
            if(err){
                console.log(err);
            }else{
                res.send(toffee[0]);
            }
        });
    });

    app.get('/api/masticables', function(req, res) {
        DBM.getAllProductsByCategoryType('Masticable', function(err, masticables){
            if(err){
                console.log(err);
            }else{
                res.send(masticables);
            }
        });
    });

    app.get('/api/masticables/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Masticable', req.params.id, function(err, masticable){
            if(err){
                console.log(err);
            }else{
                res.send(masticable[0]);
            }
        });
    });

    app.get('/api/crystals', function(req, res) {
        DBM.getAllProductsByCategoryType('Crystal', function(err, crystals){
            if(err){
                console.log(err);
            }else{
                res.send(crystals);
            }
        });
    });

    app.get('/api/crystals/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Crystal', req.params.id, function(err, crystal){
            if(err){
                console.log(err);
            }else{
                res.send(crystal[0]);
            }
        });
    });

    app.get('/api/glorias', function(req, res) {
        DBM.getAllProductsByCategoryType('Gloria', function(err, glorias){
            if(err){
                console.log(err);
            }else{
                res.send(glorias);
            }
        });
    });

    app.get('/api/glorias/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Gloria', req.params.id, function(err, gloria){
            if(err){
                console.log(err);
            }else{
                res.send(gloria[0]);
            }
        });
    });

    app.get('/api/ponnies', function(req, res) {
        DBM.getAllProductsByCategoryType('Ponny', function(err, glorias){
            if(err){
                console.log(err);
            }else{
                res.send(glorias);
            }
        });
    });

    app.get('/api/ponnies/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Ponny', req.params.id, function(err, gloria){
            if(err){
                console.log(err);
            }else{
                res.send(gloria[0]);
            }
        });
    });

    app.get('/api/especiales', function(req, res) {
        DBM.getAllProductsByCategoryType('Especial', function(err, especiales){
            if(err){
                console.log(err);
            }else{
                res.send(especiales);
            }
        });
    });

    app.get('/api/especiales/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Especial', req.params.id, function(err, especiales){
            if(err){
                console.log(err);
            }else{
                res.send(especiales[0]);
            }
        });
    });

    app.get('/api/grageados', function(req, res) {
        DBM.getAllProductsByCategoryType('Grageados', function(err, grageados){
            if(err){
                console.log(err);
            }else{
                res.send(grageados);
            }
        });
    });

    app.get('/api/grageados/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Grageados', req.params.id, function(err, grageados){
            if(err){
                console.log(err);
            }else{
                res.send(grageados[0]);
            }
        });
    });

    app.get('/api/conPalo', function(req, res) {
        DBM.getAllProductsByCategoryType('Con palo', function(err, conPalo){
            if(err){
                console.log(err);
            }else{
                res.send(conPalo);
            }
        });
    });

    app.get('/api/conPalo/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Con palo', req.params.id, function(err, conPalo){
            if(err){
                console.log(err);
            }else{
                res.send(conPalo[0]);
            }
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

                            if(err){
                                console.log(err);
                            }else{
                                res.json(json, 200);
                            }
                        });
                    });
                }else if(categoria == "Duros"){
                    DBM.getAllProductsByCategoryType('Crystal', function(err1, crystals){
                        DBM.getAllProductsByCategoryType('Gloria', function(err2, glorias){
                            DBM.getAllProductsByCategoryType('Ponny', function(err3, ponnies){
                                DBM.getAllProductsByCategoryType('Especial', function(err4, especiales){

                                    var json = {
                                        crystals: crystals,
                                        glorias: glorias,
                                        ponnies: ponnies,
                                        especiales: especiales
                                    };
                                    if(err1){
                                        console.log(err1);
                                    }else if(err2){
                                        console.log(err2);
                                    }else if(err3){
                                        console.log(err3);
                                    }else if(err4){
                                        console.log(err4);
                                    }else{
                                        res.json(json, 200);
                                    }
                                });
                            });
                        });
                    });
                }else if(categoria == "Grageados"){
                    DBM.getAllProductsByCategoryType('Grageados', function(err, grageados){
                        if(err){
                            console.log(err);
                        }else{
                            var json = {
                                grageados: grageados
                            };
                            res.json(json, 200);
                        }
                    });
                }else if(categoria == "Con palo"){
                    DBM.getAllProductsByCategoryType('Con palo', function(err, conPalo){
                        if(err){
                            console.log(err);
                        }else{
                            var json = {
                                conPalo: conPalo
                            };
                            res.json(json, 200);
                        }
                    });
                }
            }
        }
    });

    // Login como usuario proveedor o administrador

    app.post('/api/login', function(req, res){
        if(req.cookies.user == undefined || req.cookies.pass == undefined){
            DBM.manualLogin(req.param('user'), req.param('pass'), function(e, o){
                if (!o){
                    res.send(e, 400);
                }	else{
                    console.log("Usuario: " + o.user);
                    console.log("Pass: " + o.pass);
                    req.session.user = o;
                    if (req.param('recordar') == true){
                        console.log("Guardamos las cookies");
                        console.log("User: " + o.user);
                        console.log("Pass: " + o.pass);
                        res.cookie('user', o.user, { maxAge: 900000 });
                        res.cookie('pass', o.pass, { maxAge: 900000 });
                    }
                    res.send(o, 200);
                }
            });
        }else{
            DBM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
                if(o != null){
                    res.send(o, 200);
                }else{
                    res.render('login');
                }
            });
        }
    });

    // Cierre de sesion

    app.get('/api/logout', function(req, res){
        res.clearCookie('user');
        res.clearCookie('pass');
        //console.log("redirect: " + ultimaPagina);
        //res.redirect('/');

        // Recordar que por cada peticion solo puede haber una respuesta. De ahi que el redirect no funcione.
        req.session.destroy(function(e){
            // Solo he conseguido redirigir de forma estatica. Usando la variable ultimaPagina no funciona la redireccion
            res.send('ok',{
                'Location': '/'
            }, 200);
        });
    });

    app.get('/api/lastURL', function(req, res){
        //console.log("Ultima pagina: " + req.session.ultimaPagina);
        //res.send(req.session.ultimaPagina, 200);

        console.log("Ultima pagina: " + ultimaPagina);
        res.send(ultimaPagina, 200);
    });


    // Registrarse como nuevo usuario

    app.post('/api/signup', function(req, res){

        var usuario = req.param('user');
        var pass    = req.param('pass');
        var errores = {};

        var hayErrores = false;

        if(usuario == undefined){
            errores.usuarioVacio = true;
            hayErrores = true;
        }else{
            if(usuario.length == 0){
                errores.usuarioVacio = true;
                hayErrores = true;
            }

            for(i=0; i<usuario.length;i++){
                if(usuario.charAt(i) == " "){
                    errores.usuarioInvalido = true;
                    hayErrores = true;
                }
            }

        }
        if(pass == undefined){
            errores.passVacio = true;
            hayErrores = true;

        }else{
            if(pass.length == 0){
                errores.passVacio = true;
                hayErrores = true;
            }
        }
        if(!hayErrores){
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
        }else{
            res.send(errores, 400);
        }
    });

    // Datos del usuario logueado

    app.get('/api/user', function(req, res) {
        if(req.session.user == null){
            res.send("not-loguedin-user", 400);
        }else{
            var data = {
                user : req.session.user.user,
                name : req.session.user.name,
                role : req.session.user.role
            };
            res.send(JSON.stringify(data), 200);
        }
    });

    // Datos del usuario en las cookies

    /*
    app.get('/api/userCookies', function(req, res){
        console.log("Cookies: " + req.cookies.user + ", " + req.cookies.pass);
        if(req.cookies.user != undefined && req.cookies.pass != undefined){
            var data = {
                user : req.cookies.user,
                pass : req.cookies.pass
            };
            res.send(JSON.stringify(data), 200);
        }else{
            res.send("empty-cookies", 400);
        }
    });
    */

    // Carrito de la compra

    app.get('/api/shoppingCart', function(req, res){
        var productos = req.session.shoppingCartProducts;
        var json = [
            {

            }];
        if(productos == undefined){
            res.send({}, 200);
        }else{
            for(i=0;i<productos.length;i++){
                json[i] = productos[i];
            }
            console.log(JSON.stringify(json));
            res.send(json, 200);
        }
    });

    // Comprar producto

    app.post('/api/shoppingCart', function(req, res){
        var id = req.body.id;
        var category = req.body.category;
        var type = req.body.type;

        if(category == "Grageados" || category == "Con palo"){
            type = category;
        }

        DBM.getProductByCategoryTypeAndId(type, id, function(err, query){
            /*if(!req.session.shoppingCart){ // El carrito aún no se ha creado

            }*/
            var productos = req.session.shoppingCartProducts;
            var productoDuplicado = false;

            console.log("Resultado de la busqueda: " + JSON.stringify(query));

            if(productos == undefined){ // El carrito esta vacio
                console.log("El carrito esta vacio.");
                req.session.shoppingCartProducts = [];
                req.session.shoppingCartProducts[0] = query[0];
                res.send(query[0], 200);
            }else{ // Ya hay productos en el carrito
                console.log("El carrito tiene productos.");
                for(i=0;i<productos.length;i++){// Comprobamos si el producto a añadir ya estaba en el carrito
                    if(productos[i]._id == id){
                        productoDuplicado = true;
                    }
                }
                if(productoDuplicado){
                    console.log("El producto ya estaba en el carrito.");
                    res.send("product-already-exists", 400);
                }else{
                    console.log("Añadimos el producto al carrito.");
                    req.session.shoppingCartProducts[req.session.shoppingCartProducts.length] = query[0];

                    res.send(query[0], 200);
                }
            }
        });
    });

    app.put('/api/shoppingCart', function(req, res){
        var productos = req.body.productos;

        var validado = true;

        for(i=0;i<req.session.shoppingCartProducts.length;i++){
            if(Number(req.session.shoppingCartProducts[i].minimumOrder) > Number(productos[i].quantity)){
                validado = false;
            }
        }

        if(validado){
            console.log("Validado correctamente.");

            req.session.shoppingCartProducts = [];
            for(i=0;i<productos.length;i++){
                try{
                    if(req.session.shoppingCartProducts[i].quantity){
                        console.log("Cantidad anterior: " + req.session.shoppingCartProducts[i].quantity);
                    }
                }catch(Exception){
                    console.log(Exception);
                }

                console.log("Cantidad posterior: " + productos[i].quantity);
                req.session.shoppingCartProducts[i] = productos[i];
            }
            res.send("saved", 200);
        }else{
            res.send("error", 400);
        }
    });








    app.get('/api/emails', function(req, res){
        if(req.session.user == null){
            res.send('unauthorized',400);
        }else{
            if(req.session.user.role == "admin"){
                DBM.getAllEmails(function(err, mails){
                    if(err){
                        console.log(err);
                    }else{
                        res.send(mails, 200);
                    }
                });
            }else{
                res.send('unauthorized', 400);
            }
        }
    });





    app.get('/api/emails/:id', function(req, res){
        if(req.session.user == null){
            res.send('unauthorized',400);
        }else{
            if(req.session.user.role == "admin"){
                console.log("Id del email: " + req.params.id);
                DBM.getEmailById(req.params.id, function(err, mail){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Email: " + JSON.stringify(mail));

                        if(mail.leido == false){
                            DBM.setEmailReaded(req.params.id, function(err2, mail2){
                                if(err2){
                                    console.log(err2);
                                }else{
                                    console.log("Mail final: " + mail2.leido);
                                    res.send(mail2, 200);
                                }
                            });
                        }else{
                            res.send(mail, 200);
                        }
                    }
                });
            }else{
                res.send('unauthorized', 400);
            }
        }
    });

    app.post('/api/emails', function(req, res){
        var nombre = req.body.nombre;
        var email = req.body.email;
        var mensaje = req.body.mensaje;

        var hayErrores = false;

        // Hay que validar los campos al igual que se hace en el cliente

        if(!hayErrores){
            DBM.addNewEmail({
                nombre      : nombre,
                direccion   : email,
                mensaje     : mensaje,
                leido       : false
            }, function(e){
                if(e){
                    console.log("Error al enviar email");
                }else{
                    res.send("ok", 200);
                }
            });
        }
    });

    app.delete('/api/emails/:id', function(req, res){
        DBM.deleteEmail(req.params.id, function(err, mail){
            if(err){
                console.log(err);
            }else{
                DBM.getAllEmails(function(err2, mails){
                    if(err2){
                        console.log(err2);
                    }else{
                        res.send(mails, 200);
                    }
                });
            }
        });
    });

    // Auxiliar query methods

    app.get('/query/notReadedEmails', function(req, res){
        DBM.getNotReadedEmails(function(err, emails){
            if(err){
                console.log(err);
            }else{
                res.send(emails, 200);
            }
        });
    });

    app.get('/query/notReadedEmailsNumber', function(req, res){
        DBM.getNotReadedEmails(function(err, emails){
            if(err){
                console.log(err);
            }else{
                console.log(emails.length);
                res.send({
                    emails: emails.length
                }, 200);
            }
        });
    });

    app.get('/query/notReadedOrders', function(req, res){
        DBM.getNotReadedOrders(function(err, orders){
            if(err){
                console.log(err);
            }else{
                console.log(orders.length);
                res.send({
                    orders: orders.length
                }, 200);
            }
        })
    });


    var actualizarUltimaPagina = function(req){
        // El if se podria omitir, pero lo dejamos para tener un mayor control

        console.log("Ruta previa: " + req.path);
        if(req.path.indexOf("/api/") == -1 && req.path.indexOf("login") == -1){
            console.log("Ultima pagina actualizada: " + req.path);
            //req.session.ultimaPagina = req.path;
            ultimaPagina = req.path;
        }
    };

    var funcionesComunes = function(req){
        actualizarUltimaPagina(req);
    };

    app.get('/lastModified', function(req, res){

        var github = require('octonode');

        var client1 = github.client();

        var repo      = client1.repo('jualoppaz/lagloria');

        var request = require('request-json');
        var client2 = request.newClient('https://api.github.com');

        var json = client2.get('repos/jualoppaz/lagloria/git/refs/heads/master', function(err, response, body) {
            console.log("RESPUESTA");
            console.log(body);

            var sha = body.object.sha;

            repo.commit(sha, function(error, commit){
                if(error){
                    res.send(error, 400);
                }else{
                    //var date = isodate(commits[0].commit.committer.date);
                    /*
                    res.send({
                        fecha: commits[0].commit.committer.date
                    }, 200);
                    */
                    res.send({
                        fecha: commit.commit.committer.date
                    }, 200);
                }
            });
        });



        /*
        repo.commits(function(error, commits){
            if(error){
                res.send(error, 400);
            }else{
                //var date = isodate(commits[0].commit.committer.date);
                res.send({
                    fecha: commits[0].commit.committer.date
                }, 200);
            }
        });
        */


    });

    app.get('*', function(req, res) {
        res.render('index');
    });
}
