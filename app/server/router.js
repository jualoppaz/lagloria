module.exports = function(app){

    // Vistas de la web

    app.get('/gamaPropia/blandos.html', function(req, res) {
        res.render('blandos');
    });

    app.get('/index', function(req, res) {
       res.render('index');
    });

    app.get('/gamaPropia', function(req, res) {
       res.render('gamaPropia');
    });

    app.get('/gamaPropia/blandos2', function(req, res) {
        res.render('blandos2');
    });

    app.get('/webAntigua/blandos', function(req, res) {
        res.sendfile('app/server/views/webAntigua/blandos.html');
    });

    app.get('/webAntigua/blandos2', function(req, res) {
        res.sendfile('app/server/views/webAntigua/blandos2.html');
    });

    app.get('*', function(req, res) {
        res.render('index');
    });

    // API REST


}
