import { Operation } from '../types';

/**
 * Apply a CRDT operation to a plain string state.
 * This is a minimal implementation sufficient for the editor's needs.
 */
export function applyCRDT(state: string, op: Operation): string {
  if (op.type === 'insert') {
    return state.slice(0, op.position) + op.text + state.slice(op.position);
  }
  if (op.type === 'delete') {
    return state.slice(0, op.position) + state.slice(op.position + op.length);
  }
  return state;
}
