const express = require('express');
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');
const Exchange = require('../models/exchanges');
const User = require('../models/users');
const { ObjectID } = require('mongodb');

const router = new express.Router();

router.post('/create', authenticate, async (req, res) => {
    var idUserOne = req.body.otherUser
    var idUserTwo = req.user._id
    var garmentInterest = req.body.garmentInterest
    var ownGarment = req.body.ownGarment
    var proposalDate = req.body.proposalDate
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
        //req.user.addExchange(exchange)
        res.send(exchange);
    } catch (error) {
        console.log(error)
        res.status(400).send()
    }
})

//para aceptar un intercambio
router.post('/accept', authenticate, async (req, res) => {
    var user = req.user
    var exchangeID = req.body.exchangeID
    try {
        var exchange = await Exchange.findOne({ _id: { $eq: exchangeID } })
        var otherUser = await User.findOne({ _id: { $eq: exchange.idUserTwo } })
    } catch (error) {   
        console.log(error)
    }
    if (user._id == exchange.idUserOne) {
        exchange.state = true
        await exchange.save()
        user.addExchange(exchange)
        otherUser.addExchange(exchange)
        res.status(200).send("successfully accepted")
    } else {
        res.status(400).send("Error en la solicitud")
    }

})

//para rechazar o cancelar un intercambio 

router.post('/cancel', authenticate, async (req, res) => {
    var exchangeID = req.body.exchangeID
    var user = req.user
    var r = false;
    try {
        var exchange = await Exchange.findOne({ _id: { $eq: exchangeID } })
        if (exchange.state) {
            if (user._id == exchange.idUserOne) {
                user.exchangesCanceled += 1
                await user.save()
                try {
                    var otherUser = await User.findOne({ _id: { $eq: exchange.idUserTwo } })
                    otherUser.exchangesCanceledByOthers += 1
                    await otherUser.save()
                } catch (error) {
                    console.log(error)
                }
            } else {
                user.exchangesCanceled += 1
                await user.save()
                try {
                    var otherUser = await User.findOne({ _id: { $eq: exchange.idUserOne } })
                    otherUser.exchangesCanceledByOthers += 1
                    await otherUser.save()
                } catch (error) {
                    console.log(error)
                }
            }
            r = await Exchange.deleteOne({ _id: exchangeID }, function (error) {
                if (error) return handleError(error)
                return true
            })
        } else {
            r = await Exchange.deleteOne({ _id: exchangeID }, function (error) {
                if (error) return handleError(error)
                return true
            })
        }
    } catch (error) {
        console.log(error)
    }
    try {
        res.status(200).send()
    } catch (error) {
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
        var r = await Exchange.find({ $and: [{ $or: [{idUserTwo: userID}, {idUserOne: userID} ] }, { state: true }] })
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
