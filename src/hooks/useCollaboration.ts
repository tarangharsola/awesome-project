import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { useConflictResolver } from './useConflictResolver';
import { User } from '../types';
import { WebSocketMessage } from '../types/websocketMessage';

type CollaborationOptions = {
  roomId: string;
  user: User;
  onDocumentChange: (content: string) => void;
  onRemoteCursors: (
    cursors: Record<string, { position: number; color: string; name: string }>
  ) => void;
};

export const useCollaboration = ({
  roomId,
  user,
  onDocumentChange,
  onRemoteCursors,
}: CollaborationOptions) => {
  const { sendMessage, connected } = useWebSocket(
    `${process.env.REACT_APP_WS_URL}/${roomId}`,
    { onMessage: handleMessage }
  );

  const { applyLocal, applyRemote } = useConflictResolver();

  const pendingOpsRef = useRef<WebSocketMessage[]>([]);

  function handleMessage(msg: WebSocketMessage) {
    switch (msg.type) {
      case 'document':
        onDocumentChange(msg.payload.content);
        break;
      case 'operation':
        applyRemote(msg.payload);
        break;
      case 'presence':
        onRemoteCursors(msg.payload);
        break;
      case 'sync-request':
        // server will respond with full document
        break;
      default:
        break;
    }
  }

  const sendLocalOperation = (op: any) => {
    const msg: WebSocketMessage = { type: 'operation', payload: op };
    if (connected) {
      sendMessage(msg);
    } else {
      pendingOpsRef.current.push(msg);
    }
  };

  const broadcastPresence = () => {
    const msg: WebSocketMessage = {
      type: 'presence',
      payload: {
        userId: user.id,
        name: user.name,
        color: user.color,
        position: 0,
      },
    };
    sendMessage(msg);
  };

  const requestSync = () => {
    const msg: WebSocketMessage = { type: 'sync-request', payload: {} };
    sendMessage(msg);
  };

  // When connection (initial or after reconnection) is established, broadcast presence,
  // request the latest document state, and flush any queued operations.
  useEffect(() => {
    if (connected) {
      broadcastPresence();
      requestSync();
      pendingOpsRef.current.forEach((msg) => sendMessage(msg));
      pendingOpsRef.current = [];
    }
  }, [connected, user]);

  return { applyLocal, sendLocalOperation };
};