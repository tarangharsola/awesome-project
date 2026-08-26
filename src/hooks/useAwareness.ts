import { useEffect, useState } from 'react';
import { getProvider } from '../utils/websocketClient';
import type { User } from '../types';

/**
 * Hook that synchronises user awareness (cursor position, name, colour) across all peers.
 * It returns the current list of active users.
 */
export const useAwareness = (localUser: User) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    const awareness = provider.awareness;
    // Publish local user information.
    awareness.setLocalStateField('user', localUser);

    const updateUsers = () => {
      const states = Array.from(awareness.getStates().values())
        .map(state => (state as any).user)
        .filter(Boolean) as User[];
      setUsers(states);
    };

    awareness.on('change', updateUsers);
    // Initialise list immediately.
    updateUsers();

    return () => {
      awareness.off('change', updateUsers);
    };
  }, [localUser]);

  return users;
};
