
var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
const models = require('../models');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Password1!',
//   database: 'sakila'
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   console.log('Yay! You are connected to the database!');
// })


const express = require('express');
const router = express.Router();
const mysql = require('mysql');



router.get('/person/:id', function(req, res, next) {
  //get object that matches the id
  let person = user.people.find(peep => {
    return peep.id === parseInt(req.params.id);
  });
  res.render('index', { person });
  console.log(req.url);
});
//basic routes
router.get('/', function(req, res) {
  res.send('You successfully created a POST route!');
});

// router.post('/', function (req, res, next) {
//   models.newuser.create(req.body)
//     .then(newUserAccount => {
//       res.setHeader('Content-Type', 'application/json');
//       res.send(JSON.stringify(newUserAccount));
//     })
//     .catch(err => {
//       res.status(400);
//       res.send(err.message);
//     });
// });

router.put('/', function(req, res) {
  res.send('You successfully created a PUT route!');
});

router.delete('/', function(req, res) {
  res.send('You successfully created a DELETE route!');
});

module.exports = router;
