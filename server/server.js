var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var morgan = require('morgan');

//controllers


//Express request pipeline
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// set the right port
var DEBUG = true;
var port = process.env.PORT || 12810;
if (DEBUG){
	port = 7777;
}
app.listen(port, function () {
    console.log("Started listening on port", port);
});