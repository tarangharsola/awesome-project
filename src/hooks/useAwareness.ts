import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { v4 as uuidv4 } from 'uuid';

interface AwarenessOptions {
  username: string;
  color: string;
  wsUrl: string;
  onUsersUpdate: (users: Record<string, { name: string; color: string }>) => void;
}

/**
 * Hook that manages user presence (awareness) across a collaborative session.
 * It broadcasts the local user's identity on connection and updates the
 * consumer with the current list of connected users.
 */
export function useAwareness({ username, color, wsUrl, onUsersUpdate }: AwarenessOptions) {
  const userId = useRef<string>(uuidv4());
  const users = useRef<Record<string, { name: string; color: string }>>({});

  const { sendMessage, status } = useWebSocket({
    url: wsUrl,
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'presence':
          // data.payload = { userId, name, color }
          users.current[data.payload.userId] = { name: data.payload.name, color: data.payload.color };
          onUsersUpdate({ ...users.current });
          break;
        case 'presence-leave':
          delete users.current[data.payload.userId];
          onUsersUpdate({ ...users.current });
          break;
        case 'sync-response':
          // Server may send the current user list on sync request
          if (Array.isArray(data.payload.users)) {
            users.current = {};
            data.payload.users.forEach((u: any) => {
              users.current[u.userId] = { name: u.name, color: u.color };
            });
            onUsersUpdate({ ...users.current });
          }
          break;
        default:
          break;
      }
    },
    onOpen: () => {
      // Announce presence when the socket is ready
      sendMessage({
        type: 'presence',
        payload: { userId: userId.current, name: username, color },
      });
    },
    onClose: () => {
      // Inform others that we are leaving (best‑effort, may not reach if network drops)
      sendMessage({
        type: 'presence-leave',
        payload: { userId: userId.current },
      });
    },
  });

  // Re‑announce presence after reconnection
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({
        type: 'presence',
        payload: { userId: userId.current, name: username, color },
      });
    }
  }, [status, sendMessage, username, color]);

  return { userId: userId.current, users: users.current };
}
