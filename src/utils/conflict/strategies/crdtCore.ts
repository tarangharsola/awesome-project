import type { CRDTOperation } from "./crdtTypes";

/**
 * Simple CRDT core for plain text collaboration.
 * It tracks applied operation IDs to guarantee idempotent application,
 * which is essential when reconnecting or receiving duplicate messages.
 */
export class CRDTCore {
  private text: string = "";
  private appliedOps: Set<string> = new Set();

  constructor(initial = "") {
    this.text = initial;
  }

  /**
   * Apply an operation if it hasn't been applied before.
   * Returns the updated document text.
   */
  apply(op: CRDTOperation): string {
    if (this.appliedOps.has(op.id)) {
      // Operation already applied – ignore to keep state consistent
      return this.text;
    }

    if (op.type === "insert") {
      this.text =
        this.text.slice(0, op.position) + op.value + this.text.slice(op.position);
    } else if (op.type === "delete") {
      this.text =
        this.text.slice(0, op.position) + this.text.slice(op.position + op.length);
    }

    this.appliedOps.add(op.id);
    return this.text;
  }

  /**
   * Retrieve the current document state.
   */
  getState(): string {
    return this.text;
  }
}
