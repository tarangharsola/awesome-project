import { CRDTStrategy } from '../utils/conflict/strategies/crdt';
import { OTStrategy } from '../utils/conflict/strategies/ot';
import { ConflictStrategy } from '../utils/conflict/types';

export type ResolveFn = (local: string, remote: string) => string;

export const createResolver = (strategy: ConflictStrategy = 'crdt'): ResolveFn => {
  if (strategy === 'crdt') {
    const crdt = new CRDTStrategy();
    return (local, remote) => crdt.apply(local, remote);
  }
  const ot = new OTStrategy();
  return (local, remote) => ot.transform(local, remote);
};
