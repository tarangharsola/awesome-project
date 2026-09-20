import type { CRDTOperation, OTOperation } from '../../types/conflict';
import type { EditorState } from '../../types/editor';

type Strategy = 'crdt' | 'ot';

export function resolveConflict(
  state: EditorState,
  operation: CRDTOperation | OTOperation,
  strategy: Strategy = 'crdt'
): EditorState {
  if (strategy === 'crdt') {
    const op = operation as CRDTOperation;
    return applyCRDTOperation(state, op);
  } else {
    const op = operation as OTOperation;
    return applyOTOperation(state, op);
  }
}

function applyCRDTOperation(state: EditorState, op: CRDTOperation): EditorState {
  const { content } = state;
  if (op.type === 'insert' && op.text) {
    const before = content.slice(0, op.position);
    const after = content.slice(op.position);
    return { ...state, content: before + op.text + after };
  }
  if (op.type === 'delete' && op.length) {
    const before = content.slice(0, op.position);
    const after = content.slice(op.position + op.length);
    return { ...state, content: before + after };
  }
  return state;
}

function applyOTOperation(state: EditorState, op: OTOperation): EditorState {
  // Reuse CRDT logic as OT operations share the same shape for this simplified resolver
  return applyCRDTOperation(state, op as unknown as CRDTOperation);
}
