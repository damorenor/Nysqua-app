var express = require('express');
var bodyParser = require('body-parser');

var singUpRouter = express.Router();

singUpRouter.use(bodyParser.json());
singUpRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Welcome, add new User');

    }).post((req, res, next) => {
        res.statusCode = 403;
        res.end('Adding user with\nMail: ' + req.body.email +
            '\nPassword: ' + req.body.password + '\\nUsername: ' +
            req.body.username + '\nBirthDate: ' + req.body.birthdate +
            '\nGender: ' + req.body.gender +
            '\nbiography: ' + req.body.biography
        );
    }).put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not support');
    }).delete((req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not support');
    });

module.exports = singUpRouter;