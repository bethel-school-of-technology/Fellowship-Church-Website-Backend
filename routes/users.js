var express = require('express');
var router = express.Router();
var models = require('../models'); 
var authService = require('../services/auth'); 


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    models.users.findOne({
      where: {
        Username: req.body.username
      }
    }).then(user => {
      if (!user) {
        console.log('User not found')
        return res.status(401).json({
          message: "Login Failed"
        });
      } else {
        let passwordMatch = authService.comparePasswords(req.body.password, user.Password);
        if (passwordMatch) {
          let token = authService.signUser(user);
          res.cookie('jwt', token);
          res.send('Login successful');
          res.redirect('/home');
        } else {
          console.log('Wrong password');
          res.send('Wrong password');
        }
      }
    });
  });

  router.post('/signup', function (req, res, next) {
    models.users
    .findOrCreate({
    where: {
      Username: req.body.username,
      Email: req.body.email,
    },
    defaults: {
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Password: authService.hashPassword(req.body.password),
    }
    }).spread(function (result, created) {
    if (created) {
    res.json('User Successfully Created!');

    } else {
    res.send('User Name Does Not Meet The Requirements!');
    }
    });
  })

router.get('/profile', function (req, res, next) {
    let token = req.cookies.jwt;
    if (token) {
      authService.verifyUser(token)
        .then(user => {
          if (user) {
            res.send(JSON.stringify(user));
          } else {
            res.status(401);
            res.send('Invalid authentication token');
          }
        });
    } else {
      res.status(401);
      res.send('Must be logged in');
    }
  });

router.get('/logout', function(req, res, next){
    res.cookie('jwt', "", { expires: new Date(0) });
    res.sendFile('Logged out');
});

module.exports = router;