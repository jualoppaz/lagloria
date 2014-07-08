var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var modeloSchema = new Schema({
    nombre:     { type: String, enum :
        ['Surtido', 'Chocolate', 'Chocolate blanco', 'Chocolate menta', 'Regaliz', 'Nata', 'Mint',
         'Frutas', 'Redondo', 'Oval', 'Anis', 'Expres', 'Colours', 'Ice mint', 'Verde mint', 'Colorines',
         'Gajitos']
    }
});


module.exports = mongoose.model('Modelo', modeloSchema);