import { ConflictStrategy, ConflictOperation } from '../types/conflict';
import { useCRDT } from './useCRDT';
import { useOT } from './useOT';

/**
 * Central hook that selects a conflict‑resolution strategy (CRDT or OT)
 * and delegates operation handling to the corresponding specialized hook.
 */
export const useConflictResolver = (
  strategy: ConflictStrategy,
  initialDoc: string
) => {
  // Initialise both resolvers once; the unused one remains idle.
  const crdtResolver = useCRDT(initialDoc);
  const otResolver = useOT(initialDoc);

  const resolverMap = {
    [ConflictStrategy.CRDT]: crdtResolver,
    [ConflictStrategy.OT]: otResolver,
  } as const;

  const activeResolver = resolverMap[strategy];

  const applyOperation = (op: ConflictOperation) =>
    activeResolver.applyOperation(op);

  const getDocument = () => activeResolver.getDocument();

  return { applyOperation, getDocument };
};
