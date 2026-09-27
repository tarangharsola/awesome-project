import { applyOperationOT } from './conflict/strategies/ot';
import { applyOperationCRDT } from './conflict/strategies/crdt';
import { EditorOperation } from '../types/editor';

export const applyRemoteOperation = (op: EditorOperation) => {
  try {
    applyOperationOT(op);
  } catch (e) {
    // If OT fails (e.g., due to out‑of‑order ops), fall back to CRDT merge
    console.warn('Operational Transform failed, falling back to CRDT', e);
    applyOperationCRDT(op);
  }
};
