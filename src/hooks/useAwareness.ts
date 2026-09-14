import { useEffect } from 'react';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useCursor } from './useCursor';
import { AwarenessMessage, WebSocketMessage } from '../types/websocketMessage';

export const useAwareness = (sessionId: string, username: string, color: string) => {
  const { sendMessage, connected } = useWebSocket(`wss://example.com/${sessionId}`, handleMessage);
  const { setUsers } = useUsers();
  const { cursorPosition } = useCursor();

  const broadcastAwareness = () => {
    const msg: AwarenessMessage = {
      type: 'awareness',
      payload: {
        userId: username,
        name: username,
        color,
        cursor: cursorPosition,
      },
    };
    sendMessage({ type: 'awareness', data: msg });
  };

  function handleMessage(message: WebSocketMessage) {
    if (message.type === 'awareness') {
      const payload = (message.data as AwarenessMessage).payload;
      setUsers(prev => ({
        ...prev,
        [payload.userId]: {
          name: payload.name,
          color: payload.color,
          cursor: payload.cursor,
        },
      }));
    }
  }

  // Broadcast when connection is (re)established or cursor moves
  useEffect(() => {
    if (connected) {
      broadcastAwareness();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, cursorPosition]);

  return { broadcastAwareness };
};