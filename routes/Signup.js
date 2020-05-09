var express = require('express');
var router = express.Router();
var models = require('../models');


router.post('/Signup', function (req, res, next) {
    models.actor.findOrCreate({
      where: { 
        username: req.body.username, 
        email: req.body.email 
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('/Signup' + result.user_id);  //<---This needs to redirect to an account page of some sort
      } else {
        res.status(400);
        res.send('User already exists');
      }
    })
  });

module.exports = router;