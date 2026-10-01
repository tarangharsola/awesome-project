import { useEffect, useRef, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { EditorChange } from '../types/editor';
import type { CollaborationMessage } from '../types/collaborationMessage';
import { resolveConflict, ConflictStrategy } from '../utils/conflictResolver';

interface UseCollaborationOptions {
  roomId: string;
  userId: string;
  userName: string;
  userColor: string;
  onRemoteChange: (change: EditorChange) => void;
  getLocalContent: () => string;
  setLocalContent: (content: string) => void;
}

/**
 * Hook that wires editor changes to the collaboration backend.
 * It queues local edits, applies remote operations using the selected
 * conflict strategy, and ensures a full document sync after any reconnection.
 */
export function useCollaboration({
  roomId,
  userId,
  userName,
  userColor,
  onRemoteChange,
  getLocalContent,
  setLocalContent,
}: UseCollaborationOptions) {
  const pendingOps = useRef<EditorChange[]>([]);
  const lastSyncedVersion = useRef<number>(0);

  const { isConnected, sendMessage } = useWebSocket({
    url: `${process.env.REACT_APP_WS_URL}/rooms/${roomId}`,
    onMessage: handleMessage,
    initPayload: {
      type: 'join',
      userId,
      userName,
      userColor,
    },
  });

  // Send local edit to server, queue if not connected
  const submitLocalChange = useCallback((change: EditorChange) => {
    pendingOps.current.push(change);
    const msg: CollaborationMessage = {
      type: 'operation',
      roomId,
      userId,
      payload: change,
    };
    sendMessage(msg);
  }, [roomId, userId, sendMessage]);

  // Process incoming messages
  function handleMessage(msg: CollaborationMessage) {
    switch (msg.type) {
      case 'operation':
        // Ignore our own echo if server mirrors back
        if (msg.userId === userId) return;
        applyRemoteChange(msg.payload as EditorChange);
        break;
      case 'sync':
        // Full document sync – replace local content
        setLocalContent(msg.payload.content);
        lastSyncedVersion.current = msg.payload.version;
        // Clear pending ops that are older than the synced version
        pendingOps.current = pendingOps.current.filter(
          (op) => op.version > lastSyncedVersion.current
        );
        break;
      case 'presence':
        // Presence messages are handled elsewhere (usePresence hook)
        break;
      default:
        console.warn('Unhandled collaboration message type', (msg as any).type);
    }
  }

  // Apply remote change using conflict resolution strategy with fallback
  const applyRemoteChange = useCallback((remoteChange: EditorChange) => {
    const localContent = getLocalContent();
    const resolved = resolveConflict(
      localContent,
      remoteChange,
      ConflictStrategy.CRDTSafe
    );
    if (resolved) {
      setLocalContent(resolved);
      onRemoteChange(remoteChange);
    } else {
      // Fallback to OT if CRDT fails
      const otResolved = resolveConflict(
        localContent,
        remoteChange,
        ConflictStrategy.OperationalTransformation
      );
      if (otResolved) {
        setLocalContent(otResolved);
        onRemoteChange(remoteChange);
      } else {
        console.error('Failed to resolve conflict for remote change');
      }
    }
  }, [getLocalContent, setLocalContent, onRemoteChange]);

  // When connection is re‑established, request a fresh sync
  useEffect(() => {
    if (isConnected) {
      sendMessage({ type: 'requestSync', roomId, userId });
    }
  }, [isConnected, sendMessage, roomId, userId]);

  // Expose API for the editor component
  return { submitLocalChange, isConnected };
}
