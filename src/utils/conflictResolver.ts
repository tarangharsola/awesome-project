import { DocumentState, Operation, ConflictResolver } from '../types/conflict';
import { applyOperation, mergeBatch } from './conflict/resolve';

/**
 * Simple wrapper class exposing conflict‑resolution methods used throughout the
 * application. It delegates the heavy lifting to the pure functions in
 * `conflict/resolve.ts`, keeping the public API stable while allowing the
 * underlying implementation to evolve independently.
 */
export class SimpleConflictResolver implements ConflictResolver {
  /**
   * Apply a remote operation to the current document state.
   * Returns a new immutable state object.
   */
  applyRemote(state: DocumentState, op: Operation): DocumentState {
    return applyOperation(state, op);
  }

  /**
   * Merge a batch of operations (e.g., after reconnection) into the current state.
   */
  mergeBatch(state: DocumentState, ops: Operation[]): DocumentState {
    return mergeBatch(state, ops);
  }
}

// Export a singleton for convenience; most callers only need one resolver.
export const conflictResolver = new SimpleConflictResolver();
