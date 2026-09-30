// src/utils/conflict/strategies/crdt.ts
import { Operation } from '../../types/conflict';

export interface CRDTOperation extends Operation {
  id: string; // unique identifier for the operation
  siteId: string; // client identifier
  seq: number; // per-site sequence number
}

/**
 * Simple sequence CRDT (RGA) for text.
 * The document is represented as an array of characters with unique IDs.
 */
export class CRDT {
  private siteId: string;
  private seq: number;
  private chars: Map<string, string>; // id -> char
  private order: string[]; // ordered list of ids

  constructor(siteId: string) {
    this.siteId = siteId;
    this.seq = 0;
    this.chars = new Map();
    this.order = [];
  }

  /** Generate a local insert operation */
  localInsert(index: number, value: string): CRDTOperation {
    const id = `${this.siteId}-${++this.seq}`;
    const op: CRDTOperation = {
      type: 'insert',
      index,
      value,
      id,
      siteId: this.siteId,
      seq: this.seq,
    };
    this.apply(op);
    return op;
  }

  /** Generate a local delete operation */
  localDelete(index: number, length: number): CRDTOperation {
    const id = `${this.siteId}-${++this.seq}`;
    const op: CRDTOperation = {
      type: 'delete',
      index,
      length,
      id,
      siteId: this.siteId,
      seq: this.seq,
    };
    this.apply(op);
    return op;
  }

  /** Apply an operation (local or remote) */
  apply(op: CRDTOperation) {
    if (op.type === 'insert') {
      const { index, value, id } = op;
      // Insert characters one by one with unique ids
      for (let i = 0; i < value.length; i++) {
        const charId = `${id}-${i}`;
        this.chars.set(charId, value[i]);
        this.order.splice(index + i, 0, charId);
      }
    } else if (op.type === 'delete') {
      const { index, length } = op;
      const removed = this.order.splice(index, length);
      removed.forEach((charId) => this.chars.delete(charId));
    }
  }

  /** Get the current plain text */
  getText(): string {
    return this.order.map((id) => this.chars.get(id) ?? '').join('');
  }

  /** Integrate a remote operation, ensuring idempotence */
  integrate(op: CRDTOperation) {
    // If operation already applied, ignore
    if (this.order.includes(op.id)) {
      return;
    }
    this.apply(op);
  }
}
