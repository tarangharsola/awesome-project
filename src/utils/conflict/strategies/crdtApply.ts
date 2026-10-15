import { CRDTOperation } from '../../types/collaborationMessage';

export function applyOperation(doc: string, op: CRDTOperation): string {
  if (op.insert) {
    const { index, text } = op.insert;
    return doc.slice(0, index) + text + doc.slice(index);
  }
  if (op.delete) {
    const { index, length } = op.delete;
    return doc.slice(0, index) + doc.slice(index + length);
  }
  return doc;
}
