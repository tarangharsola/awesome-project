import { CRDTDocument, CRDTOperation } from '../../../types/conflict';
import { generateId } from './crdtCoreHelpers';

/**
 * Create a fresh CRDT document.
 */
export function createDocument(): CRDTDocument {
  return { content: '', operations: [] };
}

/**
 * Apply a CRDT operation to a document, returning a new document instance.
 */
export function applyOperation(doc: CRDTDocument, op: CRDTOperation): CRDTDocument {
  const { type, position, text, length } = op;
  let newContent = doc.content;

  if (type === 'insert' && typeof text === 'string') {
    newContent = newContent.slice(0, position) + text + newContent.slice(position);
  } else if (type === 'delete' && typeof length === 'number') {
    newContent = newContent.slice(0, position) + newContent.slice(position + length);
  }

  return {
    ...doc,
    content: newContent,
    operations: [...doc.operations, op],
  };
}

/**
 * Generate a local insert operation and apply it.
 */
export function localInsert(
  doc: CRDTDocument,
  position: number,
  text: string,
  userId: string,
): [CRDTDocument, CRDTOperation] {
  const op: CRDTOperation = {
    type: 'insert',
    position,
    text,
    id: generateId(),
    userId,
  };
  const newDoc = applyOperation(doc, op);
  return [newDoc, op];
}

/**
 * Generate a local delete operation and apply it.
 */
export function localDelete(
  doc: CRDTDocument,
  position: number,
  length: number,
  userId: string,
): [CRDTDocument, CRDTOperation] {
  const op: CRDTOperation = {
    type: 'delete',
    position,
    length,
    id: generateId(),
    userId,
  };
  const newDoc = applyOperation(doc, op);
  return [newDoc, op];
}
