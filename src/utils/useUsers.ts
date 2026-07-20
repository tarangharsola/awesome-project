{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function useUsers() {
  const ws = useWebSocket('ws://localhost:8080');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
  }, []);

  return users;
}

export default useUsers;