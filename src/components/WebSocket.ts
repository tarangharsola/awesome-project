{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const WebSocket = () => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('connect', () => {
      setConnected(true);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    const socket = io('ws://localhost:3001');
    socket.emit('message', message);
  };

  return {
    messages,
    connected,
    sendMessage
  };
};

export default WebSocket;