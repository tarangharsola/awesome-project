{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const { users: currentUsers } = useUsers();
  const { broadcast } = useWebSocket();

  useEffect(() => {
    setUsers(currentUsers);
  }, [currentUsers]);

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    broadcast('user_join', handleUserJoin);
    broadcast('user_leave', handleUserLeave);

    return () => {
      broadcast('user_join', () => {});
      broadcast('user_leave', () => {});
    };
  }, [broadcast]);

  return users;
};

export default useAwareness;