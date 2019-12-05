var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var exchangeSchema = new Schema({
    idUserOne: {
        type: String,
        required: true
    },
    idUserTwo: {
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
        type: Date
    },
    matchDate: {
        type: Date
    },
    state: {
        type: Boolean
    },
    completeUserOne: {
        type: Boolean
    },
    completeUserTwo: {
        type: Boolean
    }
});

var Exchanges = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchanges;