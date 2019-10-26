const authenticate = require("../middleware/auth");
const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const { ObjectID } = require('mongodb');

router.post('/', async (req, res) => {
    //find an existing user
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        method: 'local',
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthDate: req.body.birthdate,
        gender: req.body.gender,
        rating: 5,
        totalExchanges: 0,
        exchangesCanceled: 0,
        exchangesCanceledByOthers: 0,
        profilePhoto: "undefined"
    });
    try {
        const token = await user.newAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.checkValidCredentials(req.body.email, req.body.password)
        const token = await user.newAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send()
    }
})

//router.post('/oauth/google', passport.authenticate('googleToken', { session: false }));

router.patch('/me', authenticate, async (req, res) => {
    const updates = Object.keys(req.body)

    if(!req.body.currentPassword){
        return res.status(401).send( {error: 'Please send Current Password'});
    }

    const isMatch = await req.user.checkPassword(req.body.currentPassword) 

    if (!isMatch) {
        return res.status(401).send( {error: 'Current Password is not valid'});
    }

    const allowedUpdates = ["usesrname", "password", "currentPassword","age", "birthDate", "gender", "biography", "rating", "categories", "subCategories", "profilePhoto"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    const _id = req.user._id

    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid request' })
    }

    if (!ObjectID.isValid(_id)) {
        return res.status(404).send();
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }

})

router.get('/me', authenticate, async (req, res) => {
    res.send(req.user)
})



router.delete('/me', authenticate, async (req, res) => {
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send();
    }

    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/logout', authenticate, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/ogoutall', authenticate, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router


