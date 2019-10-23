const express = require('express');
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');

const Garment = require('../models/garments');
const { ObjectID } = require('mongodb');


router.post('/add', authenticate ,async (req, res) => {
    req.user

    garment = new Garment({
        idUser: req.user._id,
        section: req.body.section,
        type: req.body.type,
        size: req.body.size,
        userperiod: req.body.userperiod,
        color: req.body.color,
        state: req.body.state,
        images: req.body.images,
        tags: req.body.tags
    });
    try {
        await garment.save()
        res.send(garment);
    } catch (error) {
        res.status(400).send()
    }
})



module.exports = router