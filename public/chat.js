// Make connection
var socket = io.connect('http://localhost:4000');

// Query DOM

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// Vreme za chat

var time = new Date();

var vreme = time.toLocaleTimeString().toLowerCase();

//
//Emmit events

btn.addEventListener('click', function(){


// socket.emit('ime poruke, kako zovemo, nebitno', objekat gde saljem poruku i ime coveka koji salje)

    socket.emit('chat', {

      message: message.value,
      handle: handle.value

    })

});

message.addEventListener('keypress', function(){

  socket.emit('typing', handle.value);

});

//Listen for events

socket.on('chat', function(data){
  feedback.innerHTML = " ";
  output.innerHTML += '<p> <strong>' + data.handle + '<span> [' + vreme  +'] </span>' + ': </strong>' + data.message + '</p>';
});


socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
