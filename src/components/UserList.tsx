{"import React, { useState, useEffect } from 'react';
import { WebSocket } from './WebSocket';

const UserList = () => {
  const { socket, reconnecting } = WebSocket();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserUpdate = (user) => {
      setUsers((prevUsers) => {
        return [...prevUsers, user];
      });
    };

    socket.on('userUpdate', handleUserUpdate);

    return () => {
      socket.off('userUpdate', handleUserUpdate);
    };
  }, []);

  return {
    users,
    reconnecting,
  };
};
export default UserList;