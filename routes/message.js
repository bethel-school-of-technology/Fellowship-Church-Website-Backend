var models = require('../models');
var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.send('You successfully created a POST route!');
  });
  
app.post('/', function(req, res) {
    res.send('You successfully created a POST route!');
  });
  
  //router.put('/', function(req, res) {
  //  res.send('You successfully created a PUT route!');
  //});
  