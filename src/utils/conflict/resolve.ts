import { Operation, DocumentState } from '../../types/conflict';

/**
 * Insert text into a string at a given index.
 */
function insertAt(source: string, index: number, value: string): string {
  return source.slice(0, index) + value + source.slice(index);
}

/**
 * Delete a range of characters from a string.
 */
function deleteAt(source: string, index: number, length: number): string {
  return source.slice(0, index) + source.slice(index + length);
}

/**
 * Transform an incoming operation against a previously applied operation.
 * This simple transformation shifts the index of the incoming operation
 * based on the effect of the prior operation.
 */
export function transform(op: Operation, prior: Operation): Operation {
  const transformed = { ...op };
  if (prior.id === op.id) return transformed; // same operation, no change

  // If prior operation inserted before the incoming index, shift forward
  if (prior.insert && prior.index <= op.index) {
    transformed.index += prior.insert.length;
  }

  // If prior operation deleted before the incoming index, shift backward
  if (prior.deleteLength && prior.index < op.index) {
    const shift = Math.min(prior.deleteLength, op.index - prior.index);
    transformed.index -= shift;
  }

  return transformed;
}

/**
 * Apply a single operation to the document state, handling transformation
 * against the existing history to maintain consistency.
 */
export function applyOperation(state: DocumentState, op: Operation): DocumentState {
  let transformedOp = { ...op };
  // Transform against all prior ops in chronological order
  for (const prior of state.history) {
    transformedOp = transform(transformedOp, prior);
  }

  let newContent = state.content;
  if (transformedOp.insert) {
    newContent = insertAt(newContent, transformedOp.index, transformedOp.insert);
  } else if (transformedOp.deleteLength) {
    newContent = deleteAt(newContent, transformedOp.index, transformedOp.deleteLength);
  }

  return {
    content: newContent,
    history: [...state.history, transformedOp]
  };
}

/**
 * Merge a batch of operations into the current state. Operations are applied
 * sequentially after being transformed against the accumulated history.
 */
export function mergeBatch(state: DocumentState, ops: Operation[]): DocumentState {
  let newState = { ...state };
  for (const op of ops) {
    newState = applyOperation(newState, op);
  }
  return newState;
}
