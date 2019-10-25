const express = require('express');
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');

const Garment = require('../models/garments');
const { ObjectID } = require('mongodb');


router.post('/add', authenticate, async (req, res) => {
    req.user

    garment = new Garment({
        idUser: req.user._id,
        category: req.body.category,
        subcategory: req.body.subcategory,
        title: req.body.title,
        description: req.body.description,
        size: req.body.size,
        userperiod: req.body.userperiod,
        color: req.body.color,
        state: req.body.state,
        images: req.body.images,
        tags: req.body.tags
        //postDate: req.boy.postDate
    });
    try {
        await garment.save()
        res.send(garment);
    } catch (error) {
        res.status(400).send()
    }
});

router.get('/preferences', authenticate, async (req, res) => {
    req.user
    var categorys = req.body.categorys
    var subcategorys = req.body.subcategorys
    console.log(categorys)
    console.log(subcategorys)
    var r = await Garment.find({ $and: [{ category: { categorys } }, { subcategory: { subcategorys } }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
});

router.delete('/delete', authenticate, async (req, res) => {
    var garmentId = req.body.garmentID
    var r = await Garment.deleteOne({ _id: garmentId }, function (error) {
        if (error) return handleError(error)
        return true
    })
    console.log(r)
    try {
        res.send(r)
    } catch (error) {
        res.status(400).send()
    }
});

router.get('/search', authenticate, async (req, res) => {
    req.user
    var categorys = req.body.categorys
    var subcategorys = req.body.subcategorys
    var size = req.body.size
    var color = req.body.color
    var r = await Garment.find({ $and: [{ category: categorys }, { subcategory: subcategorys }, { color: color }, { size: size }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }

})




module.exports = router