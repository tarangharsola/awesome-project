import { CRDTStrategy } from './strategies/crdt';
import { OTStrategy } from './strategies/ot';
import { ConflictStrategy } from './types';

export const resolveConflict = (
  local: string,
  remote: string,
  strategy: ConflictStrategy = 'crdt'
): string => {
  if (strategy === 'crdt') {
    const crdt = new CRDTStrategy();
    return crdt.apply(local, remote);
  }
  const ot = new OTStrategy();
  return ot.transform(local, remote);
};
