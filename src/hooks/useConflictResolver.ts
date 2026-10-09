import { useRef } from 'react';
import type { CRDTOperation } from '../utils/conflict/strategies/crdt';
import { applyRemoteOperation, generateInsertOperation, generateDeleteOperation } from '../utils/conflict/strategies/crdt';

/**
 * Hook that encapsulates conflict‑resolution logic using a simple sequence CRDT.
 * It provides helpers to transform local edits into CRDT operations and to apply
 * remote operations to the local document state.
 */
export function useConflictResolver(clientId: string) {
  const pendingOpsRef = useRef<CRDTOperation[]>([]);

  const localInsert = (pos: number, char: string) => {
    const op = generateInsertOperation(clientId, pos, char);
    pendingOpsRef.current.push(op);
    return op;
  };

  const localDelete = (pos: number) => {
    const op = generateDeleteOperation(clientId, pos);
    pendingOpsRef.current.push(op);
    return op;
  };

  const applyRemote = (op: CRDTOperation) => {
    // Remove from pending if we already generated the same operation (echo)
    const idx = pendingOpsRef.current.findIndex(
      (p) => p.id === op.id && p.type === op.type
    );
    if (idx !== -1) {
      pendingOpsRef.current.splice(idx, 1);
      return null; // No UI update needed – already applied locally
    }
    return applyRemoteOperation(op);
  };

  return { localInsert, localDelete, applyRemote } as const;
}
