{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = (roomId) => {
  const [socket, setSocket] = useState(null);
  const [send, receive] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001', {
      query: {
        roomId,
      },
    });
    setSocket(socket);
    return () => socket.disconnect();
  }, [roomId]);

  useEffect(() => {
    if (socket) {
      send = (message) => socket.emit('message', message);
      receive = (callback) => socket.on('message', callback);
    }
    return () => {
      send = null;
      receive = null;
    };
  }, [socket]);

  return [send, receive];
};

export default useWebSocket;