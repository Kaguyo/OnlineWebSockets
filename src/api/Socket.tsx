import { io, Socket } from 'socket.io-client';
import PlayerUser from './user/PlayerUser';
import Players from './online/Players';

interface Player {
  id: string;
  socketId: string;
  nickname: string;
  level: number;
  status: string;
}

interface Invite {
  requester?: PlayerUser;
  target?: Players;
}

interface ServerToClientEvents {
  svr_distribute_connections: (connectedPlayers: Player[]) => void;
  svr_active_players_count: (playerCount: number) => void;
  svr_player_user: (playerUser: PlayerUser) => void;
  svr_new_room: () => void;
  svr_room_invite: () => void;
}

interface ClientToServerEvents {
  send_public_connection: (PlayerUser: {}) => void;
  send_friend_request: (object: JSON) => void;
  respond_friend_request: (choice: boolean) => void;
  send_message: (object: JSON) => void;
  invite_to_room: (request: Invite) => void;
  respond_room_invite: (choice: boolean) => void;
  create_room: (hostId: string) => void;
  disconnect_from_room: (object: JSON) => void;
}



const url = 'https://maddison-unupbraided-abram.ngrok-free.dev'
let user: PlayerUser;
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(url, {
    transports: ['websocket'],
    autoConnect: false
  });  

  socket.on('svr_distribute_connections', (connectedPlayers) => {
    Players.connectedPlayers = connectedPlayers;
  });

  socket.on('connect', () => {
    user = new PlayerUser(socket.id!);
    user.status = "Online";
    socket.emit('send_public_connection', user.SendPublicInfo());
  });

  socket.on('svr_room_invite', () => {
    window.alert("You have a new room invite!");
  });

  socket.on('disconnect', () => {
    //
  });




