import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import type { PresenceMessage, UserPresence } from '../types/presence';
import { v4 as uuidv4 } from 'uuid';

/**
 * Hook that manages user presence (join/leave, cursor updates) for a collaborative session.
 * It guarantees that the local user is announced on (re)connection and that remote
 * presence updates are merged into the supplied `onPresenceUpdate` callback.
 */
export function usePresence(
  sessionId: string,
  username: string,
  color: string,
  onPresenceUpdate: (users: Record<string, UserPresence>) => void
) {
  const clientId = useRef(uuidv4());
  const usersRef = useRef<Record<string, UserPresence>>({});

  const handleMessage = (msg: PresenceMessage) => {
    if (msg.type === 'presence') {
      const { userId, username, color, cursor } = msg.payload;
      usersRef.current[userId] = { userId, username, color, cursor };
      onPresenceUpdate({ ...usersRef.current });
    } else if (msg.type === 'presence-leave') {
      const { userId } = msg.payload;
      delete usersRef.current[userId];
      onPresenceUpdate({ ...usersRef.current });
    }
  };

  const { status, send } = useWebSocket(`wss://example.com/collab/${sessionId}`, handleMessage);

  // Announce self when connection becomes active
  useEffect(() => {
    if (status === 'connected') {
      const joinMsg: PresenceMessage = {
        type: 'presence',
        payload: {
          userId: clientId.current,
          username,
          color,
          cursor: null,
        },
      };
      send(joinMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, username, color]);

  // Broadcast cursor updates
  const broadcastCursor = (cursor: { line: number; ch: number } | null) => {
    if (status !== 'connected') return;
    const cursorMsg: PresenceMessage = {
      type: 'presence',
      payload: {
        userId: clientId.current,
        username,
        color,
        cursor,
      },
    };
    send(cursorMsg);
  };

  // Clean up on unload – inform others that we left
  useEffect(() => {
    const leave = () => {
      if (status === 'connected') {
        const leaveMsg: PresenceMessage = {
          type: 'presence-leave',
          payload: { userId: clientId.current },
        };
        send(leaveMsg);
      }
    };
    window.addEventListener('beforeunload', leave);
    return () => {
      leave();
      window.removeEventListener('beforeunload', leave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return { broadcastCursor, connectionStatus: status } as const;
}
