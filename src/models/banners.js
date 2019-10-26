var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var bannerSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tittle: {
        type: String,
        require: true
    },
});
var Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;