{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  language: string;
}

const useUsers = (language: string) => {
  const [users, setUsers] = useState([]);
  const { receive } = useWebSocket();

  useEffect(() => {
    receive((data) => {
      setUsers(data.users);
    });
  }, []);

  return users;
}

export default useUsers;