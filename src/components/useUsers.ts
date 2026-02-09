{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const { users, dispatch } = useWebSocket();

  useEffect(() => {
    dispatch({ type: 'JOIN' });
  }, []);

  return { users };
};

export default useUsers;