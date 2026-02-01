import { useState, useEffect } from 'react';

interface useUsers {
  users: { [key: string]: { name: string; color: string } };
  setUsers: (users: { [key: string]: { name: string; color: string } }) => void;
}

const useUsers = () => {
  const [users, setUsers] = useState<{ [key: string]: { name: string; color: string } }>(
    {}
  );

  useEffect(() => {
    const handleUserJoin = (userId: string, userName: string, userColor: string) => {
      setUsers((prevUsers) => ({ ...prevUsers, [userId]: { name: userName, color: userColor } }));
    };

    return handleUserJoin;
  }, []);

  const setUsers = (users: { [key: string]: { name: string; color: string } }) => {
    setUsers(users);
  };

  return { users, setUsers };
};

export default useUsers;