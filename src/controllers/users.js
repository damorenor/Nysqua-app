const JWT = require('jsonwebtoken');
const User = require('../models/users');


// dictonary with subcategories 
const categories = {
    "Hombre": ["Camisas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas"],
    "Mujer": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
    "Ninos": ["Camisas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas"],
    "ninas": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"], 
    "Bebes": ["Camisas", "Blusas", "Camisetas", "Pantalones", "Sweaters y Cardigans", "Bermudas", "Chaquetas y Blazers", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas ", "Shorts", "Vestidos y Faldas"]
  };
  
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