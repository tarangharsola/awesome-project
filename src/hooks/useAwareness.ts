import { useEffect, useRef } from 'react';
import useWebSocket from './useWebSocket';
import type { WebSocketMessage } from '../types/websocketMessage';

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function useAwareness(roomId: string, username: string, color: string) {
  const userId = useRef(generateId());
  const { status, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`);

  const broadcast = (type: 'join'|'leave'|'cursor', payload: any) => {
    const msg: WebSocketMessage = {
      type,
      roomId,
      userId: userId.current,
      username,
      color,
      payload,
    };
    sendMessage(msg);
  };

  useEffect(() => {
    if (status === 'open') {
      broadcast('join', {});
    }
  }, [status]);

  useEffect(() => {
    return () => {
      broadcast('leave', {});
    };
  }, []);

  return { broadcast };
}
