import { Operation } from '../../types/conflict';

/**
 * Simple CRDT implementation for collaborative text editing.
 * It maintains a set of applied operation IDs to guarantee idempotency
 * and orders operations by their timestamp to resolve conflicts deterministically.
 */

export function applyCRDTOperations(initialDoc: string, ops: Operation[]): string {
  // Keep track of applied operation IDs to avoid duplicates.
  const applied = new Set<string>();
  // Sort operations by timestamp (ascending) to ensure a total order.
  const sortedOps = [...ops].sort((a, b) => a.timestamp - b.timestamp);

  let docArray = initialDoc.split('');

  for (const op of sortedOps) {
    if (applied.has(op.id)) continue;
    applied.add(op.id);

    if (op.type === 'insert') {
      // Guard against out‑of‑range inserts.
      const index = Math.min(Math.max(op.index, 0), docArray.length);
      if (op.char !== undefined) {
        docArray.splice(index, 0, op.char);
      }
    } else if (op.type === 'delete') {
      // Guard against out‑of‑range deletes.
      const index = Math.min(Math.max(op.index, 0), docArray.length - 1);
      docArray.splice(index, 1);
    }
  }

  return docArray.join('');
}
