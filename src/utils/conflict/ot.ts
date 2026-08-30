import { TextOperation, InsertOperation, DeleteOperation } from '../../types/conflict'

/**
 * Simple Operational Transformation utilities for plain‑text editing.
 * Supports only insert and delete operations and assumes a linear document model.
 */
export class OT {
  /** Apply a single operation to the given document string. */
  static apply(doc: string, op: TextOperation): string {
    switch (op.type) {
      case 'insert':
        return doc.slice(0, op.index) + op.text + doc.slice(op.index)
      case 'delete':
        return doc.slice(0, op.index) + doc.slice(op.index + op.length)
    }
  }

  /** Transform opB against opA so that opB can be applied after opA. */
  static transform(opA: TextOperation, opB: TextOperation): TextOperation {
    if (opA.type === 'insert') {
      if (opB.type === 'insert') {
        if (opB.index > opA.index) {
          return { ...opB, index: opB.index + opA.text.length }
        }
        return opB
      }
      // opB is delete
      if (opB.index >= opA.index) {
        return { ...opB, index: opB.index + opA.text.length }
      }
      return opB
    }

    // opA is delete
    if (opB.type === 'insert') {
      if (opB.index > opA.index + opA.length) {
        return { ...opB, index: opB.index - opA.length }
      }
      if (opB.index >= opA.index) {
        return { ...opB, index: opA.index }
      }
      return opB
    }
    // both deletes
    if (opB.index >= opA.index + opA.length) {
      return { ...opB, index: opB.index - opA.length }
    }
    if (opB.index + opB.length <= opA.index) {
      return opB
    }
    // overlapping deletes – simplify by trimming the overlapping part
    const start = Math.min(opB.index, opA.index)
    const end = Math.max(opB.index + opB.length, opA.index + opA.length)
    const newLength = end - start - opA.length
    return { type: 'delete', index: start, length: newLength }
  }
}
