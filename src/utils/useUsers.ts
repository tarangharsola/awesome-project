{"import { useState, useEffect } from 'react';

interface Props {
  users: { id: string; name: string; color: string }[];
}

const useUsers = ({ users }: Props) => {
  const [usersState, setUsersState] = useState(users);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newUsers = receiveUsers();
      setUsersState(newUsers);
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleUserJoin = (user: { id: string; name: string; color: string }) => {
    setUsersState((prevUsers) => [...prevUsers, user]);
  }

  const handleUserLeave = (userId: string) => {
    setUsersState((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  }

  return { users: usersState, handleUserJoin, handleUserLeave };
}

export default useUsers;