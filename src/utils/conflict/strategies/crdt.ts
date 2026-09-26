export interface CRDTOperation {
  id: string;
  pos: number;
  insert?: string;
  delete?: number;
}

export function crdtApply(text: string, op: CRDTOperation): string {
  if (op.insert) {
    return text.slice(0, op.pos) + op.insert + text.slice(op.pos);
  }
  if (op.delete) {
    return text.slice(0, op.pos) + text.slice(op.pos + op.delete);
  }
  return text;
}
