import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import { usePresence } from './usePresence';
import { useConflictResolver } from './useConflictResolver';
import { User } from '../types/presence';
import { CollaborationMessage } from '../types/collaborationMessage';

/**
 * Core collaboration hook that wires together WebSocket communication,
 * conflict resolution (CRDT), and presence awareness. It guarantees that
 * after a reconnection the document state and user list are re‑synchronised.
 */
export function useCollaborationCore(roomId: string, localUser: User) {
  const [doc, setDoc] = useState<string>('');
  const resolver = useConflictResolver();

  const { send, connected } = useWebSocket(`${process.env.REACT_APP_WS_URL}/${roomId}`, handleMessage);
  const { users, broadcastPresence } = usePresence(localUser, send);

  // Send join and request a full sync whenever the socket becomes healthy
  useEffect(() => {
    if (!connected) return;
    // Announce ourselves to the room
    send({ type: 'join', user: localUser } as CollaborationMessage);
    // Re‑broadcast presence (useful after reconnect)
    broadcastPresence();
    // Ask the server for the latest document snapshot
    send({ type: 'request_sync' } as CollaborationMessage);
  }, [connected, localUser, send, broadcastPresence]);

  // Centralised message dispatcher
  function handleMessage(msg: CollaborationMessage) {
    switch (msg.type) {
      case 'full_sync': {
        const newContent = resolver.applyFullSync(doc, msg.content);
        setDoc(newContent);
        break;
      }
      case 'remote_edit': {
        const newContent = resolver.applyRemoteEdit(doc, msg.operation);
        setDoc(newContent);
        break;
      }
      case 'presence':
        // Presence updates are handled inside usePresence via the same socket
        break;
      default:
        console.warn('Unhandled collaboration message type', (msg as any).type);
    }
  }

  // Called by the editor component when the local user makes a change
  const applyLocalEdit = useCallback(
    (newContent: string) => {
      const operation = resolver.createOperation(doc, newContent, localUser.id);
      setDoc(newContent);
      send({ type: 'remote_edit', operation, userId: localUser.id } as CollaborationMessage);
    },
    [doc, localUser.id, resolver, send]
  );

  return { doc, applyLocalEdit, users, connected } as const;
}
