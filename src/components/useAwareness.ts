{"import React from 'react';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const { users, join, leave } = useWebSocket();

  React.useEffect(() => {
    join();
  }, []);

  return { users, join, leave };
};

export default useAwareness;