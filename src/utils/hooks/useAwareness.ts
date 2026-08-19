import { useEffect, useState } from 'react';
import { WebsocketProvider } from 'y-websocket';

/**
 * Hook that extracts the list of active users from a Yjs awareness instance.
 * Returns an array of user objects containing clientId, name, and color.
 */
export const useAwareness = (provider: WebsocketProvider | null) => {
  const [users, setUsers] = useState<Array<{ clientId: number; name: string; color: string }>>([]);

  useEffect(() => {
    if (!provider) return;
    const awareness = provider.awareness;
    const update = () => {
      const states = Array.from(awareness.getStates().entries())
        .filter(([, state]) => state.user)
        .map(([clientId, state]) => ({
          clientId,
          name: state.user.name,
          color: state.user.color,
        }));
      setUsers(states);
    };
    awareness.on('change', update);
    update();
    return () => {
      awareness.off('change', update);
    };
  }, [provider]);

  return users;
};