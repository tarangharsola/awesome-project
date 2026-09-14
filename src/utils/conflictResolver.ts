import { applyCRDT, applyOT } from './conflict/strategies';
import { ConflictStrategy } from '../types/conflict';
import { EditorOperation } from '../types/editor';

/**
 * Resolve a remote editing operation using the selected conflict strategy.
 * If the strategy throws, a full document sync is requested to recover
 * from an inconsistent state.
 */
export const resolveConflict = (
  strategy: ConflictStrategy,
  operation: EditorOperation,
  applyLocal: (op: EditorOperation) => void,
  requestFullSync: () => void,
) => {
  try {
    if (strategy === 'crdt') {
      const transformed = applyCRDT(operation);
      applyLocal(transformed);
    } else {
      const transformed = applyOT(operation);
      applyLocal(transformed);
    }
  } catch (e) {
    console.error('Conflict resolution failed', e);
    requestFullSync();
  }
};