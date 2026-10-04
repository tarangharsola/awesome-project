import { useRef } from 'react';
import { applyCRDTOperation, mergeCRDTState } from '../utils/conflict/strategies/crdt';
import { EditorOperation, EditorState } from '../types/editor';

/**
 * Hook that provides CRDT‑based conflict resolution for collaborative editing.
 * It keeps a local copy of the document state, applies local operations
 * immediately, queues them for remote broadcast, and merges incoming remote
 * operations safely.
 */
export function useConflictResolver(initialState: EditorState) {
  const stateRef = useRef<EditorState>(initialState);
  const pendingOps = useRef<EditorOperation[]>([]);

  /** Apply a local edit and queue it for transmission */
  const localEdit = (op: EditorOperation) => {
    // Apply operation locally using CRDT logic
    stateRef.current = applyCRDTOperation(stateRef.current, op);
    pendingOps.current.push(op);
    return stateRef.current;
  };

  /** Integrate a remote edit, de‑duplicate if it matches a pending local op */
  const remoteEdit = (op: EditorOperation) => {
    stateRef.current = applyCRDTOperation(stateRef.current, op);
    // Remove from pending if we already have this operation
    pendingOps.current = pendingOps.current.filter(
      (p) => !(p.id === op.id && p.userId === op.userId)
    );
    return stateRef.current;
  };

  /** Merge a full remote state (e.g., after reconnection) */
  const mergeState = (remoteState: EditorState) => {
    stateRef.current = mergeCRDTState(stateRef.current, remoteState);
    pendingOps.current = [];
  };

  const getState = () => stateRef.current;

  return { localEdit, remoteEdit, mergeState, getState } as const;
}
