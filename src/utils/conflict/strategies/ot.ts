import { Operation, TransformResult } from '../types';

/**
 * Simple character‑level Operational Transformation (OT) implementation.
 * Handles basic insert/insert and delete/delete scenarios.
 */
export function transform(opA: Operation, opB: Operation): TransformResult {
  // Insert vs Insert
  if (opA.type === 'insert' && opB.type === 'insert') {
    if (opA.position <= opB.position) {
      return { ...opA };
    }
    return { ...opA, position: opA.position + opB.text.length };
  }

  // Delete vs Delete (non‑overlapping)
  if (opA.type === 'delete' && opB.type === 'delete') {
    if (opA.position >= opB.position + opB.length) {
      return { ...opA, position: opA.position - opB.length };
    }
    // Overlapping deletes – resolve to a no‑op for simplicity
    return { type: 'noop' } as any;
  }

  // Insert vs Delete and other combos are omitted for brevity but can be added as needed.
  return opA as any;
}
