import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  globalCountPlayers: (newCount: number) => void;
}

interface ClientToServerEvents {
  increment: () => void;
}

const url = 'https://maddison-unupbraided-abram.ngrok-free.dev'
export let playerCount = 0;

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(url, {
    transports: ['websocket'],
    autoConnect: false
  });  


  socket.on('globalCountPlayers', (x) => {
    playerCount = x;
    window.alert("CONNECTED PLAYERS: "+playerCount)
  });


  socket.on('connect', () => {
    window.alert("CONEXÃO ESTABELECIDA")
  });




