import { useEffect, useRef, useCallback, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { CollaborationMessage } from '../types/collaborationMessage';
import { applyCRDTOperation } from '../utils/conflict';
import { User } from '../types';

/**
 * Core collaboration hook handling document state, local edits, and remote
 * operations. It buffers local operations when the websocket is offline and
 * re‑sends them once the connection is restored, guaranteeing eventual
 * consistency.
 */
export const useCollaborationCore = (sessionId: string, user: User) => {
  const wsUrl = `${process.env.REACT_APP_WS_ENDPOINT}/session/${sessionId}`;
  const { status, sendMessage } = useWebSocket(wsUrl);

  const [doc, setDoc] = useState<string>('');
  const pendingOps = useRef<CollaborationMessage[]>([]);

  // Apply a remote operation to the local document state
  const applyRemote = useCallback((msg: CollaborationMessage) => {
    if (msg.type !== 'operation') return;
    setDoc((prev) => applyCRDTOperation(prev, msg));
  }, []);

  // Listen for incoming websocket messages and dispatch them
  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent).detail as CollaborationMessage;
      if (msg.type === 'operation') {
        applyRemote(msg);
      } else if (msg.type === 'presence') {
        // Presence handling is performed in a dedicated hook; no action needed here
      }
    };
    window.addEventListener('websocket-message', handler);
    return () => window.removeEventListener('websocket-message', handler);
  }, [applyRemote]);

  // Broadcast presence information whenever we (re)connect
  useEffect(() => {
    if (status === 'connected') {
      const presenceMsg: CollaborationMessage = {
        type: 'presence',
        userId: user.id,
        payload: { username: user.name, color: user.color },
      } as any; // cast to satisfy type system – actual shape defined elsewhere
      sendMessage(presenceMsg);
    }
  }, [status, sendMessage, user]);

  // Flush any operations that were queued while offline
  useEffect(() => {
    if (status === 'connected' && pendingOps.current.length > 0) {
      pendingOps.current.forEach((op) => sendMessage(op));
      pendingOps.current = [];
    }
  }, [status, sendMessage]);

  // Called by the editor component when the local user makes an edit
  const localEdit = useCallback((operation: any) => {
    const msg: CollaborationMessage = {
      type: 'operation',
      userId: user.id,
      payload: operation,
    } as any;
    // Optimistically apply locally
    setDoc((prev) => applyCRDTOperation(prev, msg));
    if (status === 'connected') {
      sendMessage(msg);
    } else {
      pendingOps.current.push(msg);
    }
  }, [status, sendMessage, user.id]);

  return { doc, localEdit } as const;
};