import { Operation, ConflictResolutionResult, ConflictStrategy } from './conflict/types';
import { resolveWithCRDT, resolveWithOT } from './conflict/strategies';

export enum Strategy {
  CRDT = 'CRDT',
  OT = 'OT',
}

export const resolveConflicts = (
  localOps: Operation[],
  remoteOps: Operation[],
  baseVersion: number,
  strategy: Strategy = Strategy.CRDT
): ConflictResolutionResult => {
  const resolver: ConflictStrategy =
    strategy === Strategy.OT ? resolveWithOT : resolveWithCRDT;
  return resolver(localOps, remoteOps, baseVersion);
};
