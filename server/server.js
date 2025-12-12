import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { Player } from "./player.js";
import { Room } from "./room.js";

class ServerToClientEvents {
  static svr_active_players_count="svr_active_players_count";
  static svr_distribute_connections="svr_distribute_connections";
  static svr_player_user="svr_player_user";
  static svr_new_room="svr_new_room";
  static svr_room_invite="svr_room_invite";
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
      }

    });
    
    io.emit(ServerToClientEvents.svr_distribute_connections, connectedPlayers);
    io.emit(ServerToClientEvents.svr_active_players_count, connectedPlayers.length)
  });

  socket.on(ClientToServerEvents.create_room, (hostId) => {
    console.log("Creating room for host ID:", hostId);
    Room.rooms.push(new Room(hostId));
    socket.emit(ServerToClientEvents.svr_new_room);
  });

  socket.on(ClientToServerEvents.invite_to_room, (json) => {
    console.log("Invite to room data received:", json);
    connectedPlayers.forEach((player) => {
      if (player.socketId == json.target.socketId){
        io.to(player.socketId).emit(ServerToClientEvents.svr_room_invite);
      }
    });
  });

});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});