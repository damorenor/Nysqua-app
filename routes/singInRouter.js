var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/users');

var singInRouter = express.Router();

singInRouter.use(bodyParser.json());
singInRouter.route('/')
    .get((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        Users.find({ username: req.body.userId, password: req.body.pass })
            .then((user) => {
                console.log('User Find', user);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
        /*
        res.end('Welcome user: ' +  +
            ' your password is: ' + req.body.pass);
*/
    }).post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not support');
    }).put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not support');
    }).delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not support');
    });

module.exports = singInRouter;