{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useUsers = () => {
  const [users, setUsers] = useState({
    'user1': {
      name: 'User 1',
      color: '#ff0000',
    },
    'user2': {
      name: 'User 2',
      color: '#00ff00',
    },
  });

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('users', (users) => {
      setUsers(users);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return users;
};

export default useUsers;