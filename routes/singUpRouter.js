var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Users = require('../models/users');

var singUpRouter = express.Router();

singUpRouter.use(bodyParser.json());
singUpRouter.route('/')
    .get((req, res, next) => {
        res.end('Welcome, add new User');
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');
    }).post((req, res, next) => {
        Users.create(req.body)
            .then((user) => {
                console.log('User Created', user);
                res.statusCode = 200;
                res.setHeader('Content-type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
        /*res.statusCode = 403;
        res.end('Adding user with\nMail: ' + req.body.email +
            '\nPassword: ' + req.body.password + '\\nUsername: ' +
            req.body.username + '\nBirthDate: ' + req.body.birthdate +
            '\nGender: ' + req.body.gender +
            '\nbiography: ' + req.body.biography
        );*/
    }).put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not support');
    }).delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not support');
    });

module.exports = singUpRouter;