{"import { useState, useEffect } from 'react';

interface Props {
  userId: string;
  users: any[];
}

const useAwareness = ({ userId, users }) => {
  const [awareness, setAwareness] = useState(false);

  useEffect(() => {
    const handleUserJoin = () => {
      setAwareness(true);
    };
    const handleUserLeave = () => {
      setAwareness(false);
    };
    users.forEach((user) => {
      if (user.id === userId) {
        handleUserLeave();
      } else {
        handleUserJoin();
      }
    });
    return () => {
      // Clean up
    };
  }, [userId, users]);

  return awareness;
}

export default useAwareness;