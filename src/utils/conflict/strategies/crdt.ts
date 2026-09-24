import type { Operation } from "../../types/editor";
import type { CRDTState } from "./types";

/**
 * Apply a single CRDT operation to the current state.
 * This implementation uses a simple RGA (Replicated Growable Array) model.
 */
export function applyCRDTOperation(state: CRDTState, op: Operation): CRDTState {
  const { id, char, position, deleted } = op;
  const existing = state.chars.find((c) => c.id === id);

  if (deleted) {
    if (existing) existing.visible = false;
    return state;
  }

  if (!existing) {
    const newChar = { id, char, position, visible: true };
    // Insert while preserving order based on numeric position
    const index = state.chars.findIndex((c) => c.position > position);
    if (index === -1) {
      state.chars.push(newChar);
    } else {
      state.chars.splice(index, 0, newChar);
    }
  }

  return state;
}

/** Convert the CRDT state back to plain text */
export function getTextFromCRDT(state: CRDTState): string {
  return state.chars
    .filter((c) => c.visible)
    .map((c) => c.char)
    .join("");
}
