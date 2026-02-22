{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface WebSocketHookProps {
  onConnect: () => void;
  onDisconnect: () => void;
  onMessage: (message: string) => void;
}

const useWebSocket = ({ onConnect, onDisconnect, onMessage }: WebSocketHookProps) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('ws://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      onConnect();
    });

    newSocket.on('disconnect', () => {
      onDisconnect();
    });

    newSocket.on('message', (message) => {
      onMessage(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { send: (message: string) => socket.emit('message', message), receive: (message: string) => onMessage(message) };
}

export default useWebSocket;