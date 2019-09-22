var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var imageSchema = new Schema({
    path: {
        type: String,
        require: true
    },
    tags: {
        type: [String],
        required: true
    }

});