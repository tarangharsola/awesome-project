import type { Operation } from '../types/conflict';
import type { DocumentState } from '../types/editor';
import { applyCRDT } from './conflict/strategies/crdt';
import { applyOT } from './conflict/strategies/ot';

/**
 * Attempts to apply an operation using the preferred strategy. If the operation
 * throws, it falls back to the alternative strategy to keep the document in a
 * consistent state.
 */
export function resolveOperation(
  operation: Operation,
  doc: DocumentState,
  preferred: 'crdt' | 'ot' = 'crdt'
): DocumentState {
  try {
    if (preferred === 'crdt') {
      return applyCRDT(operation, doc);
    }
    return applyOT(operation, doc);
  } catch (e) {
    console.warn('Preferred conflict strategy failed, falling back:', e);
    // Fallback to the other strategy
    try {
      if (preferred === 'crdt') {
        return applyOT(operation, doc);
      }
      return applyCRDT(operation, doc);
    } catch (fallbackError) {
      console.error('Both conflict strategies failed', fallbackError);
      // As a last resort, return the original document unchanged to avoid
      // corrupting the shared state.
      return doc;
    }
  }
}
