import { ConflictOperation } from '../types/conflict';
import applyOT from '../utils/conflict/strategies/ot';

/**
 * Hook that encapsulates Operational Transformation‑based conflict resolution.
 * It mirrors the API of useCRDT for interchangeable usage.
 */
export const useOT = (initialDoc: string) => {
  let doc = initialDoc;

  const applyOperation = (op: ConflictOperation): string => {
    doc = applyOT(doc, op);
    return doc;
  };

  const getDocument = (): string => doc;

  return { applyOperation, getDocument };
};
