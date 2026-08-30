import { TextOperation } from '../../types/conflict'

/**
 * Minimal CRDT wrapper that delegates to OT for now.
 * The interface mirrors a typical CRDT library so future replacement is trivial.
 */
export class CRDT {
  private doc: string = ''

  constructor(initial: string = '') {
    this.doc = initial
  }

  /** Apply an operation and return the new document state. */
  apply(op: TextOperation): string {
    // In a real CRDT we would merge based on identifiers; here we reuse OT logic.
    // This placeholder keeps the API stable while the OT implementation does the work.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { OT } = require('../conflict/ot') as typeof import('../conflict/ot')
    this.doc = OT.apply(this.doc, op)
    return this.doc
  }

  getDocument(): string {
    return this.doc
  }
}
