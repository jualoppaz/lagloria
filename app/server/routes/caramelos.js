//File: routes/caramelos.js

module.exports = function(app) {

    var Caramelo = require('./caramelo.js');

    //GET - Devuelve todos los caramelos en la BD
    findAllCaramelos = function(req, res) {
        Caramelo.find(function(err, caramelos) {
            if(!err) {
                console.log('GET /caramelos')
                res.send(caramelos);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    //GET - Devuelve el caramelo con el id indicado
    findById = function(req, res) {
        Caramelo.findById(req.params.id, function(err, caramelo) {
            if(!err) {
                console.log('GET /caramelo/' + req.params.id);
                res.send(caramelo);
            } else {
                console.log('ERROR: ' + err);
            }
        });
    };

    /*
    //POST - Insertar un nuevo caramelo en la BD
    addCaramelo = function(req, res) {
        console.log('POST');
        console.log(req.body);

        var caramelo = new Caramelo({

            // Primero hay que pensar como se van a mapear las relaciones entre caramelos

            title:    req.body.title,
            year: 	  req.body.year,
            country:  req.body.country,
            poster:   req.body.poster,
            seasons:  req.body.seasons,
            genre:    req.body.genre,
            summary:  req.body.summary
        });

        caramelo.save(function(err) {
            if(!err) {
                console.log('Created');
            } else {
                console.log('ERROR: ' + err);
            }
        });

        res.send(caramelo);
    };

    //PUT - Actualizar un caramelo ya existente
    updateCaramelo = function(req, res) {
        Caramelo.findById(req.params.id, function(err, caramelo) {

            // Primero hay que pensar como se van a mapear las relaciones entre caramelos

            caramelo.title   = req.body.petId;
            caramelo.year    = req.body.year;
            caramelo.country = req.body.country;
            caramelo.poster  = req.body.poster;
            caramelo.seasons = req.body.seasons;
            caramelo.genre   = req.body.genre;
            caramelo.summary = req.body.summary;

            caramelo.save(function(err) {
                if(!err) {
                    console.log('Updated');
                } else {
                    console.log('ERROR: ' + err);
                }
                res.send(caramelo);
            });
        });
    }

    //DELETE - Borrar el caramelo con el id especificado
    deleteCaramelo = function(req, res) {
        Caramelo.findById(req.params.id, function(err, caramelo) {
            caramelo.remove(function(err) {
                if(!err) {
                    console.log('Removed');
                } else {
                    console.log('ERROR: ' + err);
                }
            })
        });
    }

    */

    //Link routes and functions
    app.get('/caramelos', findAllCaramelos);
    app.get('/caramelos/:id', findById);

    /*
    app.post('/caramelos', addCaramelo);
    app.put('/caramelos/:id', updateCaramelo);
    app.delete('/caramelos/:id', deleteCaramelo);
    */
}