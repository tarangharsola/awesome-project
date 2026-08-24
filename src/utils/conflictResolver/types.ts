export interface DocumentChange {
  version: number;
  ops: Array<InsertOp | DeleteOp>;
}

export interface InsertOp {
  type: 'insert';
  index: number;
  text: string;
}

export interface DeleteOp {
  type: 'delete';
  index: number;
  length: number;
}

export interface ConflictResolverOptions {
  initialContent?: string;
}