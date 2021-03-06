var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var Twitter = require('twitter');
var fs = require('fs');
var searchJSONPath = './assets/searchDefaults.json'
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

var TWITTER_SEARCH_TERMS = JSON.parse(fs.readFileSync(searchJSONPath,'utf8')).searchTerms.join(',')


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

//I am not sure how to move this out of the app level and into our routes
//this is where 
var indexio = io.of('/index');
indexio.on('connection', function (socket) {
  socket.emit('wired', 'wired')
  var searchString = TWITTER_SEARCH_TERMS
  socket.on('startTracking', function () {
    
    var startTime = Math.round(new Date().getTime()/1000.0)

    client.stream('statuses/filter', {track: searchString}, function(stream) {

      console.log('stream initiate',searchString)

      socket.on('addCategory', function (category) {
        stream.destroy()
        console.log('add category')
        searchString += ',' + category
        console.log(searchString)
      });
      
      socket.on('deleteCategory', function (category) {
        stream.destroy()
        console.log('deleteCategory')
        searchString = searchString.split(',').remove(category).join(',')
        console.log('new searchstring ', searchString)
      })
      
      stream.on('data', function(tweet) {
        socket.emit('tweet', tweet)
        console.log(tweet.text);
        //timer
        var timer = 300
        if (startTime + timer < Math.round(new Date().getTime()/1000.0)) {
          console.log('times up')
          stream.destroy()
        }
      });
      stream.on('error', function(error) {
        throw error;
      });
    });
    socket.on('disconnect', function () {
      console.log('disconnect hit')
      socket.emit('wired', 'this should never appear on the client')
    });
  })
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
