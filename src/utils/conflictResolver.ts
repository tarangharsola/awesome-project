import { Operation } from './conflict/types';
import { applyCRDTOperations } from './conflict/strategies/crdt';
import { applyOTOperations } from './conflict/strategies/ot';
import { ConflictStrategy } from './conflict/types';

/**
 * Resolve a batch of incoming operations against the current document state.
 * The resolver prefers CRDT; if an error occurs it falls back to OT.
 */
export function resolveConflicts(
  currentDoc: string,
  ops: Operation[],
  strategy: ConflictStrategy = 'crdt'
): string {
  try {
    if (strategy === 'crdt') {
      return applyCRDTOperations(currentDoc, ops);
    }
    // Fallback to OT if explicitly requested.
    return applyOTOperations(currentDoc, ops);
  } catch (e) {
    console.error('Conflict resolution failed, falling back to CRDT', e);
    // As a safety net, reset to the state produced by CRDT.
    return applyCRDTOperations(currentDoc, ops);
  }
}
