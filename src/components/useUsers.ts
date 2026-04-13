{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('users', (data) => setUsers(data));
  }, []);

  return { users, addUser: (user) => send('users', user) };
};

export default useUsers;