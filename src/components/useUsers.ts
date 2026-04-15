{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const webSocket = useWebSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    webSocket.onUsersUpdate((users) => {
      setUsers(users);
    });
  }, [webSocket]);

  return users;
};

export default useUsers;