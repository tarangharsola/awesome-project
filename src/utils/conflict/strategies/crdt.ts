/**
 * Simple CRDT implementation for collaborative text editing.
 * This file now includes deduplication of operations to avoid applying the same
 * operation multiple times, which can happen after reconnection scenarios.
 */

type Operation = {
  id: string; // globally unique identifier for the operation
  type: 'insert' | 'delete';
  index: number;
  value?: string; // present for insert
  length?: number; // present for delete
};

type DocumentState = string;

// Set of operation IDs that have already been applied to the local document.
const appliedOps = new Set<string>();

/**
 * Apply a remote operation to the current document state.
 * If the operation has already been applied (detected via its id), it is ignored.
 */
export function applyRemoteOperation(op: Operation, current?: DocumentState): DocumentState {
  // Initialize document if not provided.
  let doc = current ?? '';

  if (appliedOps.has(op.id)) {
    // Duplicate operation – ignore to keep state consistent.
    return doc;
  }

  appliedOps.add(op.id);

  switch (op.type) {
    case 'insert': {
      const before = doc.slice(0, op.index);
      const after = doc.slice(op.index);
      doc = before + (op.value ?? '') + after;
      break;
    }
    case 'delete': {
      const before = doc.slice(0, op.index);
      const after = doc.slice(op.index + (op.length ?? 0));
      doc = before + after;
      break;
    }
    default:
      // Unknown operation type – no change.
      break;
  }
  return doc;
}

/**
 * Reset the deduplication set. Useful when a full document sync is received
 * because the previous operation history may no longer be relevant.
 */
export function resetOperationHistory() {
  appliedOps.clear();
}
