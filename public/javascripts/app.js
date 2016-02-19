var TIMEOUT_IN_MILISECONDS = 60000

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

function disconnectFromSocket(){
  console.log('disconnect!')
  socket.emit('disconnect')
}

setTimeout(disconnectFromSocket, TIMEOUT_IN_MILISECONDS)