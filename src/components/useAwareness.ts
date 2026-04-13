{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [users, setUsers] = useState([]);
  const [presence, setPresence] = useState({});
  const { send, receive } = useWebSocket();

  useEffect(() => {
    receive('users', (data) => setUsers(data));
    receive('presence', (data) => setPresence(data));
  }, []);

  return { users, presence, sendPresence: (user) => send('presence', user) };
};

export default useAwareness;