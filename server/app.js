const express = require('express');
const morgan = require('morgan');
const db = require('./database');
const cookieParser = require('cookie-parser');
const awsCtrl = require('./awsCtrl');


const createError = require('http-errors');
const path = require('path');
const cors = require('cors');

const passport = require('./passport/index');
 

const routes = require('./routes/api');
const remove = require('./routes/remove_data'); 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const PORT = process.env.PORT || 9000;
const app = express();

const log = console.log;

require('dotenv').config(); // Configure dotenv to load in the .

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', routes);
app.use('/remove', remove); 
app.use('/authentication', usersRouter);
app.use('/sign_s3', awsCtrl);
app.use('/', indexRouter);

app.use(passport.initialize());

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

app.listen(PORT, () => {
  //log(`Server is listening on PORT ${PORT}`); 
});


module.exports = app;
