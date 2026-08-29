import { DocumentChange } from "../types/editor";

/**
 * Apply a single document change to the current content.
 * This is a pure function that returns the new content string.
 */
export function applyChange(content: string, change: DocumentChange): string {
  const before = content.slice(0, change.range.start);
  const after = content.slice(change.range.end);
  return before + change.text + after;
}

/**
 * Transform a local change against a remote change using a simple OT algorithm.
 * The implementation assumes non‑overlapping ranges for simplicity; overlapping
 * changes are resolved by giving precedence to the remote change.
 */
export function transformChange(local: DocumentChange, remote: DocumentChange): DocumentChange {
  // If the remote change occurs before the local change, shift the local indices.
  if (remote.range.start <= local.range.start) {
    const shift = remote.text.length - (remote.range.end - remote.range.start);
    return {
      ...local,
      range: {
        start: local.range.start + shift,
        end: local.range.end + shift
      }
    };
  }
  // No transformation needed when remote change is after local change.
  return local;
}
