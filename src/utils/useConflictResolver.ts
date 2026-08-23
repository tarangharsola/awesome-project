import { v4 as uuidv4 } from 'uuid';

export type Change = {
  id: string;
  clientId: string;
  timestamp: number;
  ops: any; // editor operations or full document string
};

export class ConflictResolver {
  private clientId: string;
  private pending: Change[] = [];
  private appliedIds = new Set<string>();
  private document: any;

  constructor(initialDoc: any, clientId?: string) {
    this.document = initialDoc;
    this.clientId = clientId ?? (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : uuidv4());
  }

  // Create a change from a local edit and apply it immediately
  createLocalChange(ops: any): Change {
    const change: Change = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : uuidv4(),
      clientId: this.clientId,
      timestamp: Date.now(),
      ops,
    };
    this.applyChange(change);
    return change;
  }

  // Apply any incoming change (local or remote) in timestamp order
  applyChange(change: Change) {
    if (this.appliedIds.has(change.id)) return;
    this.pending.push(change);
    this.pending.sort((a, b) => a.timestamp - b.timestamp);
    while (this.pending.length) {
      const next = this.pending[0];
      // In practice we apply as soon as it's the earliest pending change
      this.pending.shift();
      this.applyOps(next.ops);
      this.appliedIds.add(next.id);
    }
  }

  private applyOps(ops: any) {
    // Simple implementation: if ops is a string, replace the whole document.
    // Real editors would apply incremental deltas.
    if (typeof ops === 'string') {
      this.document = ops;
    }
  }

  getDocument() {
    return this.document;
  }

  getClientId() {
    return this.clientId;
  }
}
