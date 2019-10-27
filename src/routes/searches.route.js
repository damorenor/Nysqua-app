const express = require('express');
const router = new express.Router();
const path = require("path");
const multer = require("multer");
const authenticate = require("../middleware/auth");
var fs = require('fs');

const Garment = require('../models/garments');
const User = require('../models/users');
const { ObjectID } = require('mongodb');


//get all the garments that meet with categories, subcategories
router.get('/preferences', authenticate, async (req, res) => {
    req.user
    var categories = req.body.categories
    var subcategories = req.body.subcategories
    console.log(categories)
    console.log(subcategories)
    var r = await Garment.find({ $and: [{ category: { categories } }, { subcategory: { subcategories } }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }
});



//get all the garments that meet with categories, subcategories, size, color
router.get('/search', authenticate, async (req, res) => {
    req.user
    if (req.body.categories !=  null){
      var categories = req.body.categories
      var r = await Garment.find({ $and: [{ category: categories }] });
      console.log(r);
    }else if (req.body.subcategories != null) {
      var subcategories = req.body.subcategories
      var r = await Garment.find({ $and: [{subcategory: subcategories }] });
      console.log(r);
    }else if (req.body.color != null) {
      var subcategories = req.body.color
      var r = await Garment.find({ $and: [{color: color}] });
      console.log(r);
    }else if (req.body.size != null) {
      var subcategories = req.body.size
      var r = await Garment.find({ $and: [{size: size}] });
      console.log(r);
    }
    var r = await Garment.find({ [{ category: categories }, { subcategory: subcategories }, { color: color }, { size: size }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }

});


router.get('/search', authenticate, async (req, res) => {
    req.user
    if (req.body.email !=  null){
      var email = req.body.email
      var r = await Garment.find({ $and: [{ email: categories }] });
      console.log(r);
    }else if (req.body.username != null) {
      var subcategories = req.body.username
      var r = await Garment.find({ $and: [{username: username }] });
      console.log(r);
    }else if (req.body.rating != null) {
      var subcategories = req.body.rating
      var r = await Garment.find({ $and: [{rating: rating}] });
      console.log(r);
    }
    var r = await Garment.find({ [{ email: email }, {username: username }, { rating: rating }] });
    console.log(r);
    try {
        res.send(r);
    } catch (error) {
        res.status(400).send()
    }

});



module.exports = router
