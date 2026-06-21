{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    webSocket.on('userJoin', handleUserJoin);

    return () => {
      webSocket.off('userJoin', handleUserJoin);
    };
  }, [webSocket]);

  useEffect(() => {
    const handleUserLeave = (user) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    };

    webSocket.on('userLeave', handleUserLeave);

    return () => {
      webSocket.off('userLeave', handleUserLeave);
    };
  }, [webSocket]);

  return users;
};

export default useAwareness;