import { useEffect } from 'react';
import { CollaborationAction } from '../types/collaboration';
import { UserPresence } from '../types/presence';

export function useCollaborationUI(
  dispatch: React.Dispatch<CollaborationAction>,
  presence: UserPresence[]
) {
  useEffect(() => {
    const handle = setInterval(() => {
      dispatch({ type: 'BROADCAST_PRESENCE' });
    }, 2000);
    return () => clearInterval(handle);
  }, [dispatch]);

  // Additional UI side‑effects can be added here
}
