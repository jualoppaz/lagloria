var DBM           = require('./modules/data-base-manager');

module.exports = function(app){

    // Vistas de la web

    app.get('/gamaPropia/blandos.html', function(req, res) {
        res.render('blandos');
    });

    // Barra principal

    app.get('/', function(req, res) {
       res.render('index');
    });

    app.get('/gamaPropia', function(req, res) {
       res.render('gamaPropia');
    });


    // Gama propia

    app.get('/gamaPropia/toffeesYMasticables', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables');
    });

    app.get('/gamaPropia/toffeesYMasticables/toffees', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/toffees');
    });

    app.get('/gamaPropia/toffeesYMasticables/toffees/:id', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/toffees/infoToffee');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/masticables');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables/:id', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/masticables/infoMasticable');
    });

    app.get('/gamaPropia/duros', function(req, res) {
        res.render('gamaPropia/duros');
    });

    app.get('/gamaPropia/duros/crystal', function(req, res) {
        res.render('gamaPropia/duros/crystals');
    });

    app.get('/gamaPropia/duros/crystal/:id', function(req, res) {
        res.render('gamaPropia/duros/crystals/infoCrystal');
    });

    app.get('/gamaPropia/duros/gloria', function(req, res) {
        res.render('gamaPropia/duros/glorias');
    });

    app.get('/gamaPropia/duros/gloria/:id', function(req, res) {
        res.render('gamaPropia/duros/glorias/infoGloria');
    });

    app.get('/gamaPropia/duros/ponny', function(req, res) {
        res.render('gamaPropia/duros/ponnies');
    });

    app.get('/gamaPropia/duros/ponny/:id', function(req, res) {
        res.render('gamaPropia/duros/ponnies/infoPonny');
    });

    app.get('/gamaPropia/duros/sinGrupo', function(req, res) {
        res.render('gamaPropia/duros/sinGrupo');
    });

    app.get('/gamaPropia/duros/sinGrupo/:id', function(req, res) {
        res.render('gamaPropia/duros/sinGrupo/infoSinGrupo');
    });

    app.get('/gamaPropia/grageados', function(req, res) {
        res.render('gamaPropia/grageados');
    });

    app.get('/gamaPropia/grageados/:id', function(req, res) {
        res.render('gamaPropia/grageados/infoGrageados');
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

    app.get('*', function(req, res) {
        res.render('index');
    });
}
