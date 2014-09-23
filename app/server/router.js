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
        if(req.session.user == null && req.cookies.user == undefined){
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
        console.log("Usuario de sesion: " + req.session.user);
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

    app.get('/admin/emails', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder a los emails enviados a La Gloria S.L. porque no' +
                    ' tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/emails', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder a los emails enviados a La Gloria S.L. porque ' +
                        'no tiene permisos de administración.'
                });
            }
        }
    });


    app.post('/error', function(req, res){
        var message = req.body.message;
        res.render('error',{
            message: message
        });
    });


    app.get('/admin/emails/:id', function(req, res){
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

    app.get('/admin/usuarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede ver los usuarios registrados en La Gloria S.L. porque no' +
                    ' tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/usuarios', 200);
            }else{
                res.render('error',{
                    message : 'No puede ver los usuarios registrados en La Gloria S.L. porque ' +
                        'no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/usuarios/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede ver los usuarios registrados en La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/usuario', 200);
            }else{
                res.render('error',{
                    message : 'No puede ver los usuarios registrados en Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/categoria', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/categoria', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/crystal/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/especial/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/ponny/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/gloria/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/grageados', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/categoria', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/grageados/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/conPalo', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/categoria', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/conPalo/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == 'admin'){
                res.render('admin/producto', 200);
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/toffees/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/producto');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/masticables/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/producto');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/producto');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });


    app.get('/admin/toffeesYMasticables/toffees/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/masticables/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/gloria/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/especial/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/ponny/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/crystal/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/grageados/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/conPalo/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/toffees/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/masticables/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/gloria/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/crystal/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/especial/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/duros/ponny/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/grageados/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });
    app.get('/admin/conPalo/:id/valoraciones', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/valoraciones');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/toffeesYMasticables/masticables/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/masticable');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });


    app.get('/admin/toffeesYMasticables/masticables/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/comentarios');
            }else{
                res.render('error',{
                    message : 'No puede acceder al panel de administración de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/pedidos', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder a los pedidos de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/pedidos');
            }else{
                res.render('error',{
                    message : 'No puede acceder a los pedidos de La Gloria S.L. porque no tiene permisos de administración.'
                });
            }
        }
    });

    app.get('/admin/pedidos/:id', function(req, res){
        if(req.session.user == null){
            res.render('error',{
                message : 'No puede acceder a los pedidos de La Gloria S.L. porque no tiene permisos de administración.'
            });
        }else{
            if(req.session.user.role == "admin"){
                res.render('admin/pedido');
            }else{
                res.render('error',{
                    message : 'No puede acceder a los pedidos de La Gloria S.L. porque no tiene permisos de administración.'
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

    app.get('/api/toffeesYMasticables', function(req, res){
        DBM.getAllProductsByCategory('Toffees y Masticables', function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(result);
            }
        });
    });

    app.get('/api/duros', function(req, res){
        DBM.getAllProductsByCategory('Duros', function(err, result){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(result);
            }
        });
    });

    app.get('/api/:category/:id/comentarios', function(req, res){

        var id = req.params.id;

        var category = req.params.category;

        var type = req.params.type;


        var categoria = "";

        if(category == null){
            res.send('category-not-found', 400);
        }else{
            if(id == null){
                res.send('id-not-found', 400);
            }else{
                if(category == 'toffeesYMasticables'){
                    categoria = 'Toffees y Masticables';
                }else if(category == 'duros'){
                    categoria = 'Duros';
                }else if(category == 'grageados'){
                    categoria = 'Grageados';
                }else if(category == 'conPalo'){
                    categoria = 'Con palo';
                }

                if(categoria == ""){
                    res.send('category-not-found', 400);
                }else{

                    DBM.getAllProductCommentsByCategoryAndId(categoria, id, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            console.log("Resultado: " + JSON.stringify(result[0], null, 4));
                            res.send(result[0]);
                        }
                    });
                }
            }
        }
    });

    app.get('/api/:category/:type/:id/valoraciones', function(req, res){

        var id = req.params.id;

        var category = req.params.category;

        var type = req.params.type;


        var categoria = "";

        if(category == null){
            res.send('category-not-found', 400);
        }else{
            if(type == null){
                res.send('type-not-found', 400);
            }else{
                if(id == null){
                    res.send('id-not-found', 400);
                }else{

                    if(type == 'toffees'){
                        categoria = "Toffee";
                    }else if(type == 'masticables'){
                        categoria = "Masticable";
                    }else if(type == "gloria"){
                        categoria = "Gloria";
                    }else if(type == "crystal"){
                        categoria = "Crystal";
                    }else if(type == "especial"){
                        categoria = "Especial";
                    }else if(type == "ponny"){
                        categoria = "Ponny";
                    }else if(type == "grageados"){
                        categoria = "Grageados";
                    }else if(type == "conPalo"){
                        categoria = "Con palo";
                    }

                    console.log("pregunta por: " + categoria);
                    DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            console.log("Resultado: " + JSON.stringify(result, null, 4));
                            res.send({
                                likes: result[0].likes,
                                dislikes: result[0].dislikes
                            }, 200);
                        }
                    });
                }
            }
        }
    });

    // Borrar comentario

    app.put('/api/:category/:id/comentarios', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){

                var id = req.params.id;

                var category = req.params.category;

                var categoria = "";

                if(category == null){
                    res.send('category-not-found', 400);
                }else{
                    if(id == null){
                        res.send('id-not-found', 400);
                    }else{
                        if(category == 'toffeesYMasticables'){
                            categoria = 'Toffees y Masticables';
                        }else if(category == 'duros'){
                            categoria = 'Duros';
                        }else if(category == 'grageados'){
                            categoria = 'Grageados';
                        }else if(category == 'conPalo'){
                            categoria = 'Con palo';
                        }

                        if(categoria == ""){
                            res.send('category-not-valid', 400);
                        }else{

                            DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                                if(err){
                                    res.send(err);
                                }else{
                                    if(result == null){
                                        res.send('product-not-found');
                                    }else{
                                        DBM.deleteProductCommentByCategoryTypeAndId(categoria, id, req.body, function(err2, result2){
                                            if(err2){
                                                res.send(err2);
                                            }else{
                                                DBM.getAllProductCommentsByCategoryAndId(categoria, id, function(err3, result3){
                                                    if(err3){
                                                        res.send(err3);
                                                    }else{
                                                        console.log("result3: " + JSON.stringify(result3, null, 4));
                                                        res.send(result3[0], 200);
                                                    }
                                                })
                                            }
                                        });
                                    }

                                }
                            });
                        }
                    }
                }

            }else{
                res.send('not-authorized', 400);
            }
        }

    });


    // Borrar valoracion

    app.put('/api/:category/:type/:id/valoraciones/:tipo', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){

                var id = req.params.id;

                var category = req.params.category;

                var categoria = "";

                var type = req.params.type;

                var tipo = req.params.tipo;

                if(category == null){
                    res.send('category-not-found', 400);
                }else{

                    if(type == null){
                        res.send('type-not-found', 400);
                    }else{


                        if(id == null){
                            res.send('id-not-found', 400);
                        }else{

                            if(tipo == null){
                                res.send('tipo-not-found', 400);
                            }else{

                                if(category == 'toffeesYMasticables'){
                                    categoria = 'Toffees y Masticables';
                                }else if(category == 'duros'){
                                    categoria = 'Duros';
                                }else if(category == 'grageados'){
                                    categoria = 'Grageados';
                                }else if(category == 'conPalo'){
                                    categoria = 'Con palo';
                                }

                                if(categoria == ""){
                                    res.send('category-not-valid', 400);
                                }else{

                                    DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                                        if(err){
                                            res.send(err);
                                        }else{
                                            if(result == null){
                                                res.send('product-not-found');
                                            }else{

                                                if(tipo == "like"){
                                                    DBM.deleteLikeByCategoryTypeAndId(categoria, id, req.body, function(err2, result2){
                                                        if(err2){
                                                            res.send(err2);
                                                        }else{
                                                            if(type == 'toffees'){
                                                                categoria = "Toffee";
                                                            }else if(type == 'masticables'){
                                                                categoria = "Masticable";
                                                            }else if(type == "gloria"){
                                                                categoria = "Gloria";
                                                            }else if(type == "crystal"){
                                                                categoria = "Crystal";
                                                            }else if(type == "especial"){
                                                                categoria = "Especial";
                                                            }else if(type == "ponny"){
                                                                categoria = "Ponny";
                                                            }else if(type == "grageados"){
                                                                categoria = "Grageados";
                                                            }else if(type == "conPalo"){
                                                                categoria = "Con palo";
                                                            }

                                                            console.log("pregunta por: " + categoria);
                                                            DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                                                                if(err){
                                                                    res.send(err);
                                                                }else{
                                                                    console.log("Resultado: " + JSON.stringify(result, null, 4));
                                                                    res.send({
                                                                        likes: result[0].likes,
                                                                        dislikes: result[0].dislikes
                                                                    }, 200);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }else if(tipo == "dislike"){
                                                    DBM.deleteDislikeByCategoryTypeAndId(categoria, id, req.body, function(err2, result2){
                                                        if(err2){
                                                            res.send(err2);
                                                        }else{
                                                            if(type == 'toffees'){
                                                                categoria = "Toffee";
                                                            }else if(type == 'masticables'){
                                                                categoria = "Masticable";
                                                            }else if(type == "gloria"){
                                                                categoria = "Gloria";
                                                            }else if(type == "crystal"){
                                                                categoria = "Crystal";
                                                            }else if(type == "especial"){
                                                                categoria = "Especial";
                                                            }else if(type == "ponny"){
                                                                categoria = "Ponny";
                                                            }else if(type == "grageados"){
                                                                categoria = "Grageados";
                                                            }else if(type == "conPalo"){
                                                                categoria = "Con palo";
                                                            }

                                                            console.log("pregunta por: " + categoria);
                                                            DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                                                                if(err){
                                                                    res.send(err);
                                                                }else{
                                                                    console.log("Resultado: " + JSON.stringify(result, null, 4));
                                                                    res.send({
                                                                        likes: result[0].likes,
                                                                        dislikes: result[0].dislikes
                                                                    }, 200);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }else{
                                                    res.send('Tipo de valoración no válida', 400);
                                                }


                                            }

                                        }
                                    });
                                }
                            }
                        }
                    }
                }

            }else{
                res.send('not-authorized', 400);
            }
        }

    });

    app.delete('/api/:category/:id', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){

                var id = req.params.id;

                var category = req.params.category;

                var categoria = "";

                if(category == null){
                    res.send('category-not-found', 400);
                }else{
                    if(id == null){
                        res.send('id-not-found', 400);
                    }else{
                        if(category == 'toffeesYMasticables'){
                            categoria = 'Toffees y Masticables';
                        }else if(category == 'duros'){
                            categoria = 'Duros';
                        }else if(category == 'grageados'){
                            categoria = 'Grageados';
                        }else if(category == 'conPalo'){
                            categoria = 'Con palo';
                        }

                        if(categoria == ""){
                            res.send('category-not-valid', 400);
                        }else{

                            DBM.getProductByCategoryTypeAndId(categoria, id, function(err, result){
                                if(err){
                                    res.send(err);
                                }else{
                                    if(result == null){
                                        res.send('product-not-found');
                                    }else{
                                        DBM.deleteProductByCategoryTypeAndId(categoria, id, function(err2, result2){
                                            if(err2){
                                                res.send(err2);
                                            }else{
                                                DBM.getAllProductsByCategory(categoria, function(err3, result3){
                                                    if(err3){
                                                        res.send(err3);
                                                    }else{
                                                        res.send(result3, 200);
                                                    }
                                                })
                                            }
                                        });
                                    }

                                }
                            });
                        }
                    }
                }

            }else{
                res.send('not-authorized', 400);
            }
        }

    });

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

    app.put('/api/toffees/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Toffee', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Toffee', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/masticables/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Masticable', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Masticable', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/crystals/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Crystal', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Crystal', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/glorias/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Gloria', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Gloria', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/ponnies/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Ponny', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Ponny', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/especiales/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Especial', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Especial', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/grageados/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Grageados', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Grageados', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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

    app.put('/api/conPalo/:id', function(req, res) {
        DBM.getProductByCategoryTypeAndId('Con palo', req.params.id, function(err, masticable){
            if(err){
                res.send(err);
            }else{
                DBM.editProductByCategoryTypeAndId('Con palo', req.params.id, req.body, function(err2, result){
                    if(err2){
                        res.send(err2);
                    }else{
                        res.send('ok');
                    }
                });
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
                    if(o.role == "admin"){
                        ultimaPagina = "/";
                    }
                    res.send(o, 200);
                }
            });
        }else{
            DBM.autoLogin(req.cookies.user, req.cookies.pass, function(o){
                if(o != null){
                    if(o.role == "admin"){
                        ultimaPagina = "/";
                    }
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
                user 	    : req.param('user'),
                pass	    : req.param('pass'),
                estaActivo  : false,
                role        : roles[0],
                estaBaneado : false
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

    // Usuarios registrados en el sistema

    app.get('/api/users', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized');
        }else{
            if(req.session.user.role == "admin"){
                DBM.getAllRecords(function(err, users){
                    if(err){
                        console.log(err);
                    }else{
                        res.send(users, 200);
                    }
                });
            }else{
                res.send('not-authorized');
            }
        }
    });

    app.get('/api/users/:id', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized');
        }else{
            if(req.session.user.role == "admin"){
                DBM.findUserById(req.params.id, function(err, user){
                    if(err){
                        console.log(err);
                    }else{
                        res.send(user, 200);
                    }
                });
            }else{
                res.send('not-authorized');
            }
        }
    });

    // Editar usuario desde el panel de administracion

    app.put('/api/users/:id', function(req, res){

        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){
                var usuario = req.param('user');
                var pass    = req.param('pass');
                var role    = req.param('role');
                var activo  = req.param('estaActivo');
                var baneado = req.param('estaBaneado');
                var date    = req.param('date');
                var id      = req.params.id;


                console.log("Usuario: " + usuario);
                console.log("Password: " + pass);
                console.log("Rol: " + role);
                console.log("Activo: " + activo);
                console.log("Baneado: " + baneado);
                console.log("Date: " + date);
                console.log("Id: " + id);

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
                if(pass == undefined){ // Mantener contrasena

                    pass = '';

                }else{
                    if(pass.length == 0){

                        pass = '';

                    }
                }

                // Comprobamos si el rol recibido existe y es válido

                var rolValido = false;

                for(i=0; i<roles.length; i++){
                    if(roles[i] == role){
                        rolValido = true;
                        if(rolValido){
                            break;
                        }
                    }
                }

                if(!rolValido){
                    hayErrores = true;
                    errores.rolNoValido = true;
                }

                if(activo != true && activo != false){
                    hayErrores = true;
                    errores.valorActivoNoValido = true;
                }

                if(!hayErrores){
                    DBM.actualizarCuenta({
                        user 	    : req.param('user'),
                        pass	    : req.param('pass'),
                        estaActivo  : activo,
                        role        : role,
                        estaBaneado : baneado,
                        _id         : id
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
            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    app.delete('/api/users/:id', function(req, res){
       if(req.session.user == null){
           res.send('not-authorized', 400);
       }else{
           if(req.session.user.role == 'admin'){
               DBM.deleteUser(req.params.id, function(err, user){
                   if(err){
                       console.log(err);
                   }else{
                       DBM.getAllRecords(function(err2, users){
                           if(err2){
                               console.log(err2);
                           }else{
                               res.send(users, 200);
                           }
                       });
                   }
               });
           }else{
               res.send('not-authorized', 400);
           }
       }
    });

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
        if(req.session.user == null){
            console.log("Usuario no logueado");
            res.send("not-loguedin-user", 400);
        }else{
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
                req.session.shoppingCartProducts[0].quantity = query[0].minimumOrder;
                req.session.shoppingCartProducts[0].total = query[0].minimumOrder * query[0].price;
                res.send("ok", 200);
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
                    req.session.shoppingCartProducts[req.session.shoppingCartProducts.length].quantity = query[0].minimumOrder;
                    req.session.shoppingCartProducts[req.session.shoppingCartProducts.length].total = query[0].minimumOrder * query[0].price;
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

    // Consulta de pedidos como administrador

    app.get('/api/orders', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{

            if(req.session.user.role == 'admin'){

                DBM.getAllOrders(function(err, result){
                   if(err){
                       res.send(err);
                   }else{
                       res.send(result);
                   }
                });

            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    app.get('/api/orders/:id', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{

            if(req.session.user.role == 'admin'){

                var id = req.params.id;

                if(id == null){
                    res.send('id-not-found', 400);
                }else{

                    DBM.getOrderById(id, function(err, result){
                        if(err){
                            res.send(err);
                        }else{

                            if(result.leido == false){
                                DBM.setOrderReaded(req.params.id, function(err2, result2){
                                    if(err2){
                                        console.log(err2);
                                    }else{
                                        console.log("Mail final: " + result2.leido);
                                        res.send(result2, 200);
                                    }
                                });
                            }else{
                                res.send(result);
                            }
                        }
                    });
                }

            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    app.put('/api/orders', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{

            if(req.session.user.role == 'admin'){

                var id = req.body._id;

                if(id == null){
                    res.send('id-not-found', 400);
                }else{

                    DBM.getOrderById(id, function(err, result){
                        if(err){
                            res.send(err);
                        }else{

                            DBM.actualizarPedido(req.body, function(err2, result2){
                               if(err2){
                                   res.send(err2);
                               }else{
                                   res.send(result2);
                               }
                            });
                            res.send(result);
                        }
                    });
                }

            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    app.delete('/api/orders/:id', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){

                var id = req.params.id;

                if(id == null){
                    res.send('Debe proporcionar un id.');
                }else{

                    DBM.getOrderById(id, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            if(result == null){
                                res.send('El pedido indicado no existe.');
                            }else{
                                DBM.deleteOrderById(id, function(err2, result2){
                                    if(err2){
                                        res.send(err2);
                                    }else{
                                        DBM.getAllOrders(function(err3, orders){
                                            if(err3){
                                                res.send(err3);
                                            }else{
                                                res.send(orders, 200);
                                            }
                                        });
                                    }
                                });
                            }
                       }
                   });
               }
           }else{
               res.send('not-authorized', 400);
           }
       }
    });

    // Realizacion de un pedido como proveedor

    app.post('/api/orders', function(req, res){
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role = 'provider'){
                console.log("Pedido:");
                console.log(JSON.stringify(req.body, null, 4));

                var errores = [];

                var hayErrores = false;

                var productosRecibidos = req.body.productos;

                var productosSession   = req.session.shoppingCartProducts;

                console.log("Datos de contacto:");
                console.log(req.body);
                console.log(JSON.stringify(req.param('datosContacto'), null, 4));

                var direccion = req.param('datosContacto').direccion;
                var telefono = req.param('datosContacto').telefono;

                if(productosSession.length != productosRecibidos.length){
                    hayErrores = true;
                    errores.push({
                        error: 'El numero de productos en el servidor y en el cliente no coincide'
                    });
                }else if(direccion == null || telefono == null){
                    hayErrores = true;
                    errores.push({
                        error: 'Los datos de contactos no han sido proporcionados'
                    });
                }else{

                    var totalCarritoCliente = 0;

                    var totalCarritoServidor = 0;

                    for(i=0; i<productosRecibidos.length;i++){ // Recorremos los productos recibidos en el body
                        for(j=0; j<productosSession.length;j++){ // Recorremos los productos de la session
                            if(productosRecibidos[i]._id == productosSession[j]._id){ // Es el mismo producto

                                console.log("Producto recibido: ");
                                console.log(JSON.stringify(productosRecibidos[i], null, 4));

                                console.log("Producto session: ");
                                console.log(JSON.stringify(productosSession[j], null, 4));

                                /*
                                Primero comprobamos que se trata del mismo producto y que
                                no ha sido manipulado
                                 */

                                var categoryRecibido        = productosRecibidos[i].category;
                                var typeRecibido            = productosRecibidos[i].type;
                                var modelRecibido           = productosRecibidos[i].model;
                                var priceRecibido           = productosRecibidos[i].price;
                                var minimumOrderRecibido    = productosRecibidos[i].minimumOrder;

                                var categorySession         = productosSession[j].category;
                                var typeSession             = productosSession[j].type;
                                var modelSession            = productosSession[j].model;
                                var priceSession            = productosSession[j].price;
                                var minimumOrderSession     = productosSession[j].minimumOrder;

                                if(categoryRecibido != categorySession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'La categoría del producto no coincide.'
                                    });
                                }else if(typeRecibido != typeSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El tipo del producto no coincide.'
                                    });
                                }else if(modelRecibido != modelSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El modelo del producto no coincide.'
                                    });
                                }else if(priceRecibido != priceSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El precio del producto no coincide.'
                                    });
                                }else if(minimumOrderRecibido != minimumOrderSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El pedido minimo no coincide.'
                                    });
                                }

                                /*Luego comprobamos que las cantidades indicadas coinciden y que no
                                  se salen del rango
                                 */

                                var quantityRecibido    = productosRecibidos[i].quantity;
                                var quantitySession     = productosSession[j].quantity;

                                if(quantityRecibido != quantitySession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'La cantidad a comprar del producto no coincide.'
                                    });

                                    console.log("Cantidad recibida: " + quantityRecibido);
                                    console.log("Cantidad session: " + quantitySession);
                                }

                                /*
                                    Ahora hacemos los cálculos con los datos del cliente y del servidor.
                                    Así verificamos que no ha habido manipulación alguna.
                                */

                                /* Calculos con datos del cliente */

                                var totalRecibido        = productosRecibidos[i].total;

                                var calculoTotalRecibido = quantityRecibido * priceRecibido;

                                if(totalRecibido != calculoTotalRecibido){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El subtotal del producto no coincide con los datos del cliente.'
                                    });

                                    console.log("Total recibido: " + totalRecibido);
                                    console.log("Calculo total recibido: " + calculoTotalRecibido);
                                }

                                /* Calculos con datos del servidor */

                                var totalSession         = productosSession[j].total;

                                var calculoTotalSession  = quantitySession * priceSession;

                                if(totalSession != calculoTotalSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El subtotal del producto no coincide con los datos del servidor.'
                                    });

                                    console.log("Total session: " + totalSession);
                                    console.log("Calculo total session: " + calculoTotalSession);
                                }

                                /* Verificacion de igualdad de ambos subtotales */

                                if(totalRecibido != totalSession){
                                    hayErrores = true;
                                    errores.push({
                                        error: 'El subtotal del producto del cliente no coincide con el del servidor.'
                                    });
                                }

                                /* Acumulacion de los subtotales para verificacion final */

                                totalCarritoCliente     += totalRecibido;
                                totalCarritoServidor    += totalSession;


                            }
                        }
                    }

                    if(totalCarritoCliente != totalCarritoServidor){
                        hayErrores = true;
                        errores.push({
                            error: 'El precio del carrito del cliente y del servidor no coincide.'
                        });
                    }
                }

                if(hayErrores){
                    console.log(JSON.stringify(errores, null, 4));
                    res.send(errores, 400);
                }else{

                    DBM.addNewOrder(req.session.shoppingCartProducts, req.session.user.user, direccion, telefono, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            req.session.shoppingCartProducts = null;
                            res.send("ok");
                        }
                    });
                }
            }else{
                res.send('not-authorized', 400);
            }
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
        if(req.session.user == null){
            res.send('not-authorized', 400);
        }else{
            if(req.session.user.role == 'admin'){
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
            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    // Auxiliar query methods

    app.get('/query/notReadedEmails', function(req, res){
        DBM.getNotReadedEmails(function(err, emails){
            if(err){
                res.send(err, 400);
            }else{
                res.send(emails, 200);
            }
        });
    });

    app.get('/query/notReadedEmailsNumber', function(req, res){
        DBM.getNotReadedEmails(function(err, emails){
            if(err){
                res.send(err, 400);
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
                res.send(err, 400);
            }else{
                console.log(orders.length);
                res.send({
                    orders: orders.length
                }, 200);
            }
        })
    });

    app.get('/query/newUsers', function(req, res){
        DBM.getNotActiveUsers(function(err, users){
            if(err){
                res.send(err, 400);
            }else{
                res.send({
                    newUsers: users.length
                }, 200);
            }
        });
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

        if(process.env.MONGOHQ_URL){ //Estamos en Heroku
            var github = require('octonode');

            var client1 = github.client();

            var repo      = client1.repo('jualoppaz/lagloria');

            var request = require('request-json');


            var client2 = request.newClient('https://api.github.com');

            /*
             var client2 = github.client({
             username: 'jualoppaz',
             password: ''
             });*/

            var json = client2.get('repos/jualoppaz/lagloria/git/refs/heads/master', function(err, response, body) {
                console.log("RESPUESTA");
                console.log(body);

                /*
                 El try and catch esta por si hemos superado las 60 peticiones permitidas por hora y
                 direccion IP. En ese caso, saltara una excepcion, la cual capturamos para que no
                 caiga el servidor .
                 */

                try{
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
                }catch(Exception){
                    res.send("not-avaible", 400);
                }

            });
        }else{
            res.send("local-environment", 400);
        }





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

    // Acciones

    app.post('/action/comentar', function(req, res){

        if(req.session.user == null){
            res.send('not-logued-user', 400);
        }else{
            if(req.session.user.role == 'provider'){

                console.log(JSON.stringify(req.body));

                var comentario  = req.param('comment');
                var id          = req.param('id');
                var category    = req.param('category');
                var type        = req.param('type');

                var badRequest = false;

                if(type == undefined){
                    if(category == undefined){
                        badRequest = true;
                    }else{
                        type = category;
                    }
                }

                if(comentario == undefined){
                    badRequest = true;
                }

                if(badRequest){
                    res.send('bad-request', 400);
                }else{
                    DBM.addNewCommentToProduct(req.body, req.session.user, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            DBM.getProductByCategoryTypeAndId(type, req.body._id, function(err2, res2){
                                if(err2){
                                    res.send(err2);
                                }else{
                                    res.send(res2[0], 200);
                                }
                            });
                        }
                    });
                }


            }else{
                res.send('not-authorized', 400);
            }
        }
    });

    app.put('/action/editarComentario', function(req, res){

        if(req.session.user == null){
            res.send('not-logued-user', 400);
        }else{
            if(req.session.user.role == 'provider'){

                console.log(JSON.stringify(req.body));


                //res.send('ok');

                var nuevoComentario     = req.param('nuevoComentario');
                var id                  = req.param('id');
                var category            = req.param('category');
                var type                = req.param('type');

                var badRequest = false;

                if(type == undefined){
                    if(category == undefined){
                        badRequest = true;
                    }else{
                        type = category;
                    }
                }

                if(nuevoComentario.text == undefined){
                    badRequest = true;
                }

                if(nuevoComentario.user != req.session.user.user){
                    badRequest = true;
                }

                if(badRequest){
                    res.send('bad-request', 400);
                }else{
                    DBM.getComment(req.session.user.user, req.body, function(err, result){
                       if(err){
                           res.send(err);
                       }else{
                           //console.log("Comentario consultado: " + JSON.stringify(result[0].comments[0]));
                           //console.log("Numero de comentarios: " + result.length);
                           if(result[0].comments.length == 1){
                               console.log("Vamos a editar el comentario");
                               DBM.editProductComment(req.body, req.session.user.user, function(err, result){
                                   if(err){
                                       res.send(err);
                                   }else{
                                       DBM.getProductByCategoryTypeAndId(type, req.body._id, function(err2, res2){
                                           if(err2){
                                               res.send(err2);
                                           }else{
                                               //console.log(res2[0]);
                                               res.send(res2[0], 200);
                                           }
                                       });
                                   }
                               });
                           }else if(result.length > 1){
                               res.send("Hay mas de 1 comentario", 400);
                           }else{
                               res.send("No existe el comentario", 400);
                           }
                       }
                    });



                }


            }else{
                res.send('not-authorized', 400);
            }
        }

    });

    app.put('/action/eliminarComentario', function(req, res){

        if(req.session.user == null){
            res.send('not-logued-user', 400);
        }else{
            if(req.session.user.role == 'provider'){

                console.log(JSON.stringify(req.body));


                //res.send('ok');

                var id                  = req.param('id');
                var category            = req.param('category');
                var type                = req.param('type');
                var comentario          = req.param('comentario');

                var badRequest = false;

                if(type == undefined){
                    if(category == undefined){
                        badRequest = true;
                    }else{
                        type = category;
                    }
                }

                if(comentario.user != req.session.user.user){
                    badRequest = true;
                }

                if(badRequest){
                    res.send('bad-request', 400);
                }else{
                    console.log("Usuario: " + req.session.user.user);
                    console.log("Comentario: " + req.body.comentario.text);
                    DBM.deleteComment(req.body, function(err, result){
                        if(err){
                            res.send(err);
                        }else{
                            DBM.getProductByCategoryTypeAndId(type, req.body._id, function(err2, res2){
                                if(err2){
                                    res.send(err2);
                                }else{
                                    //console.log(res2[0]);
                                    res.send(res2[0], 200);
                                }
                            });
                        }
                    });
                }

            }else{
                res.send('not-authorized', 400);
            }
        }

    });


    app.post('/action/like', function(req, res){

        var userHasAlreadyLike      = false;
        var userHasAlreadyDislike   = false;


        if(req.session.user == null){
            res.send('not-logued-user')
        }else{
            if(req.session.user.role == 'provider'){

                var tipo;

                if(req.body.type == undefined){
                    tipo = req.body.category;
                }else{
                    if(req.body.type.length == 0){
                        tipo = req.body.category;
                    }else{
                        tipo = req.body.type;
                    }
                }

                DBM.getProductByCategoryTypeAndId(tipo, req.body._id, function(err, result){
                    var likes       = result[0].likes;
                    var dislikes    = result[0].dislikes;

                    if(likes != undefined){
                        for(i=0; i<likes.length; i++){
                            console.log('usuario con like: ' + likes[i].user);
                            console.log('usuario logueado: ' + req.session.user.user);
                            if(likes[i].user.toString() === req.session.user.user.toString()){
                                userHasAlreadyLike = true;
                                break;
                            }
                        }
                    }

                    if(dislikes != undefined && !userHasAlreadyLike){ //Comprobamos si habia votado negativamente
                        for(i=0; i<dislikes.length; i++){
                            if(dislikes[i].user.toString() === req.session.user.user.toString()){
                                userHasAlreadyDislike = true;
                                break;
                            }
                        }
                    }

                    if(userHasAlreadyLike || userHasAlreadyDislike){
                        res.send('user-has-already-voted', 400);
                    }else{
                        DBM.addLikeToProduct(req.body, req.session.user.user, function(err, result){
                            if(err){
                                res.send(err);
                            }else{
                                DBM.getProductByCategoryTypeAndId(tipo, req.body._id, function(err2, res2){
                                    if(err2){
                                        res.send(err2);
                                    }else{
                                        res.send(res2[0], 200);
                                    }
                                });
                            }
                        });
                    }
                });

            }else if(req.session.user.role == 'admin'){
                res.send('admin-cannot-like');
            }
        }


    });

    app.post('/action/dislike', function(req, res){

        var userHasAlreadyLike      = false;
        var userHasAlreadyDislike   = false;

        if(req.session.user == null){
            res.send('not-logued-user')
        }else{
            if(req.session.user.role == 'provider'){

                var tipo;

                if(req.body.type == undefined){
                    tipo = req.body.category;
                }else{
                    if(req.body.type.length == 0){
                        tipo = req.body.category;
                    }else{
                        tipo = req.body.type;
                    }
                }

                DBM.getProductByCategoryTypeAndId(tipo, req.body._id, function(err, result){
                    var likes       = result[0].likes;
                    var dislikes    = result[0].dislikes;

                    if(likes != undefined){
                        for(i=0; i<likes.length; i++){
                            if(likes[i].user.toString() === req.session.user.user.toString()){
                                userHasAlreadyLike = true;
                                break;
                            }
                        }
                    }
                    if(dislikes != undefined && !userHasAlreadyLike){
                        for(i=0; i<dislikes.length; i++){
                            if(dislikes[i].user.toString() === req.session.user.user.toString()){
                                userHasAlreadyDislike = true;
                                break;
                            }
                        }
                    }

                    if(userHasAlreadyLike || userHasAlreadyDislike){
                        res.send('user-has-already-voted', 400);
                    }else{
                        DBM.addDislikeToProduct(req.body, req.session.user.user, function(err, result2){
                            if(err){
                                res.send(err);
                            }else{
                                DBM.getProductByCategoryTypeAndId(tipo, req.body._id, function(err2, res2){
                                    if(err2){
                                        res.send(err2);
                                    }else{
                                        res.send(res2[0], 200);
                                    }
                                });
                            }
                        });
                    }
                });

            }else if(req.session.user.role == 'admin'){
                res.send('admin-cannot-like');
            }
        }
    });


    app.get('*', function(req, res) {
        res.render('index');
    });
}
