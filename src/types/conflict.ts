export type Operation =
  | { type: 'insert'; index: number; text: string }
  | { type: 'delete'; index: number; length: number };

export interface ConflictResolver {
  /**
   * Apply an operation to the given document string and return the new document.
   */
  applyOperation(doc: string, op: Operation): string;

  /**
   * Transform opA against opB using Operational Transformation rules.
   * Returns a new operation that can be applied after opB.
   */
  transform(opA: Operation, opB: Operation): Operation;
}
