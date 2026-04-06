{"import { useState, useEffect } from 'react';

interface AwarenessProps {
  children: React.ReactNode;
}

const useAwareness = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const handleUserJoin = (user: any) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    };

    const handleUserLeave = (user: any) => {
      setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
    };

    return () => {
      // Clean up event listeners
    };
  }, []);

  return {
    users,
    handleUserJoin,
    handleUserLeave
  };
}

export default useAwareness;