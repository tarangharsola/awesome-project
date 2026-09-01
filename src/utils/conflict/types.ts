export interface TextOperation {
  /** Zero‑based index in the document where the operation applies */
  index: number;
  /** Text to insert. If omitted the operation is a deletion */
  insert?: string;
  /** Number of characters to delete. Ignored when `insert` is present */
  deleteCount?: number;
}

/**
 * Union type for all supported conflict‑resolution operations.
 * Currently only plain text operations are used, but the type can be
 * extended to support richer structures (e.g., rich‑text, JSON).
 */
export type ConflictOperation = TextOperation;
