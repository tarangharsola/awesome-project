import { Operation } from '../../types/conflict';

/**
 * Simple CRDT merge implementation that guarantees idempotent application of operations.
 * Each operation must contain a unique `id` (e.g., `${clientId}-${timestamp}`) and the
 * text to insert/delete along with its position. The algorithm:
 *   1. Deduplicate operations using a Set of ids.
 *   2. Sort operations by their `id` to achieve deterministic ordering across clients.
 *   3. Apply operations sequentially to the base content.
 * This approach works for line‑oriented editors and avoids conflict loops.
 */
export function mergeOperations(base: string, ops: Operation[]): string {
  // Deduplicate based on operation id
  const seen = new Set<string>();
  const uniqueOps: Operation[] = [];
  for (const op of ops) {
    if (!op.id) continue; // ignore malformed ops
    if (!seen.has(op.id)) {
      seen.add(op.id);
      uniqueOps.push(op);
    }
  }

  // Deterministic order – lexical sort of ids (clientId‑timestamp ensures total order)
  uniqueOps.sort((a, b) => (a.id! > b.id! ? 1 : -1));

  // Apply operations. For simplicity we support only insert and delete.
  let result = base;
  for (const op of uniqueOps) {
    if (op.type === 'insert') {
      const before = result.slice(0, op.position);
      const after = result.slice(op.position);
      result = before + op.text + after;
    } else if (op.type === 'delete') {
      const before = result.slice(0, op.position);
      const after = result.slice(op.position + op.length);
      result = before + after;
    }
    // Unknown operation types are ignored safely.
  }
  return result;
}

/**
 * Exported resolver that integrates with the store. It receives remote operations,
 * merges them with the current editor state using `mergeOperations`, and returns the
 * new content. The function is pure and can be unit‑tested.
 */
export function resolveConflicts(current: string, remoteOps: Operation[]): string {
  return mergeOperations(current, remoteOps);
}
