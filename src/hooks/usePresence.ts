import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateUserPresence, removeUser } from '../store/usersReducer';
import { useWebSocket } from './useWebSocket';

/**
 * Hook that synchronises user presence across the collaborative session.
 * It ensures that the local user is announced on (re)connection and that
 * remote presence updates are reflected in the Redux store.
 */
export function usePresence(roomId: string, username: string, color: string) {
  const dispatch = useDispatch();
  const { status, sendChange } = useWebSocket(roomId, username, color);

  // When the connection becomes active we already broadcast presence via useWebSocket.
  // Here we only need to react to store updates for UI components.
  const users = useSelector((state: RootState) => state.users);

  // Cleanup on unmount – inform others that we are leaving.
  useEffect(() => {
    return () => {
      if (status === 'connected') {
        const leaveMsg = {
          type: 'PRESENCE_LEAVE',
          payload: { username, roomId },
        } as any; // cast to any to avoid circular type import
        // Direct WebSocket send without re‑using sendChange (which is for editor ops)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).websocket?.send(JSON.stringify(leaveMsg));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, username, roomId]);

  return { users, connectionStatus: status, sendChange };
}
