{"import { useState, useEffect } from 'react';

interface Props {
  users: { id: string; name: string; color: string; }[];
}

const useUsers = ({ users }: Props) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    const handleUserJoin = (user: { id: string; name: string; color: string; }) => {
      setActiveUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (userId: string) => {
      setActiveUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };
    return () => {}
  }, []);

  return activeUsers;
}

export default useUsers;