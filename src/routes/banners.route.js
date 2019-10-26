const express = require('express');
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');

const Banner = require('../models/banners');
const { ObjectID } = require('mongodb');


router.post('/add', async (req, res) => {
    banner = new Banner({
        id: req.body.id,
        img: req.body.img,
        description: req.body.description,
        tittle: req.body.tittle
    })
    try {
        await banner.save()
        res.send(banner);
    } catch (error) {
        res.status(400).send()
    }
});

router.get('/get', async (req, res) => {
    var bannerId = req.body.id
    var r = await Banner.find({ id: bannerId })
    try {
        res.send(r)
    } catch (error) {
        res.status(400).send()
    }
});

router.delete('/delete', async (req, res) => {
    var bannerId = req.body.id
    var r = await Banner.deleteOne({ id: bannerId }, function (error) {
        if (error) return handleError(error)
        return true
    })
    try {
        res.send(r)
    } catch (error) {
        res.status(400).send()
    }
});

module.exports = router