export enum ConflictStrategy {
  CRDT = 'CRDT',
  OT = 'OT'
}

export interface ConflictOperation {
  /**
   * The type of operation, e.g., 'insert', 'delete', 'replace'.
   */
  type: string;
  /**
   * Payload containing operation‑specific data.
   */
  payload: any;
  /**
   * Identifier of the user who originated the operation.
   */
  userId: string;
  /**
   * Unix timestamp (ms) when the operation was created.
   */
  timestamp: number;
}
