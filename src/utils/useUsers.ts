{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const socket = io('ws://localhost:3001');

    socket.on('users', (data) => {
      setUsers(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return users;
};

export default useUsers;