{"import { useState, useEffect } from 'react';

interface UsersProps {
  users: any;
}

const useUsers = (users: UsersProps) => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    const handleUserJoin = () => {
      setUsersList((prevUsers) => [...prevUsers, users.user]);
    };
    users.addEventListener('join', handleUserJoin);
    return () => {
      users.removeEventListener('join', handleUserJoin);
    };
  }, [users]);
  useEffect(() => {
    const handleUserLeave = () => {
      setUsersList((prevUsers) => prevUsers.filter((user) => user.id !== users.user.id));
    };
    users.addEventListener('leave', handleUserLeave);
    return () => {
      users.removeEventListener('leave', handleUserLeave);
    };
  }, [users]);
  return { usersList };
};

export default useUsers;