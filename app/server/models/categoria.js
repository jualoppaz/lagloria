var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categoriaSchema = new Schema({
    nombre:     { type: String, enum :
        ['Duro', 'Blando', 'Con palo', 'Grageado']
    },
    tipo:       ObjectId
});


module.exports = mongoose.model('Categoria', categoriaSchema);