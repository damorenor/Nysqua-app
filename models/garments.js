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
    section: {
        type: String, uppercase: true,
        maxlenght: 1,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    size: {
        type: String,
        uppercase: true,
        maxlength: 2,
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
        type: Number,
        min: 1,
        max: 10,
        require: true
    },
    images: {
        type: [String],
        require: true
    },
    postDate: {
        type: Date,
        require: true
    }
});
var Garments = mongoose.model('Garment', garmentSchema);

module.exports = Garments;