import { useEffect } from 'react';
import { useCollaborationCore } from './useCollaborationCore';
import { usePresence } from './usePresence';
import { CollaborationMessage } from '../types/collaborationMessage';

/**
 * UI‑focused part of the collaboration hook.
 * Handles presence updates and exposes UI‑relevant state such as the list of users.
 */
export const useCollaborationUI = (docId: string, username: string) => {
  const { sendMessage, connectionStatus, onMessage } = useCollaborationCore(docId, username);
  const { users, setUsers } = usePresence();

  // Subscribe to incoming collaboration messages that affect UI (e.g., presence)
  useEffect(() => {
    const handleMessage = (msg: CollaborationMessage) => {
      switch (msg.type) {
        case 'presence':
          setUsers(msg.users);
          break;
        default:
          // Other message types are handled by core logic
          break;
      }
    };

    const unsubscribe = onMessage(handleMessage);
    return () => unsubscribe();
  }, [onMessage, setUsers]);

  return { sendMessage, connectionStatus, users };
};
