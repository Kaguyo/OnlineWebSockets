const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

let connectedPlayers = [];
let countConnectedPlayers = connectedPlayers.length;


io.on('connection', (socket) => {
  console.log('New user connected:', socket.id, "\n");
  connectedPlayers.push(socket.id);
  countConnectedPlayers = connectedPlayers.length;
  console.log("Current Users:", connectedPlayers);
  console.log("Connected Players:", countConnectedPlayers);
  io.emit('globalCountPlayers', countConnectedPlayers);

  socket.on('disconnect', () => {
    console.log("User "+ socket.id +" disconnected.")
    connectedPlayers = connectedPlayers.filter(sId => sId !== socket.id);
    countConnectedPlayers = connectedPlayers.length;
    console.log("Current Users: ", connectedPlayers);
    console.log("Connected Players:", countConnectedPlayers);
    io.emit('globalCountPlayers', countConnectedPlayers);
  });
});



const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
