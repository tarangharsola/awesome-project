{"import { useState, useEffect } from 'react';
const useWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursor') {
        setCursor(data.cursor);
      } else if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'code') {
        setCode(data.code);
      }
    };
    socket.onopen = () => setConnected(true);
    socket.onclose = () => setConnected(false);
    return () => socket.close();
  }, []);

  const send = (data) => {
    socket.send(JSON.stringify(data));
  };

  const receive = (handleCursorUpdate, handleUserUpdate) => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (handleCursorUpdate) {
        handleCursorUpdate({ cursor: data.cursor });
      }
      if (handleUserUpdate) {
        handleUserUpdate({ users: data.users });
      }
    };
  };

  return { connected, cursor, users, code, send, receive };
};

export default useWebSocket;