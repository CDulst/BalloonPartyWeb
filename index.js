//Get dotenv file
require('dotenv').config();

//Create a boolean that checks if we are on dev or not
const isDevelopment = (process.env.NODE_ENV === 'development');

console.log(isDevelopment);
//Nodejs express framework gebruiken
const express = require('express');
const app = express();
options = {}

const server = require('http').Server(options, app); // httpS instead of http
//De port waar naar geluisterd moet worden
const port = process.env.PORT || 52300;

const io = require('socket.io')(server);


let gameClient = "";
let gameConnected = false;
let phoneClient = "";


io.on('connection', function(socket){
console.log(`Connection Made:${socket.id}`);
const obj = {
  id: socket.id
}
if (!gameConnected){
gameClient = obj;
console.log(gameClient);
gameConnected = true;
}
else{
phoneClient = obj;
}
socket.on('checkID',id => {
  if (gameClient == "" || gameClient.id !== id){
  console.log(phoneClient.id);
  console.log(socket.id);
  }
});
})

app.use(express.static('public'));

server.listen(port, () => {
 console.log(`App listening on port ${port}!`);
});
