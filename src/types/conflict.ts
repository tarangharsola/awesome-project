export type ConflictStrategy = "crdt" | "ot";

export interface ConflictResolver {
  /**
   * Resolve a conflict between a local and a remote string using the chosen strategy.
   */
  resolve(local: string, remote: string, strategy: ConflictStrategy): string;
}
