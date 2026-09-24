import { applyCRDTOperation, getTextFromCRDT } from "./conflict/strategies/crdt";
import type { Operation } from "./types/editor";
import type { CRDTState } from "./conflict/strategies/types";

/**
 * Resolve a sequence of operations using the CRDT strategy.
 * Returns the final document text.
 */
export function resolveOperations(ops: Operation[], initialState: CRDTState): string {
  let state: CRDTState = { ...initialState };
  ops.forEach((op) => {
    state = applyCRDTOperation(state, op);
  });
  return getTextFromCRDT(state);
}
