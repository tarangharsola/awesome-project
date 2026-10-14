/**
 * Minimal CRDT core for plain‑text collaborative editing. Operations are
 * identified by a globally unique `id` (e.g., UUID) and contain a range and
 * replacement text. The implementation tracks applied operation IDs to make
 * the function idempotent – re‑applying the same operation has no effect.
 */

// Set of operation IDs that have already been applied to the current document.
const appliedOps = new Set<string>();

/**
 * Apply a CRDT operation to a document string.
 *
 * @param doc Current document content.
 * @param op  Operation object with shape:
 *            { id: string, range: { start: number, end: number }, text: string }
 * @returns   New document string after applying the operation.
 */
export const applyCRDTOperation = (
  doc: string,
  op: { id: string; range: { start: number; end: number }; text: string }
): string => {
  // Guard against duplicate application.
  if (appliedOps.has(op.id)) {
    return doc;
  }
  appliedOps.add(op.id);

  const { start, end } = op.range;
  // Simple splice: replace the range with the provided text.
  const before = doc.slice(0, start);
  const after = doc.slice(end);
  return `${before}${op.text}${after}`;
};