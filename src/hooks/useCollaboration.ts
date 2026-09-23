import { useEffect, useRef, useState } from 'react';
import { useWebSocketConnection } from './useWebSocketConnection';
import type { EditorChange, RemoteChange } from '../types/editor';
import type { PresenceMessage, SyncMessage } from '../types/websocketMessage';
import { applyLocalChange, applyRemoteChange } from '../utils/conflictResolver';

/**
 * Hook that wires the editor to the collaborative backend.
 * It handles:
 *   • Queuing local edits while offline.
 *   • Applying remote changes in order.
 *   • Keeping user presence (join/leave/cursor) consistent across reconnects.
 */
export function useCollaboration(sessionId: string, username: string, color: string) {
  const { socket, connected, sendMessage } = useWebSocketConnection(`${process.env.REACT_APP_WS_URL}/${sessionId}`);
  const pendingEdits = useRef<EditorChange[]>([]);
  const [document, setDocument] = useState<string>('');
  const [users, setUsers] = useState<Record<string, { name: string; color: string; cursor?: number }>>({});

  // Send presence information once we are connected.
  useEffect(() => {
    if (connected && socket) {
      const presence: PresenceMessage = {
        type: 'PRESENCE',
        payload: { userId: username, name: username, color },
      };
      sendMessage(presence);
    }
  }, [connected, username, color, sendMessage]);

  // Flush queued edits after reconnection.
  useEffect(() => {
    if (connected && pendingEdits.current.length > 0) {
      pendingEdits.current.forEach((edit) => {
        const msg = { type: 'EDITOR_CHANGE', payload: edit } as const;
        sendMessage(msg);
      });
      pendingEdits.current = [];
    }
  }, [connected, sendMessage]);

  // Incoming message handling.
  useEffect(() => {
    if (!socket) return;
    const handler = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as any;
      switch (data.type) {
        case 'SYNC_RESPONSE': {
          const sync: SyncMessage = data;
          setDocument(sync.payload.content);
          setUsers(sync.payload.users);
          break;
        }
        case 'EDITOR_CHANGE': {
          const remote: RemoteChange = data.payload;
          setDocument((prev) => applyRemoteChange(prev, remote));
          break;
        }
        case 'PRESENCE': {
          const pres: PresenceMessage = data;
          setUsers((prev) => ({
            ...prev,
            [pres.payload.userId]: { name: pres.payload.name, color: pres.payload.color, cursor: prev[pres.payload.userId]?.cursor },
          }));
          break;
        }
        case 'CURSOR_UPDATE': {
          const { userId, position } = data.payload as { userId: string; position: number };
          setUsers((prev) => {
            const user = prev[userId];
            if (!user) return prev;
            return { ...prev, [userId]: { ...user, cursor: position } };
          });
          break;
        }
        case 'USER_LEAVE': {
          const { userId } = data.payload as { userId: string };
          setUsers((prev) => {
            const { [userId]: _, ...rest } = prev;
            return rest;
          });
          break;
        }
        default:
          // ignore unknown messages
          break;
      }
    };
    socket.addEventListener('message', handler);
    return () => socket.removeEventListener('message', handler);
  }, [socket]);

  const onLocalEdit = (change: EditorChange) => {
    // Optimistically apply locally.
    setDocument((prev) => applyLocalChange(prev, change));
    if (connected && socket) {
      sendMessage({ type: 'EDITOR_CHANGE', payload: change } as const);
    } else {
      pendingEdits.current.push(change);
    }
  };

  const updateCursor = (position: number) => {
    if (connected && socket) {
      const msg = { type: 'CURSOR_UPDATE', payload: { userId: username, position } } as const;
      sendMessage(msg);
    }
  };

  return { document, users, onLocalEdit, updateCursor } as const;
}
