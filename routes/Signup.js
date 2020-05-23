var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  res.send('HAHA you did it!');
});

router.post('/', function (req, res, next) {
    models.newuser.findOrCreate({
      where: { 
        username: req.body.username, 
        email: req.body.email 
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/' + result.user_id);  //<---This needs to redirect to an account page of some sort
      } else {
        res.status(400);
        res.send('User already exists');
      }
    })
  });

module.exports = router;