{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

function useUsers() {
  const [users, setUsers] = useState([]);
  const ws = useWebSocket('ws://localhost:8080');

  useEffect(() => {
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return users;
}

export default useUsers;