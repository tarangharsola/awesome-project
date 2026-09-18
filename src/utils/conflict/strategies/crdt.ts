import { CRDTOperation, CRDTState } from "../../types/conflict";

/**
 * Apply a local operation to the CRDT state. Generates a unique id and timestamp
 * for deterministic ordering.
 */
export const applyLocalOperation = (
  state: CRDTState,
  op: Omit<CRDTOperation, "id" | "timestamp">
): CRDTState => {
  const enriched: CRDTOperation = {
    ...op,
    id: generateId(),
    timestamp: Date.now(),
  };
  return { ...state, operations: [...state.operations, enriched] };
};

/**
 * Apply a remote operation. Duplicate operations are ignored. Operations are
 * inserted in timestamp order to guarantee convergence.
 */
export const applyRemoteOperation = (
  state: CRDTState,
  op: CRDTOperation
): CRDTState => {
  // Ignore if we already have this operation
  if (state.operations.some((existing) => existing.id === op.id)) {
    return state;
  }
  const merged = [...state.operations, op].sort((a, b) => a.timestamp - b.timestamp);
  return { ...state, operations: merged };
};

/**
 * Merge two CRDT states (e.g., after reconnection). The algorithm removes
 * duplicates and sorts by timestamp, ensuring both peers converge to the same
 * operation sequence.
 */
export const mergeStates = (
  local: CRDTState,
  remote: CRDTState
): CRDTState => {
  const combined = [...local.operations, ...remote.operations];
  const unique: CRDTOperation[] = [];
  const seen = new Set<string>();
  for (const op of combined) {
    if (!seen.has(op.id)) {
      seen.add(op.id);
      unique.push(op);
    }
  }
  unique.sort((a, b) => a.timestamp - b.timestamp);
  return { ...local, operations: unique };
};

/** Simple unique identifier generator for operations */
const generateId = (): string =>
  `${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
