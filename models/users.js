var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    },
    exchangeList: {
        type: [{ type: Schema.ObjectId, ref: 'Exchange' }]
    },
    garmentList: {
        type: [{ type: Schema.ObjectId, ref: 'Garment' }]
    },
    magazineList: {
        type: [{ type: Schema.ObjectId, ref: 'Magazine' }]
    }
}, { timestamps: true }
);

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;