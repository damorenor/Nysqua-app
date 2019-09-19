var mongoose = require('mongoose')
var Schema = mongoose.Schema; 
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

var db = mongoose.connection; 
db.on('eror', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
	console.log("Connected!");
});

// Exchange's schema 
var exchangeSchema = new Schema({ 
	idUserOne: 	String, 	
	idUSerTwo: 	String, 
	idGarmentOne: 	String,
	idGarmentTwo: 	String, 
	proposalDate: 	Date, 
	acceptanceDate: Date, 
	matchDate: 	Date,
	state:		Number
});

// Magazine's Schema 
var magazineSchema = new mongoose.Schema({ 
	idUser:		String, 
	tags: 		[String],
	garments: 	[String]
});

// User's Schema 
var userSchema = new mongoose.Schema({ 
	email: 		String, 
	password: 	String,
	unsername: 	String, 
	birthdate: 	Date, 
	genre: 		String, 
	biography:	String, 
	rating:		{ type:Number, min: 1, max: 10}, 
	profilePicture:	String,
	exchangeList:	[{type: Schema.ObjectId, ref: 'Exchange'}] , // assuming model named as exchange 
	garmentList: 	[{type: Schema.ObjectId, ref: 'Garment'}], 
	magazineList:	[{type: Schema.ObjectId, ref: 'Magazine'}],
	preferences:	[String]
});

// Garmenrt's Schema 
var garmentSchema = new mongoose.Schema({ 
	idUser: String,
	section: {type: String, uppercase: true, maxlenght: 1}, 
	type: {type: String}, 
	size: {type:String, uppercase: true, maxlength : 2},  
	useperiod: String, 
	color: String, 
	state: {type: Number, min : 1, max: 10},
	images: [String], 
	postDate: Date
});

//Image's Schema 
var imageSchema = new mongoose.Schema({ 
	path: String, 
	tags: [String]
	
});
