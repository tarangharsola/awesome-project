import { TextCRDT } from './conflict/strategies/crdt';
import { applyOTOperation } from './conflict/strategies/ot';
import { EditorState } from '../types/editor';

/**
 * Resolve incoming remote operation using CRDT as the primary strategy.
 * If the operation format matches CRDT, apply directly. Otherwise, fall back
 * to Operational Transformation (OT) for backward compatibility.
 */
export const applyRemoteOperation = (
  getState: (s: any) => string,
  operation: any
): string => {
  // Assume we have a singleton CRDT per session stored on window (simple for demo)
  const siteId = (window as any).__crdtSiteId || 'unknown';
  if (!(window as any).__crdtInstance) {
    (window as any).__crdtInstance = new TextCRDT(siteId, getState(null));
  }
  const crdt: TextCRDT = (window as any).__crdtInstance;

  if (operation && (operation.type === 'insert' || operation.type === 'delete')) {
    crdt.applyRemote(operation);
    return crdt.value();
  }

  // Fallback to OT if operation shape differs
  const current = getState(null);
  const newContent = applyOTOperation(current, operation);
  // Re‑initialize CRDT with the new content to keep both in sync
  (window as any).__crdtInstance = new TextCRDT(siteId, newContent);
  return newContent;
};
