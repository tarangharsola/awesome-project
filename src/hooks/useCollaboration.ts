import { useState, useEffect } from 'react';
import { useCollaborationCore } from './useCollaborationCore';
import { CollaborationUser } from '../types/collaboration';

/**
 * High‑level hook used by UI components. It handles user identification and
 * delegates the heavy lifting to `useCollaborationCore`.
 */
export function useCollaboration(roomId: string) {
  const [user, setUser] = useState<CollaborationUser>(() => {
    const name = prompt('Enter your name')?.trim() || 'Anonymous';
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
    return { id, name, color };
  });

  const {
    content,
    status,
    remoteUsers,
    submitLocalChange,
    updateCursor,
    reconnect
  } = useCollaborationCore(roomId, user);

  // Re‑prompt for name if user clears it (edge case)
  useEffect(() => {
    if (!user.name) {
      const newName = prompt('Enter your name')?.trim() || 'Anonymous';
      setUser(prev => ({ ...prev, name: newName }));
    }
  }, [user.name]);

  return {
    user,
    content,
    status,
    remoteUsers,
    submitLocalChange,
    updateCursor,
    reconnect
  };
}
