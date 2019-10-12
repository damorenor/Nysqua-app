const JWT = require('jsonwebtoken');
const User = require('../models/users');

module.exports = {

    googleOAuth: async (req, res, next) => {
        // Generate token
        //console.log('got here');

        const token = await req.user.newAuthToken()
        console.log("______________", req.user)
        console.log("t--------------------- ", token)
        res.status(201).send({ user: req.user, token: token })
    },
    facebookOAuth: async (req, res, next) => {
        // Generate token
        console.log('got here');

        const token = await req.user.newAuthToken()
        console.log("______________", req.user)
        console.log("t--------------------- ", token)
        res.status(201).send({ user: req.user, token: token })
    }
}