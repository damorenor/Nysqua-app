const express = require('express');
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');
const Exchange = require('../models/exchanges');
const { ObjectID } = require('mongodb');

const router = new express.Router();

router.post('/create', authenticate, async (req, res) => {
    var idUserOne = req.body.otherUser
    var idUserTwo = req.user._id
    var garmentInterest = req.body.garmentInterest
    var ownGarment = req.body.ownGarment
    var proposalDate = req.body.proposalDate
    console.log(idUserOne)
    exchange = new Exchange({
        idUserOne: idUserOne,
        idUserTwo: idUserTwo,
        idGarmentOne: garmentInterest,
        idGarmentTwo: ownGarment,
        proposalDate: new Date(proposalDate),
        state: false
    })

    try {
        await exchange.save()
        req.user.addExchange(exchange)
        res.send(exchange);
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

//para obtener todas las propuestas que le han hecho a un usuario
router.post('/proposals', authenticate, async (req, res) => {
    userID = req.body.userID
    console.log(userID)
    try {
        var r = await Exchange.find({ $and: [{ idUserOne: userID }, { state: false }] })
        console.log(r)

    } catch (error) {
        console.log(error)
    }
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }

})

//para obtener todos los intercambios que ha propuesto el usuario
router.post('/offers', authenticate, async (req, res) => {
    userID = req.body.userID
    console.log(userID)
    try {
        var r = await Exchange.find({ $and: [{ idUserTwo: userID }, { state: false }] })
        console.log(r)

    } catch (error) {
        console.log(error)
    }
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
})

//para obtener todos los intercambios activos del usuario

router.post('/active', authenticate, async (req, res) => {
    userID = req.body.userID
    console.log(userID)
    try {
        var r = await Exchange.find({ $and: [{ idUserTwo: userID }, { state: true }] })
        console.log(r)

    } catch (error) {
        console.log(error)
    }
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router
