var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  res.send('HAHA you did it!');
});

router.post('/', function (req, res, next) {
  models.newUsers
  .findOrCreate({
  where: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }
  }).spread(function (result, created) {
  if (created) {
  console.log('User Successfully Created!');
  } else {
  res.send('User Name Does Not Meet The Requirements!');
  }
  });
  })

module.exports = router;


// authService.hashPassword(req.body.password)