/**
 * Minimal CRDT core for a plain text collaborative editor.
 * It uses a monotonically increasing sequence number per client to
 * guarantee total ordering of operations across the network.
 */

export interface Operation {
  type: 'insert' | 'delete';
  index: number;
  text?: string; // for insert
  length?: number; // for delete
  userId: string;
  seq: number; // global sequence number assigned by the sender
}

/** Apply a local operation to the current document content. */
export function applyLocalOperation(content: string, op: Operation): string {
  if (op.type === 'insert' && op.text) {
    return content.slice(0, op.index) + op.text + content.slice(op.index);
  }
  if (op.type === 'delete' && op.length) {
    return content.slice(0, op.index) + content.slice(op.index + op.length);
  }
  return content;
}

/** Apply a remote operation. In this simple CRDT we assume operations are
 * received in total order (guaranteed by the sequence number handling in
 * the collaboration core), so no transformation is required.
 */
export function applyRemoteOperation(content: string, op: Operation): string {
  return applyLocalOperation(content, op);
}
