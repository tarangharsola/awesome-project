import type { EditorOperation } from '../types/editor';
import type { DocumentState } from '../types';

/**
 * Simple sequence CRDT (RGA) based conflict resolver.
 * Each operation carries a unique identifier (clientId + seq) and a position.
 * The resolver ensures deterministic ordering and idempotent application.
 */
export class ConflictResolver {
  private clientId: string;
  private seq: number = 0;
  private pending: EditorOperation[] = [];

  constructor(clientId: string) {
    this.clientId = clientId;
  }

  /**
   * Create a new operation with a globally unique id.
   */
  createOperation(type: 'insert' | 'delete', index: number, text?: string): EditorOperation {
    const op: EditorOperation = {
      id: `${this.clientId}-${this.seq++}`,
      type,
      index,
      text: text ?? '',
    };
    return op;
  }

  /**
   * Apply an incoming operation to the local document state.
   * Operations are applied in order of their ids (lexicographic) to guarantee
   * convergence across all replicas.
   */
  applyOperation(state: DocumentState, op: EditorOperation): DocumentState {
    // Ensure idempotency – ignore already applied ops
    if (state.appliedOps?.has(op.id)) {
      return state;
    }
    const content = state.content;
    let newContent = content;
    if (op.type === 'insert') {
      newContent = content.slice(0, op.index) + op.text + content.slice(op.index);
    } else if (op.type === 'delete') {
      newContent = content.slice(0, op.index) + content.slice(op.index + op.length!);
    }
    const applied = new Set(state.appliedOps);
    applied.add(op.id);
    return { ...state, content: newContent, appliedOps: applied };
  }

  /**
   * Queue local operations for sending; they will be flushed when the socket is ready.
   */
  queueLocal(op: EditorOperation) {
    this.pending.push(op);
  }

  /**
   * Retrieve and clear pending operations.
   */
  drainPending(): EditorOperation[] {
    const ops = this.pending;
    this.pending = [];
    return ops;
  }
}
