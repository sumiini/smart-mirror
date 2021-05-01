var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const youtube = require('./youtube');
// var button=require('./button');
var app = express();
app.locals.youid='';

app.io = require('socket.io')();

 
app.io.on('connection', function(socket){
    
  console.log("a user connected");
  socket.broadcast.emit('socket',"hi");
 
 
});
 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// button();
app.use('/', indexRouter);
app.use('/users', usersRouter);

// const videoid=youtube()
//let uid = require('youtube.js');
// let uid = ""
// global.uid = uid

// console.log("aaaa",global.uid)
// app.io.on('connection',function(socket){
//   console.log("Connected !");
//   socket.on('socket', function(data) {
//     socket.emit("socket",{"videoid":global.uid});
//   });
// });

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