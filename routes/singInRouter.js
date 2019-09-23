var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('./cors')
var Users = require('../models/users');

var singInRouter = express.Router();

singInRouter.use(bodyParser.json());
singInRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); console.log("fffff" +    req); })
    .get(cors.cors  , (req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        console.log(res); 
        Users.find({ username: req.body.userId, password: req.body.pass })
            .then((user) => {
                console.log('User Find', user);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(user);
                console.log(user);  
            }, (err) => next(err))
            .catch((err) => next(err));
        /*
        res.end('Welcome user: ' +  +
            ' your password is: ' + req.body.pass);
*/
    }).post(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not support');
    }).put(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not support');
    }).delete(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not support');
    });

module.exports = singInRouter;