import { useEffect, useRef, useState } from 'react';
import { WebSocketClient } from '../utils/websocketClient';
import { CollaborationMessage, PresenceMessage } from '../types/collaborationMessage';
import { applyRemoteChanges, generateLocalChange } from './useCollaborationHelpers';

export function useCollaborationCore(roomId: string, userId: string, username: string, color: string) {
  const wsRef = useRef<WebSocketClient | null>(null);
  const [connected, setConnected] = useState(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { position: number; color: string; name: string }>>({});

  useEffect(() => {
    const ws = new WebSocketClient(`wss://example.com/rooms/${roomId}`);
    wsRef.current = ws;

    ws.onOpen(() => setConnected(true));
    ws.onClose(() => setConnected(false));

    ws.onMessage((msg: CollaborationMessage) => {
      if (msg.type === 'presence') {
        setRemoteCursors(prev => ({
          ...prev,
          [msg.userId]: { position: msg.position, color: msg.color, name: msg.username }
        }));
      } else {
        applyRemoteChanges(msg);
      }
    });

    ws.send({
      type: 'join',
      userId,
      username,
      color
    } as PresenceMessage);

    return () => {
      ws.send({ type: 'leave', userId } as PresenceMessage);
      ws.close();
    };
  }, [roomId, userId, username, color]);

  const sendLocalChange = (content: string, cursorPos: number) => {
    const change = generateLocalChange(content, cursorPos, userId);
    wsRef.current?.send(change);
  };

  return { connected, remoteCursors, sendLocalChange };
}
