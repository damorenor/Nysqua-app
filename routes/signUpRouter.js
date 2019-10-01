var express = require('express');
var bodyParser = require('body-parser');
var cors = require('./cors');
var mongoose = require('mongoose');

var Users = require('../models/users');

var singUpRouter = express.Router();

singUpRouter.use(bodyParser.json());
singUpRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        res.end('Welcome, add new User');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
    }).post(cors.cors, (req, res, next) => {
        Users.create(req.body)
            .then((user) => {
                console.log('User Created', user);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    }).put(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not support');
    }).delete(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not support');
    });

module.exports = singUpRouter;