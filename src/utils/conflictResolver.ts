import { applyCRDT, mergeCRDT } from "./conflict/strategies/crdt";
import { applyOT, transformOT } from "./conflict/strategies/ot";
import type { Change, DocumentState } from "../types/editor";

/**
 * Resolve a single change against the current document state.
 * The default strategy is CRDT because it provides strong convergence
 * guarantees without a central authority. If CRDT processing throws
 * (e.g., due to malformed data), we gracefully fall back to OT.
 */
export const resolveChange = (
  state: DocumentState,
  change: Change,
  strategy: "crdt" | "ot" = "crdt"
): DocumentState => {
  if (strategy === "crdt") {
    try {
      return applyCRDT(state, change);
    } catch {
      // Fallback to OT on unexpected CRDT failure
      return applyOT(state, change);
    }
  }
  // Explicit OT path
  return applyOT(state, change);
};

/**
 * Merge two document states that may have diverged (e.g., after a reconnection).
 * CRDT merge is deterministic and order‑independent, making it ideal for
 * reconciling after network partitions. For OT we transform the remote
 * changes against the local state before applying.
 */
export const mergeStates = (
  local: DocumentState,
  remote: DocumentState,
  strategy: "crdt" | "ot" = "crdt"
): DocumentState => {
  if (strategy === "crdt") {
    return mergeCRDT(local, remote);
  }
  // OT merge – transform remote changes against local and apply
  const transformed = transformOT(remote, local);
  return applyOT(local, transformed);
};