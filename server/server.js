// server.js
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

let count = 0;

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  // send current count when a new client connects
  socket.emit('count', count);

  socket.on('increment', () => {
    count += 1;
    // broadcast new count to all connected clients
    io.emit('count', count);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
