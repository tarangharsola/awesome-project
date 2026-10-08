/**
 * Minimal CRDT implementation for a linear text document. It follows a
 * simple operation‑based approach where each edit is represented as an
 * insert/delete operation with a monotonically increasing sequence number per
 * user. The resolver guarantees deterministic merging without requiring a
 * central authority.
 */

type Operation = {
  id: string; // unique identifier `${userId}-${seq}`
  seq: number; // per‑user sequence number
  userId: string;
  position: number; // zero‑based index in the document
  insert?: string; // text to insert (optional)
  deleteCount?: number; // number of characters to delete (optional)
};

/** Apply a remote operation to the current document content. */
export function applyRemoteEdit(content: string, op: Operation): string {
  let result = content;
  // Deletions first to keep positions stable
  if (op.deleteCount && op.deleteCount > 0) {
    result = result.slice(0, op.position) + result.slice(op.position + op.deleteCount);
  }
  // Insert after deletion
  if (op.insert) {
    result = result.slice(0, op.position) + op.insert + result.slice(op.position);
  }
  return result;
}

/** Replace the whole document with a fresh snapshot (used after reconnect). */
export function applyFullSync(_: string, newContent: string): string {
  return newContent;
}

/**
 * Create an operation describing the transformation from `prev` to `next`.
 * The algorithm is intentionally simple: it finds the first differing index
 * and treats the remainder as a delete followed by an insert. This is sufficient
 * for typical line‑oriented edits and keeps the CRDT lightweight.
 */
export function createOperation(prev: string, next: string, userId: string, seq: number): Operation {
  let i = 0;
  while (i < prev.length && i < next.length && prev[i] === next[i]) i++;
  const deleteCount = prev.length - i;
  const insert = next.slice(i);
  return {
    id: `${userId}-${seq}`,
    seq,
    userId,
    position: i,
    ...(deleteCount > 0 ? { deleteCount } : {}),
    ...(insert.length > 0 ? { insert } : {}),
  };
}
