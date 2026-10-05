import { CRDTOperation } from '../../types/conflict';

/**
 * Simple sequence‑based CRDT implementation.
 * Each operation is uniquely identified by a clientId and a monotonically increasing sequence number.
 * The set `appliedOps` guarantees idempotent application of operations that may arrive out of order or be duplicated.
 */

const appliedOps = new Set<string>();

/**
 * Apply a single CRDT operation to the document string.
 * Returns the new document string.
 */
export function applyCRDTOperation(doc: string, op: CRDTOperation): string {
  const opKey = `${op.clientId}:${op.seq}`;
  if (appliedOps.has(opKey)) {
    // Operation already applied – idempotent handling.
    return doc;
  }
  appliedOps.add(opKey);

  switch (op.type) {
    case 'insert': {
      const before = doc.slice(0, op.index);
      const after = doc.slice(op.index);
      return before + (op.text ?? '') + after;
    }
    case 'delete': {
      const before = doc.slice(0, op.index);
      const after = doc.slice(op.index + (op.length ?? 0));
      return before + after;
    }
    default:
      // Unknown operation – ignore to keep document consistent.
      return doc;
  }
}

/**
 * Apply a batch of operations in a deterministic order.
 * Operations are sorted first by clientId (lexicographically) then by sequence number.
 */
export function applyCRDTOperations(initialDoc: string, ops: CRDTOperation[]): string {
  const sorted = [...ops].sort((a, b) => {
    if (a.clientId < b.clientId) return -1;
    if (a.clientId > b.clientId) return 1;
    return a.seq - b.seq;
  });
  return sorted.reduce((doc, op) => applyCRDTOperation(doc, op), initialDoc);
}

/**
 * Reset the internal applied‑operations set.
 * Useful when a full document sync is performed (e.g., after reconnection).
 */
export function resetCRDTState(): void {
  appliedOps.clear();
}
