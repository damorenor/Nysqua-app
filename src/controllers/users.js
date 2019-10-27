const JWT = require('jsonwebtoken');
const User = require('../models/users');




module.exports = {

    googleOAuth: async (req, res, next) => {

        const token = await req.user.newAuthToken()
        res.status(201).send({ user: req.user, token: token })
    },
    facebookOAuth: async (req, res, next) => {

        const token = await req.user.newAuthToken()
        res.status(201).send({ user: req.user, token: token })
    }
}