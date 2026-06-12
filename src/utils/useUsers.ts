{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const { ws, connected } = useWebSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (connected) {
      ws.onmessage = (event) => {
        const usersData = JSON.parse(event.data);
        setUsers(usersData);
      };
    }
  }, [connected, ws]);

  return users;
};

export default useUsers;