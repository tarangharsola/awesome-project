import { applyCRDTUpdate, createCRDT } from './conflict/strategies/crdt';
import { applyOTUpdate, createOT } from './conflict/strategies/ot';
import type { DocumentState, Update } from '../types/editor';

/**
 * Resolve incoming updates using a primary CRDT strategy. If the CRDT
 * cannot apply the update (e.g., due to version mismatch), fall back to
 * the OT strategy. This hybrid approach maximizes consistency while
 * keeping latency low.
 */
export const resolveUpdate = (state: DocumentState, update: Update): DocumentState => {
  try {
    // Attempt CRDT merge first
    const crdt = createCRDT(state.content);
    const merged = applyCRDTUpdate(crdt, update);
    return { ...state, content: merged };
  } catch (crdtError) {
    console.warn('CRDT merge failed, falling back to OT', crdtError);
    try {
      const ot = createOT(state.content);
      const merged = applyOTUpdate(ot, update);
      return { ...state, content: merged };
    } catch (otError) {
      console.error('Both CRDT and OT failed to apply update', otError);
      // As a last resort, ignore the update to keep UI responsive.
      return state;
    }
  }
};
