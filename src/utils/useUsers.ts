{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Props {
  onUserJoin: (user: string) => void;
  onUserLeave: (user: string) => void;
}

const useUsers = ({ onUserJoin, onUserLeave }: Props) => {
  const { users, addUser, removeUser } = useWebSocket();
  const [localUsers, setLocalUsers] = useState(users);

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  useEffect(() => {
    onUserJoin(users[0].name);
  }, [users]);

  useEffect(() => {
    onUserLeave(users[0].name);
  }, [users]);

  return { users, addUser, removeUser, localUsers, setLocalUsers };
};

export default useUsers;