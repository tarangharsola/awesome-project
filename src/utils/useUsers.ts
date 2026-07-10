{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return users;
}

export default useUsers;