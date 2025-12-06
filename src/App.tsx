// src/App.tsx
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  count: (newCount: number) => void;
}

interface ClientToServerEvents {
  increment: () => void;
}

// Create socket with proper typing
const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io('https://maddison-unupbraided-abram.ngrok-free.dev');

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket.on('count', (newCount: number) => {
      setCount(newCount);
    });

    return () => {
      socket.off('count');
    };
  }, []);

  const handleClick = () => {
    socket.emit('increment');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Shared Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default App;
