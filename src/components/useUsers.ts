import { useState, useEffect } from 'react';

interface useUsersProps {
  webSocket: any;
}

const useUsers = ({ webSocket }: useUsersProps) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserJoin = (user: any) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (userId: any) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    };

    webSocket.on('userJoin', handleUserJoin);
    webSocket.on('userLeave', handleUserLeave);
    return () => {
      webSocket.off('userJoin', handleUserJoin);
      webSocket.off('userLeave', handleUserLeave);
    };
  }, [webSocket]);

  return users;
};

export default useUsers;