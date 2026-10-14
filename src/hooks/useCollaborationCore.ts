import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { applyCRDTOperation } from '../utils/conflict/strategies/crdtCore';
import { EditorChange } from '../types/editor';
import { PresenceMessage } from '../types/presence';

/**
 * Core collaboration hook handling document state, presence, and reliable
 * operation delivery. It works with the enhanced WebSocket hook to survive
 * temporary network interruptions.
 */
export const useCollaborationCore = (
  sessionId: string,
  username: string,
  color: string
) => {
  const { status, sendMessage } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${sessionId}`);
  const pendingOps = useRef<EditorChange[]>([]);
  const [document, setDocument] = useState<string>('');
  const [users, setUsers] = useState<Record<string, { name: string; color: string }>>({});

  // Announce presence when the socket becomes ready.
  useEffect(() => {
    if (status === 'connected') {
      const joinMsg = JSON.stringify({ type: 'join', sessionId, username, color });
      sendMessage(joinMsg);
    }
  }, [status, sessionId, username, color, sendMessage]);

  // Global message listener for collaboration events.
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const msg = JSON.parse(e.data);
      switch (msg.type) {
        case 'sync':
          // Full document and presence snapshot from the server.
          setDocument(msg.content);
          setUsers(msg.users);
          // Resend any ops that were generated while offline.
          pendingOps.current.forEach((op) => {
            sendMessage(JSON.stringify({ type: 'op', ...op }));
          });
          pendingOps.current = [];
          break;
        case 'op':
          setDocument((prev) => applyCRDTOperation(prev, msg));
          break;
        case 'presence':
          setUsers((prev) => ({
            ...prev,
            [msg.userId]: { name: msg.name, color: msg.color },
          })));
          break;
        case 'presenceLeave':
          setUsers((prev) => {
            const copy = { ...prev };
            delete copy[msg.userId];
            return copy;
          });
          break;
        default:
          // Unknown message types are ignored deliberately.
          break;
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [sendMessage]);

  // Called by the editor component when the local user makes a change.
  const localChange = (change: EditorChange) => {
    // Optimistically apply the change locally.
    setDocument((prev) => applyCRDTOperation(prev, change));
    const payload = { type: 'op', ...change };
    if (status === 'connected') {
      sendMessage(JSON.stringify(payload));
    } else {
      pendingOps.current.push(change);
    }
  };

  return {
    document,
    users,
    localChange,
    connectionStatus: status,
  } as const;
};