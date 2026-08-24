import { useEffect } from 'react';
import { getAwareness } from '../utils/useConflictResolver';
import type { WebsocketProvider } from 'y-websocket';

/**
 * Hook to manage user awareness (cursor position, name, color) via Yjs awareness.
 * Ensures that metadata is broadcast on join and cleaned up on unmount.
 */
export const useAwareness = (
  provider: WebsocketProvider,
  user: { id: string; name: string; color: string }
) => {
  useEffect(() => {
    const awareness = getAwareness(provider);
    // Set local state for this client.
    awareness.setLocalStateField('user', user);

    // Cleanup on component unmount.
    return () => {
      awareness.setLocalStateField('user', null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, user.id, user.name, user.color]);
};
