{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    socket.on('update-users', (users) => {
      setUsers(users);
    });

    socket.on('update-cursor-positions', (cursorPositions) => {
      setCursorPositions(cursorPositions);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (message) => {
    socket.emit('message', message);
  };

  return {
    socket,
    users,
    cursorPositions,
    handleSendMessage
  };
};
export default useWebSocket;