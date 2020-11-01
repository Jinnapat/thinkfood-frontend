// var express = require('express')
// var router = express.Router()
var express = require("express");
var app = express();
var port = process.env.PORT || 5000;
var cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
   origin: 'http://localhost:3000',
 }
app.listen(port, function() {
   console.log('listening on port: 5000');
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var userpath = require('./userpath')
var shoppath = require('./shoppath')
var commonpath = require('./commonpath')
app.use(cors(corsOptions));
app.use('/api/user', userpath)
app.use('/api/shop', shoppath)
app.use('/api/common', commonpath)