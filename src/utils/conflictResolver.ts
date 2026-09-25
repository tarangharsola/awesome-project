import { applyCRDTOperation } from './conflict/strategies/crdt';
import { applyOTOperation } from './conflict/strategies/ot';
import { ConflictStrategy } from './conflict/types';

type Resolver = {
  applyLocal: (op: any) => any;
  applyRemote: (op: any) => any;
};

export const useConflictResolver = (
  strategy: ConflictStrategy = 'crdt'
): Resolver => {
  const applyLocal = (op: any) => {
    // Local operations are sent unchanged; merging happens on remote side.
    return op;
  };

  const applyRemote = (op: any) => {
    try {
      if (strategy === 'crdt') {
        return applyCRDTOperation(op);
      }
      return applyOTOperation(op);
    } catch (e) {
      // If CRDT fails, fall back to OT to keep collaboration alive.
      console.error('CRDT apply failed, falling back to OT', e);
      return applyOTOperation(op);
    }
  };

  return { applyLocal, applyRemote };
};