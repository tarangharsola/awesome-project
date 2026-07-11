{"import { useState, useEffect } from 'react';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };
    const socket = useWebSocket();
    socket.on('userJoin', handleUserJoin);
    socket.on('userLeave', handleUserLeave);
    return () => {
      socket.off('userJoin', handleUserJoin);
      socket.off('userLeave', handleUserLeave);
    };
  }, []);
  return users;
};

export default useUsers;