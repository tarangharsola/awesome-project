{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('usersUpdate', (data) => {
      setUsers(data);
    });
  }, []);

  return { users };
};

export default useUsers;