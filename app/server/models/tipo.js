var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tipoSchema = new Schema({
    nombre:     { type: String, enum :
        ['Toffee', 'Masticable', 'Crystal', 'Ponny', 'Especial', 'Peladillas blancas', 'Peladillas de colores',
         'Anises', 'Bolitas de anis blancas', 'Bolitas de anis de colores', 'Mani', 'Glorypop', 'Colorful', 'Monster']
    },
    modelo:     ObjectId
});


module.exports = mongoose.model('Tipo', tipoSchema);