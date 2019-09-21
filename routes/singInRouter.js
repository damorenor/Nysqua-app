var express = require('express');
var bodyParser = require('body-parser');

var singInRouter = express.Router();

singInRouter.use(bodyParser.json());
singInRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Welcome user: ' + req.body.userId +
            ' your password is: ' + req.body.pass);

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