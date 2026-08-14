{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface UsersProps {
  users: { name: string; color: string; }[];
}

const useUsers = () => {
  const { send, receive } = useWebSocket();
  const [users, setUsers] = useState<UsersProps>({ users: [] });

  useEffect(() => {
    send({ type: 'users', users: users.users });
  }, [users.users]);

  useEffect(() => {
    const updatedUsers = receive({ type: 'users' });
    setUsers({ users: updatedUsers });
  }, []);

  return users;
}

export default useUsers;