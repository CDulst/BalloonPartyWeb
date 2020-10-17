//Get dotenv file
require('dotenv').config();

//Create a boolean that checks if we are on dev or not
const isDevelopment = (process.env.NODE_ENV === 'development');

console.log(isDevelopment);
//Nodejs express framework gebruiken
const express = require('express');
const app = express();

//Server opstellen met SSL certificatte voor webcam gebruik met IP adres
const fs = require('fs');
const options = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt')
};
const server = require('https').Server(options, app); // httpS instead of http
//De port waar naar geluisterd moet worden
const port = process.env.PORT || 52300;

const io = require('socket.io')(server);


let gameClientID = "";
let gameConnected = false;
let phoneClientID = "";
let clients = {}


io.on('connection', function(socket){
console.log(`Connection Made:${socket.id}`);
const obj = {
  id: socket.id
}
clients[socket.id] = {
  socket: socket,
  id: socket.id
}
if (!gameConnected){
gameClient = socket.id;
console.log("Game");
gameConnected = true;
}
else{
phoneClient = socket.id
console.log("Phone");
try {
  io.to(gameClient).emit("phoneConnected",{
    data: "true"
});
}
catch(err) {
  console.log(err);
}
}

socket.on('buttonPressed', data => {
io.to(gameClient).emit('buttonPressed',{
  data: data
});
})

socket.on('audioRead', data => {
io.to(gameClient).emit('audioRead',{
  data:data
})
})

//Socket disconnect.
socket.on('disconnect' , () => {
  console.log('client disconnected');
  delete clients[socket.id];
  gameConnected = false;
})


});




app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});
