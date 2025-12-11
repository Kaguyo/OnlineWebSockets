const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

class Player {
  id;
  socketId;
  nickname;
  level;
  status;
  constructor(id, socketId, nickname, level, status){
    this.id = id;
    this.socketId = socketId;
    this.nickname = nickname;
    this.level = level;
    this.status = status;
  }
}

class ServerToClientEvents {
  static svr_active_players_count="svr_active_players_count";
  static svr_distribute_connections="svr_distribute_connections";
  static svr_player_user="svr_player_user";
}

class ClientToServerEvents {
  static send_public_connection="send_public_connection";
  static send_friend_request="send_friend_request";
  static respond_friend_request="respond_friend_request";
  static send_message="send_message";
  static invite_to_room="invite_to_room";
  static respond_room_invite="respond_room_invite";
  static create_room="create_room";
  static disconnect_from_room="disconnect_from_room";
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

let connectedPlayers = [];

io.on('connection', (socket) => {
  socket.on(ClientToServerEvents.send_public_connection, (player) => {
    const p = new Player(player.id, socket.id, player.nickname, player.level, player.status);
    connectedPlayers.push(p);

    io.emit(ServerToClientEvents.svr_player_user, p)
    io.emit(ServerToClientEvents.svr_distribute_connections, connectedPlayers);
    io.emit(ServerToClientEvents.svr_active_players_count, connectedPlayers.length);
  });

  socket.on('disconnect', () => {
    connectedPlayers.forEach((player, index) => {
      if (player.socketId == socket.id){
        connectedPlayers.splice(index, 1);
        console.log("removing player:", player)
      }
      
    });
    
    io.emit(ServerToClientEvents.srv_distribute_connections, connectedPlayers);
    io.emit(ServerToClientEvents.svr_active_players_count, connectedPlayers.length)
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});