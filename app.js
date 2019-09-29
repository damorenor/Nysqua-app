var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passportManager = require( './config/passport');
var config = require ('./config/db');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.route');
var singInRouter = require('./routes/singInRouter');
var singUpRouter = require('./routes/singUpRouter');

var mongoose = require('mongoose');

var users = require('./models/users');
var garments = require('./models/garments');

mongoose.Promise = Promise;
var url = 'mongodb://localhost:27017/Nysqua';
var connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected to Nysqua DataBase');
}, (err) => {
  console.log(err);
});
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/singIn', singInRouter);
app.use('/singUp', singUpRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(passportManager.initialize());


module.exports = app;
