import { OT } from './conflict/ot'
import { CRDT } from './conflict/crdt'
import { TextOperation } from '../types/conflict'

/**
 * Centralised conflict resolver used by the editor hook.
 * It currently prefers OT for transformation and CRDT for state storage.
 */
export class ConflictResolver {
  private crdt: CRDT

  constructor(initialDoc: string = '') {
    this.crdt = new CRDT(initialDoc)
  }

  /** Apply a remote operation after transforming it against local pending ops. */
  applyRemote(op: TextOperation, pendingOps: TextOperation[]): string {
    let transformed = op
    for (const localOp of pendingOps) {
      transformed = OT.transform(localOp, transformed)
    }
    return this.crdt.apply(transformed)
  }

  /** Apply a local operation immediately and store it for later transformation. */
  applyLocal(op: TextOperation): string {
    // Local ops are applied directly to the CRDT state.
    return this.crdt.apply(op)
  }

  getDocument(): string {
    return this.crdt.getDocument()
  }
}
