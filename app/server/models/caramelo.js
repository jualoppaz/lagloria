var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var carameloSchema = new Schema({
    description:    { type: String },
    categoria:      ObjectId
});


module.exports = mongoose.model('Caramelo', carameloSchema);