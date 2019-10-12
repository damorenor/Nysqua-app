const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const { ObjectID } = require('mongodb');

// dictonary with subcategories 
var Categories = {
    "Hombre": ["Camisas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas"],
    "Mujer": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
    "Ninos": ["Camisas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas"],
    "Ninas": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"], 
    "Bebes": ["Camisas", "Blusas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas ", "Shorts", "Vestidos y Faldas"]
  };


router.post('/prefAssistant', async (req, res) => {
    //find an existing user
    var user = req.user
    try {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token
        })
        user.addPreferences(req)

    } catch (error) {
        res.status(500).send()
    }
})

router.post('/categories', async (req, res) => {
    //find an existing user
    //var user = req.user
    //try {
    //    user.tokens = user.tokens.filter((token) => {
    //        return token.token !== req.token
     //   })
        var categories_out = [] 

        if (Boolean(req.body.checked1)) {categories_out =  categories_out.concat(Categories["Hombre"] ) }  
        if (Boolean(req.body.checked2)) {categories_out =  categories_out.concat(Categories["Mujer"]) }
        if (Boolean(req.body.checked3)) {categories_out =  categories_out.concat(Categories["Ninos"]) }
        if (Boolean(req.body.checked4)) {categories_out =  categories_out.concat(Categories["Ninas"]) }
        if (Boolean(req.body.checked5)) {categories_out =  categories_out.concat(Categories["Bebes"]) }
        var out = new Array.from(Set(categories_out))
        console.log(out)
        res.status(201).send({ out })



    //} catch (error) {
    //    res.status(500).send()
    //}
})

module.exports = router


