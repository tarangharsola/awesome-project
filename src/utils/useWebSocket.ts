{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function useWebSocket() {
  const [connection, setConnection] = useState(null);
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const socket = io();
    setConnection(socket);
    socket.on('users', (users) => setUsers(users));
    socket.on('cursor', (cursor) => setCursor(cursor));
    return () => socket.disconnect();
  }, []);

  return { connection, users, cursor };
}

export default useWebSocket;