import { useEffect, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useCursor } from './useCursor';

/**
 * Hook that synchronizes user presence (join/leave) and cursor positions
 * across all participants. It relies on the WebSocket hook for transport.
 */
export function useAwareness(
  url: string,
  userInfo: { username: string; color: string }
) {
  const { users, addUser, removeUser, updateUserCursor } = useUsers();
  const { setLocalCursor } = useCursor();

  const handleMessage = useCallback(
    (msg: { type: string; payload?: any }) => {
      switch (msg.type) {
        case 'join':
          if (msg.payload && msg.payload.username !== userInfo.username) {
            addUser(msg.payload);
          }
          break;
        case 'leave':
          if (msg.payload && msg.payload.username) {
            removeUser(msg.payload.username);
          }
          break;
        case 'cursor_update':
          if (msg.payload && msg.payload.username !== userInfo.username) {
            updateUserCursor(msg.payload.username, msg.payload.position);
          }
          break;
        case 'sync_state':
          // Full state sync after reconnection
          if (msg.payload) {
            const { users: remoteUsers, document } = msg.payload;
            remoteUsers.forEach((u: any) => addUser(u));
            // Document sync is handled elsewhere (editor hook)
          }
          break;
        default:
          break;
      }
    },
    [addUser, removeUser, updateUserCursor, userInfo.username]
  );

  const { sendMessage } = useWebSocket(url, userInfo, handleMessage);

  // Broadcast local cursor changes
  const broadcastCursor = useCallback(
    (position: any) => {
      sendMessage({ type: 'cursor_update', payload: { username: userInfo.username, position } });
    },
    [sendMessage, userInfo.username]
  );

  // Hook into local cursor changes
  useEffect(() => {
    const unsubscribe = setLocalCursor(broadcastCursor);
    return () => unsubscribe();
  }, [broadcastCursor, setLocalCursor]);

  // Notify others when we disconnect (cleanup)
  useEffect(() => {
    return () => {
      sendMessage({ type: 'leave', payload: { username: userInfo.username } });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { users };
}
