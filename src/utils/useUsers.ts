{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:3001');
    setSocket(socket);

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