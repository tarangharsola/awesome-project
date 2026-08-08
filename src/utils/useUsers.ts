{"import { useState, useEffect } from 'react';

interface UsersState {
  users: { userId: string; username: string; color: string }[];
}

const useUsers = () => {
  const [usersState, setUsersState] = useState<UsersState>({ users: [] });
  useEffect(() => {
    // Update users from WebSocket events
  }, []);
  return usersState;
};

export default useUsers;