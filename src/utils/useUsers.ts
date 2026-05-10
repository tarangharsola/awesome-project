{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [ws, setWs] = useWebSocket();
  useEffect(() => {
    // Handle user updates
  }, [users, ws]);
  return [users, setUsers];
};

export default useUsers;