var socket = io.connect('/index');
console.log('appjs wired')
socket.on('tweet', function(tweet){
  console.log('tweet')
  $('#tweets').append($('<div>').text(tweet));
});

socket.on('wired', function (str) {
  console.log(str, '!')
})

$('#start').click(function () {
  console.log('start button')
  socket.emit('startTracking', '')
})