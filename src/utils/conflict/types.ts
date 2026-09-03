export interface Operation {
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
}

export interface ConflictResolutionResult {
  operations: Operation[];
  version: number;
}

export type ConflictStrategy = (
  localOps: Operation[],
  remoteOps: Operation[],
  baseVersion: number
) => ConflictResolutionResult;
