var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var exchangeSchema = new Schema({
    idUserOne: {
        type: String,
        required: true
    },
    idUSerTwo: {
        type: String,
        required: true
    },
    idGarmentOne: {
        type: String,
        required: true
    },
    idGarmentTwo: {
        type: String,
        required: true
    },
    proposalDate: {
        type: Date,
        required: true
    },
    acceptanceDate: {
        type: Date,
        required: true
    },
    matchDate: {
        type: Date,
        required: true
    },
    state: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
});