const mongoose = require("mongoose");

mongoose.Promise = Promise;
var url = 'mongodb://localhost:27017/Nysqua';
var connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected to Nysqua DataBase');
}, (err) => {
    console.log(err);
});
/*
const URI =
    "mongodb+srv://user:user123@cluster0-o3qkt.mongodb.net/nysqua?retryWrites=true&w=majority";
mongoose.connect(URI, {
    useNewUrlParser: true
})
    .then(db => console.log("db connected"))
    .catch(err => console.log(err));
*/