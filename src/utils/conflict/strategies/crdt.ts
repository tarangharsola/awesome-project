import { Operation, Document } from "../../types/collaboration";

/**
 * Apply a single CRDT operation to the document using a simple last‑writer‑wins rule.
 * Each operation must contain a unique id and a monotonically increasing timestamp.
 */
export function applyCrdtOperation(doc: Document, op: Operation): Document {
  const existing = doc[op.position];
  if (!existing || op.timestamp >= existing.timestamp) {
    return {
      ...doc,
      [op.position]: { char: op.char, timestamp: op.timestamp, id: op.id },
    };
  }
  return doc;
}

/**
 * Merge a remote document state into the local one.
 * For each position we keep the operation with the highest timestamp.
 */
export function mergeDocuments(local: Document, remote: Document): Document {
  const merged: Document = { ...local };
  for (const pos in remote) {
    const remoteOp = remote[pos];
    const localOp = merged[pos];
    if (!localOp || remoteOp.timestamp > localOp.timestamp) {
      merged[pos] = remoteOp;
    }
  }
  return merged;
}
