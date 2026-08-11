{"import { useState, useEffect } from 'react';

interface UserState {
  name: string;
  color: string;
}

const useUsers = () => {
  const [users, setUsers] = useState<UserState[]>([]);
  useEffect(() => {
    const handleUserJoin = (user: UserState) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };
    const handleUserLeave = (user: UserState) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u.name !== user.name));
    };
    return () => {
      // cleanup
    };
  }, []);
  return users;
};

export default useUsers;