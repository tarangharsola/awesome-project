/**
 * Simple conflict resolver based on Lamport timestamps.
 * Each operation carries a `clientId` and an incrementing `seq`.
 * The resolver orders operations by (seq, clientId) to achieve a total order.
 */

export type Operation = {
  clientId: string;
  seq: number;
  type: "insert" | "delete";
  index: number;
  text?: string;
};

/**
 * Merge local and remote operation streams into a deterministic order.
 * Duplicates (same clientId and seq) are removed.
 */
export const resolveOperations = (
  localOps: Operation[],
  remoteOps: Operation[]
): Operation[] => {
  const merged = [...localOps, ...remoteOps];
  merged.sort((a, b) => {
    if (a.seq !== b.seq) {
      return a.seq - b.seq;
    }
    return a.clientId.localeCompare(b.clientId);
  });
  const unique: Operation[] = [];
  const seen = new Set<string>();
  for (const op of merged) {
    const key = `${op.clientId}:${op.seq}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(op);
    }
  }
  return unique;
};

/**
 * Apply an ordered list of operations to a plain‑text document.
 */
export const applyOperations = (doc: string, ops: Operation[]): string => {
  let result = doc;
  for (const op of ops) {
    if (op.type === "insert" && op.text) {
      result = result.slice(0, op.index) + op.text + result.slice(op.index);
    } else if (op.type === "delete") {
      result = result.slice(0, op.index) + result.slice(op.index + 1);
    }
  }
  return result;
};