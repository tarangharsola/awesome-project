import { Operation, ConflictResolver } from '../../types/conflict';

/**
 * Simple Operational Transformation (OT) strategy for plain text.
 * This implementation handles only insert and delete operations and
 * resolves conflicts based on index positions.
 */
export const otStrategy: ConflictResolver = {
  applyOperation(doc: string, op: Operation): string {
    switch (op.type) {
      case 'insert':
        return doc.slice(0, op.index) + op.text + doc.slice(op.index);
      case 'delete':
        return doc.slice(0, op.index) + doc.slice(op.index + op.length);
    }
  },

  transform(opA: Operation, opB: Operation): Operation {
    // If operations are on different sides, they don't affect each other.
    if (opA.type === 'insert' && opB.type === 'insert') {
      if (opA.index <= opB.index) return opA;
      return { ...opA, index: opA.index + opB.text.length };
    }
    if (opA.type === 'delete' && opB.type === 'delete') {
      if (opA.index >= opB.index + opB.length) return opA;
      if (opA.index + opA.length <= opB.index) return opA;
      // Overlapping deletes – simplify by removing the overlapping part.
      const start = Math.min(opA.index, opB.index);
      const end = Math.max(opA.index + opA.length, opB.index + opB.length);
      return { type: 'delete', index: start, length: end - start };
    }
    if (opA.type === 'insert' && opB.type === 'delete') {
      if (opA.index <= opB.index) return opA;
      if (opA.index >= opB.index + opB.length) return { ...opA, index: opA.index - opB.length };
      // Insert inside a region that was deleted – move it to the delete start.
      return { ...opA, index: opB.index };
    }
    if (opA.type === 'delete' && opB.type === 'insert') {
      if (opA.index >= opB.index) return { ...opA, index: opA.index + opB.text.length };
      return opA;
    }
    return opA; // Fallback – should never reach here.
  }
};
