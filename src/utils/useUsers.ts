{"import { useState, useEffect } from 'react';
import { WebSocket } from 'ws';

function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  return users;
}

export default useUsers;