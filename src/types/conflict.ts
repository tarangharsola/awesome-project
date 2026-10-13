export interface Operation {
  /** Unique identifier for the operation (e.g., UUID) */
  id: string;
  /** The user who performed the operation */
  userId: string;
  /** Position in the document where the operation applies */
  index: number;
  /** Text inserted (empty string for deletions) */
  insert?: string;
  /** Length of text removed (0 for insertions) */
  deleteLength?: number;
  /** Timestamp to aid ordering */
  timestamp: number;
}

export interface DocumentState {
  /** Current full text of the document */
  content: string;
  /** Ordered list of applied operations */
  history: Operation[];
}

export interface ConflictResolver {
  /** Apply a remote operation to the local document state */
  applyRemote(state: DocumentState, op: Operation): DocumentState;
  /** Merge a batch of operations (e.g., on reconnection) */
  mergeBatch(state: DocumentState, ops: Operation[]): DocumentState;
}
