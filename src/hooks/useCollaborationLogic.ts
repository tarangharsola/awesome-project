import { useRef, useCallback } from 'react';
import { CollaborationMessage } from '../types/collaborationMessage';
import { WebSocketClient } from '../utils/websocketClient';
import { EditorOperation } from '../types/editor';
import { Presence } from '../types/presence';

export function useCollaborationLogic(
  wsUrl: string,
  onDocChange: (ops: EditorOperation[]) => void,
  onCursorUpdate: (userId: string, position: number) => void,
  onPresence: (presence: Presence) => void
) {
  const wsRef = useRef<WebSocketClient | null>(null);

  const initWebSocket = useCallback(() => {
    const client = new WebSocketClient(wsUrl);
    client.onMessage((msg: CollaborationMessage) => handleIncomingMessage(msg));
    client.onClose(() => {
      // simple reconnection strategy
      setTimeout(initWebSocket, 2000);
    });
    wsRef.current = client;
  }, [wsUrl]);

  const handleIncomingMessage = (msg: CollaborationMessage) => {
    switch (msg.type) {
      case 'doc-change':
        onDocChange(msg.payload.ops);
        break;
      case 'cursor-update':
        onCursorUpdate(msg.payload.userId, msg.payload.position);
        break;
      case 'presence':
        onPresence(msg.payload);
        break;
      default:
        // unknown message type
        break;
    }
  };

  const sendDocChange = useCallback((ops: EditorOperation[], version: number) => {
    const message: CollaborationMessage = {
      type: 'doc-change',
      payload: { ops, version },
    };
    wsRef.current?.send(message);
  }, []);

  const sendCursorUpdate = useCallback((userId: string, position: number) => {
    const message: CollaborationMessage = {
      type: 'cursor-update',
      payload: { userId, position },
    };
    wsRef.current?.send(message);
  }, []);

  const sendPresence = useCallback((presence: Presence) => {
    const message: CollaborationMessage = {
      type: 'presence',
      payload: presence,
    };
    wsRef.current?.send(message);
  }, []);

  return {
    initWebSocket,
    sendDocChange,
    sendCursorUpdate,
    sendPresence,
  };
}
