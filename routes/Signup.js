var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  res.send('HAHA you did it!');
});

router.post('/', function (req, res, next) {
  models.users
  .findOrCreate({
  where: {
    username: req.body.username,
    email: req.body.email,
  },
  defaults: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password.authService.hashPassword(req.body.password),
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


