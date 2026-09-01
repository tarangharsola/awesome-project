import { ConflictOperation } from "./types";

/**
 * Simple character‑based CRDT implementation.
 * It maintains an array of characters with unique identifiers.
 * For the purpose of this project the implementation is kept minimal
 * and focuses on deterministic merge of concurrent inserts/deletes.
 */
export class CRDT {
  private chars: { id: string; value: string }[] = [];

  constructor(initial = "") {
    // initialise with a single block representing the whole string
    this.chars = initial.split("").map((ch, i) => ({
      id: `init-${i}`,
      value: ch,
    }));
  }

  /**
   * Apply a conflict operation to the CRDT state.
   */
  apply(op: ConflictOperation) {
    const { index, insert, deleteCount } = op;
    if (insert !== undefined) {
      const newChars = insert.split("").map((ch, i) => ({
        id: `${Date.now()}-${i}-${Math.random()}`,
        value: ch,
      }));
      this.chars.splice(index, 0, ...newChars);
    } else if (deleteCount) {
      this.chars.splice(index, deleteCount);
    }
  }

  /** Return the plain string representation of the current state */
  toString(): string {
    return this.chars.map((c) => c.value).join("");
  }
}
