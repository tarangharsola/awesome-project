import { useEffect, useState, useCallback } from 'react';
import { useWebSocketConnection } from './useWebSocketConnection';
import { User, Cursor, DocumentState } from '../types/collaboration';
import { WebSocketMessage } from '../types/websocketMessage';

export const useCollaboration = (roomId: string, localUser: User) => {
  const { send, isConnected, ws } = useWebSocketConnection(`${process.env.REACT_APP_WS_URL}/${roomId}`);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const [doc, setDoc] = useState<DocumentState>({ content: '', version: 0 });

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const msg: WebSocketMessage = JSON.parse(event.data);
      switch (msg.type) {
        case 'presence':
          setUsers(prev => ({ ...prev, [msg.user.id]: msg.user }));
          break;
        case 'cursor':
          setCursors(prev => ({ ...prev, [msg.userId]: { userId: msg.userId, position: msg.position } }));
          break;
        case 'document':
          if (msg.version > doc.version) {
            setDoc({ content: msg.content, version: msg.version });
          }
          break;
        default:
          break;
      }
    },
    [doc.version]
  );

  useEffect(() => {
    if (!isConnected || !ws) return;
    ws.addEventListener('message', handleMessage);
    // announce presence on connect
    send({ type: 'presence', user: localUser });
    return () => {
      ws.removeEventListener('message', handleMessage);
    };
  }, [isConnected, ws, handleMessage, send, localUser]);

  const broadcastCursor = (position: number) => {
    send({ type: 'cursor', userId: localUser.id, position });
  };

  const applyRemoteEdit = (content: string, version: number) => {
    if (version > doc.version) {
      setDoc({ content, version });
    }
  };

  return { users, cursors, doc, isConnected, broadcastCursor, applyRemoteEdit };
};