var socket = io.connect('/index');
console.log('appjs wired')
socket.on('tweet', function(tweet){
  console.log('tweet')
  $('#tweets').append($('<div>').text(tweet));
});