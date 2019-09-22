var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    birthDate: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    biography: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    preferences: {
        type: String
    }
}, { timestamps: true }
);

var Users = mongoose.model('User', userSchema);

module.exports = Users;