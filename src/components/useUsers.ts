{"import { useState, useEffect } from 'react';
import { useUsers } from './useUsers';

interface Props {
  users: any[];
}

const useUsers = ({ users }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const handleUserJoin = () => {
      setUserList(users);
    };
    return () => {
      // Clean up
    };
  }, [users]);

  return userList;
}

export default useUsers;