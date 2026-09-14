import { ConflictOperation } from '../types/conflict';
import applyCRDT from '../utils/conflict/strategies/crdt';

/**
 * Hook that encapsulates CRDT‑based conflict resolution.
 * It maintains an internal document string and applies incoming operations
 * using the CRDT strategy implementation.
 */
export const useCRDT = (initialDoc: string) => {
  let doc = initialDoc;

  const applyOperation = (op: ConflictOperation): string => {
    doc = applyCRDT(doc, op);
    return doc;
  };

  const getDocument = (): string => doc;

  return { applyOperation, getDocument };
};
