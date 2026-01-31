{"import { useState, useEffect } from 'react';

interface Props {
  users: { name: string; color: string }[];
}

const useUsers = ({ users }: Props) => {
  const [userList, setUserList] = useState(users);
  useEffect(() => {
    setUserList(users);
  }, [users]);
  return userList;
};

export default useUsers;