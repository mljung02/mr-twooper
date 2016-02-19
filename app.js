var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var Twitter = require('twitter');

require('dotenv').load();

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var io = socketio();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


//I am not sure how to move this out of the app level and into our routes
//this is where 
var indexio = io.of('/index');
indexio.on('connection', function (socket) {
  socket.emit('wired', 'wired')
  socket.on('startTracking', function (searchString) {
    //searchString for later
    var startTime = Math.round(new Date().getTime()/1000.0)

    searchString = 'Minnesota'
    client.stream('statuses/filter', {track: searchString}, function(stream) {

      stream.on('data', function(tweet) {
        indexio.emit('tweet', tweet.text)
        console.log(tweet.text);
        //timer
        var timer = 20
        if (startTime + timer < Math.round(new Date().getTime()/1000.0)) {
          console.log('times up')
          stream.destroy()
        }
      });
      stream.on('error', function(error) {
        throw error;
      });
    });
  })
  socket.on('disconnect', function () {
    console.log('disconnect hit')
    socket.disconnect()
    socket.emit('wired', 'this should never appear on the client')
  });
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
