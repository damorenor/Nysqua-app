var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var magazineSchema = new Schema({
    idUser: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    garments: {
        type: [String],
        require: true
    }
});

