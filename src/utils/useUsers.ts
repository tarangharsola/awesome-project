{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useUsers = () => {
  const { users } = useWebSocket();
  return { users };
};

export default useUsers;