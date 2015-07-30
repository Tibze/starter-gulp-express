'use strict';

// load the things we need
var express = require('express');
var app = express(); 

var config = require('../config.json');

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
app.set('views', __dirname + '/views');

// index page 
app.get('/', function(req, res) {
	res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
	res.render('pages/about');
});

app.listen(config.port);
console.log('express start');