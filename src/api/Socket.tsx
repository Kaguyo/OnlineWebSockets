import { io, Socket } from 'socket.io-client';
import UserData from './user/UserData';
import Players from './online/Players';

interface Player {
  id: string;
  socketId: string;
  nickname: string;
  level: number;
  status: string;
}

interface ServerToClientEvents {
  srv_distribute_connections: (connectedPlayers: Player[]) => void;
  svr_active_players_count: (playerCount: number) => void;
}

interface ClientToServerEvents {
  send_public_connection: (userData: {}) => void;
  send_friend_request: (object: JSON) => void;
  respond_friend_request: (choice: boolean) => void;
  send_message: (object: JSON) => void;
  invite_to_room: (object: JSON) => void;
  respond_room_invite: (choice: boolean) => void;
  create_room: (object: JSON) => void;
  disconnect_from_room: (object: JSON) => void;
}

const url = 'https://maddison-unupbraided-abram.ngrok-free.dev'
let user: UserData;
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(url, {
    transports: ['websocket'],
    autoConnect: false
  });  

  socket.on('srv_distribute_connections', (connectedPlayers) => {
    Players.connectedPlayers = connectedPlayers;
    Players.connectedPlayers.forEach((p) => console.log(p))
  });

  socket.on('connect', () => {
    user = new UserData();
    user.status = "Online";
    socket.emit('send_public_connection', user.SendPublicInfo());
  });

  socket.on('disconnect', () => {
    //
  });




