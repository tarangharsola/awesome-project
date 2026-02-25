{"import { useState, useEffect } from 'react';

interface AwarenessProps {
  users: { username: string; color: string; }[];
}

const useAwareness = ({ users }) => {
  const [activeUsers, setActiveUsers] = useState(users);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveUsers(users);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [users]);

  return activeUsers;
}

export default useAwareness;