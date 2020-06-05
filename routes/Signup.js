// var express = require('express');
// var router = express.Router();
// var models = require('../models');

// router.get('/', function(req, res, next) {
//   res.send('HAHA you did it!');
// });

// router.post('/', function (req, res, next) {
//   models.users
//   .findOrCreate({
//   where: {
//     Username: req.body.username,
//     Email: req.body.email,
//   },
//   defaults: {
//     FirstName: req.body.firstName,
//     LastName: req.body.lastName,
//     Password: req.body.password,
//   }
//   }).spread(function (result, created) {
//   if (created) {
//   console.log('User Successfully Created!');
//   } else {
//   res.send('User Name Does Not Meet The Requirements!');
//   }
//   });
// })

// module.exports = router;


// .authService.hashPassword(req.body.password)