var express = require('express');
var socket = require('socket.io');


var app = express();

var port = process.env.PORT || 4000;

var server = app.listen(port, function(){
  console.log("Listening to requests on port: " + port);
});

// Static files

app.use(express.static('public'));

// Socket setup

var io = socket(server);

io.on('connection', function(socket){

            console.log('Made socket connection', socket.id);

          //data je objkeat iz frontenda, a chat je ime za koenkciju

            socket.on('chat', function(data){

              //Ovde pisemo SOCKETS U mnozini jer zelimo da svi koji su konnektovani vide poruke
              io.sockets.emit('chat', data);
            });



            socket.on('typing', function(data){
                //Braodkastovace svima da NEKO IS TYPING sem onome ko pise jer nema potrebe
                socket.broadcast.emit('typing', data);

            });


});
