const express = require("express");
const cors = require("cors");
const app = express();
var usersRouter = require('./routes/user.route');
var signInRouter = require('./routes/signInRouter');
var signUpRouter = require('./routes/signUpRouter');
var oauth = require('./routes/oauth');
var assistantRouter = require('./routes/assistant.route');

//settings
var port = process.env.PORT || "3001"
app.set("port", port);

//midleware
app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/authentication', oauth)
app.use('/assistant', assistantRouter)

module.exports = app;