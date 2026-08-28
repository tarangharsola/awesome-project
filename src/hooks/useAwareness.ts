import { useEffect } from 'react';
import { WebsocketProvider } from 'y-websocket';
import { Awareness } from 'y-protocols/awareness';

/**
 * Hook that synchronises local user awareness (name, colour, cursor) across
 * all participants in a Yjs‑based collaborative session.
 *
 * @param provider   Yjs WebSocket provider for the current room.
 * @param user       Local user metadata.
 * @param onChange   Optional callback invoked when the set of remote users changes.
 */
export const useAwareness = (
  provider: WebsocketProvider,
  user: { id: string; name: string; color: string },
  onChange?: (users: Array<{ id: number; name: string; color: string }>) => void
) => {
  useEffect(() => {
    const awareness: Awareness = provider.awareness;

    // Initialise local state – this will be broadcast to peers automatically
    awareness.setLocalStateField('user', user);

    const handleChange = ({ added, updated, removed }: { added: number[]; updated: number[]; removed: number[] }) => {
      if (!onChange) return;
      const states = awareness.getStates();
      const activeUsers: Array<{ id: number; name: string; color: string }> = [];
      states.forEach((state, clientId) => {
        if (state.user) {
          activeUsers.push({ id: clientId, name: state.user.name, color: state.user.color });
        }
      });
      onChange(activeUsers);
    };

    awareness.on('change', handleChange);

    return () => {
      awareness.off('change', handleChange);
      // Clear local state on unmount so peers know we left
      awareness.setLocalStateField('user', null);
    };
  }, [provider, user, onChange]);
};