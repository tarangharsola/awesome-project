{"import { useState, useEffect } from 'react';

interface UsersProps {
  users: { [name: string]: { color: string } }
}

const useUsers = (props: UsersProps) => {
  const [users, setUsers] = useState({} as { [name: string]: { color: string } });
  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);
  return users;
};

export default useUsers;