{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const users = useUsers();
  const webSocket = useWebSocket();

  useEffect(() => {
    const handleUserJoin = (user) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, [user.id]: user }));
    };

    webSocket.on('userJoin', handleUserJoin);
    return () => webSocket.off('userJoin', handleUserJoin);
  }, [webSocket]);

  useEffect(() => {
    const handleUserLeave = (userId) => {
      setAwareness((prevAwareness) => {
        delete prevAwareness[userId];
        return prevAwareness;
      });
    };

    webSocket.on('userLeave', handleUserLeave);
    return () => webSocket.off('userLeave', handleUserLeave);
  }, [webSocket]);

  return awareness;
};

export default useAwareness;