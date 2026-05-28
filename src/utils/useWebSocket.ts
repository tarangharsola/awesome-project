{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
  const [socket, setSocket] = useState(null);
  const [cursors, setCursors] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io();
    setSocket(socket);
    return () => socket.disconnect();
  }, []);

  const send = (data) => {
    socket.emit('message', data);
  };

  useEffect(() => {
    socket.on('message', (data) => {
      switch (data.type) {
        case 'cursor':
          setCursors((prevCursors) => ({ ...prevCursors, [data.id]: { x: data.x, y: data.y, color: data.color } }));
          break;
        case 'selection':
          setCursors((prevCursors) => ({ ...prevCursors, [data.id]: { x: data.from, y: data.to } }));
          break;
        case 'insert':
          setCursors((prevCursors) => ({ ...prevCursors, [data.id]: { x: data.x, y: data.y } }));
          break;
        case 'users':
          setUsers(data.users);
          break;
      }
    });
  }, [socket]);

  return { cursors, users, send };
};

export default useWebSocket;