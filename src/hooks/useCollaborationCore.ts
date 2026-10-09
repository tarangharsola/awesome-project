import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { usePresence } from './usePresence';
import { useConflictResolver } from './useConflictResolver';
import type { EditorChange } from '../types/editor';
import type { CRDTOperation } from '../utils/conflict/strategies/crdt';

/**
 * Core hook that wires together WebSocket communication, presence handling, and
 * CRDT‑based conflict resolution for a collaborative editing session.
 */
export function useCollaborationCore(
  sessionId: string,
  username: string,
  color: string,
  onDocumentChange: (doc: string) => void,
  onUsersUpdate: (users: Record<string, any>) => void
) {
  const clientIdRef = useRef<string>(`client-${Math.random().toString(36).substr(2, 9)}`);
  const { broadcastCursor, connectionStatus } = usePresence(
    sessionId,
    username,
    color,
    onUsersUpdate
  );

  const { localInsert, localDelete, applyRemote } = useConflictResolver(clientIdRef.current);

  const [doc, setDoc] = useState<string>('');

  const handleMessage = (msg: any) => {
    if (msg.type === 'crdt') {
      const op: CRDTOperation = msg.payload;
      const updated = applyRemote(op);
      if (updated !== null) {
        setDoc(updated);
        onDocumentChange(updated);
      }
    }
    // Presence messages are handled inside usePresence
  };

  const { status, send } = useWebSocket(`wss://example.com/collab/${sessionId}`, handleMessage);

  // Forward local editor changes to CRDT and broadcast
  const onLocalChange = (change: EditorChange) => {
    // Assuming change has shape { from: number, to: number, text: string }
    // Apply deletions first (if any)
    for (let i = change.from; i < change.to; i++) {
      const delOp = localDelete(i);
      send({ type: 'crdt', payload: delOp });
    }
    // Then insert new characters
    for (let i = 0; i < change.text.length; i++) {
      const char = change.text[i];
      const insOp = localInsert(change.from + i, char);
      send({ type: 'crdt', payload: insOp });
    }
  };

  // Expose cursor broadcasting for the editor component
  const onCursorActivity = (cursor: { line: number; ch: number } | null) => {
    broadcastCursor(cursor);
  };

  // Keep connection status in sync with presence hook
  useEffect(() => {
    // No additional side‑effects needed – presence already reacts to status changes.
  }, [status]);

  return {
    connectionStatus,
    onLocalChange,
    onCursorActivity,
    doc,
  } as const;
}
