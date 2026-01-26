{"import { useState, useEffect } from 'react';

interface useUsersProps {
  users: any[];
}

const useUsers = ({ users }: useUsersProps) => {
  const [usersList, setUsersList] = useState(users);
  useEffect(() => {
    setUsersList(users);
  }, [users]);
  return usersList;
};

export default useUsers;