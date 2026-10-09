import { crdtApply } from './strategies/crdt';

/**
 * Resolve a set of CRDT operations against the current document content.
 * The function is deliberately tiny – it delegates all heavy lifting to the
 * selected strategy (currently CRDT). This keeps the public API stable while
 * allowing future strategies to be swapped in without touching callers.
 */
export function resolveChange(currentContent: string, ops: any[]): string {
  return crdtApply(currentContent, ops);
}
