var TIMEOUT_IN_SECONDS = 60

var socket = io.connect('/index');
console.log('appjs wired')
socket.on('tweet', function(tweet){
  console.log('tweet')
  $('#tweets').append($('<div>').text(tweet.text));
});

socket.on('wired', function (str) {
  console.log(str, '!')
})

$('#start').click(function () {
  console.log('start button')
  socket.emit('startTracking')
})

function disconnectFromSocket(){
  console.log('disconnecting')
  socket.emit('disconnect')
  socket.disconnect()
}

setTimeout(disconnectFromSocket, TIMEOUT_IN_SECONDS*1000)