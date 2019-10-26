var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

//var Users = require('/user');

var garmentSchema = new Schema({
    idUser: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    subcategory: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    size: {
        type: String,
        require: true
    },
    useperiod: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    images: {
        type: [String],
        require: true
    },
    tags: {
        type: [String]
    },
    postDate: {
        type: Date
    }
});

var Garments = mongoose.model('Garment', garmentSchema);

module.exports = Garments;