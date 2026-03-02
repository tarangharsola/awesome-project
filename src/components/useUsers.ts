{"import { useState, useEffect } from 'react';

interface UserState {
  id: string;
  name: string;
  color: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<UserState[]>([]);

  useEffect(() => {
    const handleUserJoin = (user: UserState) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (userId: string) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };
    // Simulate real-time updates from WebSocket
    const intervalId = setInterval(() => {
      handleUserJoin({
        id: 'user1',
        name: 'John Doe',
        color: 'red',
      });
      handleUserLeave('user2');
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return users;
}

export default useUsers;