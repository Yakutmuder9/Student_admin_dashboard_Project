require("dotenv").config({path: './.env'})
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

mongoose.set('strictQuery', true);
const url = config.mongoUrl;

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


connect.then(() => console.log("DB connected Successfully"),
  err => console.log(err)
);


var app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Connect Routes
app.use('/api', indexRouter);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/User"));
app.use("/api/course", require("./routes/Course")); 
app.use("/api/book", require("./routes/Book")); 
app.use("/api/discussion", require("./routes/Post")); 

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
 
module.exports = app;
