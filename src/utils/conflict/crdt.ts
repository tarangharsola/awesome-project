/**
 * Simple CRDT implementation for collaborative text editing.
 * It ensures idempotent application of operations by tracking operation IDs.
 */

export interface TextOperation {
  id: string; // globally unique identifier (e.g., UUID)
  type: 'insert' | 'delete';
  index: number;
  text?: string; // present for insert
  length?: number; // present for delete
}

export class TextCRDT {
  private content: string = '';
  private appliedOps: Set<string> = new Set();

  constructor(initial = '') {
    this.content = initial;
  }

  /**
   * Apply an operation if it hasn't been applied before.
   */
  public apply(op: TextOperation): void {
    if (this.appliedOps.has(op.id)) {
      // Duplicate operation – ignore to keep state consistent
      return;
    }
    if (op.type === 'insert' && op.text !== undefined) {
      this.content =
        this.content.slice(0, op.index) + op.text + this.content.slice(op.index);
    } else if (op.type === 'delete' && op.length !== undefined) {
      this.content =
        this.content.slice(0, op.index) + this.content.slice(op.index + op.length);
    } else {
      console.warn('Invalid operation', op);
    }
    this.appliedOps.add(op.id);
  }

  public getValue(): string {
    return this.content;
  }

  /**
   * Generate a new operation for local edits. Caller must ensure the generated
   * ID is globally unique (e.g., using crypto.randomUUID()).
   */
  public createInsert(id: string, index: number, text: string): TextOperation {
    return { id, type: 'insert', index, text };
  }

  public createDelete(id: string, index: number, length: number): TextOperation {
    return { id, type: 'delete', index, length };
  }
}
