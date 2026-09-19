import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { WebSocketMessage, MessageType } from '../types/websocketMessage';

export function useCRDT(roomId: string, initialContent: string) {
  const { connected, lastMessage, sendMessage } = useWebSocket<string>({
    url: `${process.env.REACT_APP_WS_URL}?room=${roomId}`
  });

  const [content, setContent] = useState(initialContent);

  // Apply remote edits
  useEffect(() => {
    if (!lastMessage) return;
    const { type, payload } = lastMessage as WebSocketMessage<string>;
    if (type === MessageType.EDIT && typeof payload === 'string') {
      setContent(payload);
    }
  }, [lastMessage]);

  const applyLocalEdit = useCallback(
    (newContent: string) => {
      setContent(newContent);
      if (connected) {
        sendMessage({
          type: MessageType.EDIT,
          payload: newContent,
          timestamp: Date.now()
        });
      }
    },
    [connected, sendMessage]
  );

  return { content, applyLocalEdit, connected };
}
