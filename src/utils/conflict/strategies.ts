import { Operation, ConflictResolutionResult, ConflictStrategy } from './types';

export const resolveWithCRDT: ConflictStrategy = (
  localOps,
  remoteOps,
  baseVersion
) => {
  // Simple placeholder CRDT merge: concatenate operations preserving order by position
  const merged = [...localOps, ...remoteOps].sort((a, b) => a.position - b.position);
  return { operations: merged, version: baseVersion + 1 };
};

export const resolveWithOT: ConflictStrategy = (
  localOps,
  remoteOps,
  baseVersion
) => {
  // Simple OT transform: apply remote ops then local ops adjusting positions
  const transformed: Operation[] = [];
  remoteOps.forEach(op => transformed.push(op));
  localOps.forEach(local => {
    let adjustedPos = local.position;
    remoteOps.forEach(remote => {
      if (remote.type === 'insert' && remote.position <= adjustedPos) {
        adjustedPos += remote.text?.length ?? 0;
      } else if (remote.type === 'delete' && remote.position < adjustedPos) {
        adjustedPos -= Math.min(remote.length ?? 0, adjustedPos - remote.position);
      }
    });
    transformed.push({ ...local, position: adjustedPos });
  });
  return { operations: transformed, version: baseVersion + 1 };
};
