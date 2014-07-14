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
        res.render('gamaPropia/toffeesYMasticables/toffees/info');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/masticables');
    });

    app.get('/gamaPropia/toffeesYMasticables/masticables/:id', function(req, res) {
        res.render('gamaPropia/toffeesYMasticables/masticables/info');
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
            console.log(masticable[0]);
        });
    });

    app.get('*', function(req, res) {
        res.render('index');
    });
}
