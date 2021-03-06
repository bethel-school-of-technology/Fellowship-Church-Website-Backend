var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var cors = require('cors');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');

var usersRouter = require('./routes/user');
var usersRouter = require('./routes/users');
// var signupRouter = require('./routes/signup');


var usersRouter = require('./routes/users');
var ioRouter = require('./routes/chat.index')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json())
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/user', usersRouter);
// app.use('/Signup', signupRouter);

app.use('/users', usersRouter);
app.use(function(req, res, next){
  res.io = io;
  next();
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

models.sequelize.sync().then(function () {
  console.log("DB Sync'd up")
});

module.exports = app;
