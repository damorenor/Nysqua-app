var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


var UserSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook']
    },
    methodID: {
        type: String

    },
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
        type: String
    },
    birthDate: {
        type: Date,
        //require: true
    },
    gender: {
        type: String,
        // require: true
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
        type: [String]
    },
    categories: {
        type: [String]
    },
    exchangeList: {
        type: [{ type: Schema.ObjectId, ref: 'Exchange' }]
    },
    garmentList: {
        type: [{ type: Schema.ObjectId, ref: 'Garment' }]
    },
    magazineList: {
        type: [{ type: Schema.ObjectId, ref: 'Magazine' }]
    },

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    isAdmin: Boolean
}, { timestamps: true }
);



UserSchema.statics.checkValidCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login 2')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login 2')
    }

    return user
}

// add preferences 
UserSchema.methods.addPreferences= async function (req) {
    const user = this
    user.biography = req.body.bio
    user.preferences = 
    await user.save()
    return token
}

//custom method to generate authToken 
UserSchema.methods.newAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'thisismynewblog', { expiresIn: "7 days" })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

//hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.pre('remove', async function (next) {
    const user = this
    await Post.deleteMany({ author: user._id })
    next()
})


var User = mongoose.model('User', UserSchema);


module.exports = User;