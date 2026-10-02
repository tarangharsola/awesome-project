/**
 * Simple sequence‑based CRDT implementation for collaborative text editing.
 * Each operation carries a globally unique identifier (UUID) and a version vector
 * that enables deterministic merging of concurrent edits.
 */
import { Operation, CRDTState } from '../../types/conflict';

/** Generate a cryptographically‑secure UUID for operation IDs */
function generateId(): string {
  // Fallback for environments without crypto.randomUUID
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Simple UUID v4 fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Apply a remote operation to the local CRDT state.
 * The function is pure – it returns a new state without mutating the input.
 */
export function applyRemote(state: CRDTState, op: Operation): CRDTState {
  // If we already have this operation, ignore (idempotent)
  if (state.appliedOps.has(op.id)) {
    return state;
  }

  // Merge version vectors – keep the max for each site
  const newVersion = { ...state.version };
  for (const site in op.version) {
    newVersion[site] = Math.max(newVersion[site] ?? 0, op.version[site]);
  }

  // Apply the textual change – for simplicity we assume op.type is 'insert' or 'delete'
  let newContent = state.content;
  if (op.type === 'insert') {
    newContent =
      newContent.slice(0, op.position) + op.value + newContent.slice(op.position);
  } else if (op.type === 'delete') {
    newContent =
      newContent.slice(0, op.position) + newContent.slice(op.position + op.length);
  }

  const newApplied = new Set(state.appliedOps);
  newApplied.add(op.id);

  return {
    content: newContent,
    version: newVersion,
    appliedOps: newApplied,
  };
}

/**
 * Create a local operation ready to be broadcast.
 * It increments the local site version and attaches a fresh UUID.
 */
export function createLocalOp(
  state: CRDTState,
  type: 'insert' | 'delete',
  position: number,
  valueOrLength: string | number,
  siteId: string
) {
  const newVersion = { ...state.version };
  newVersion[siteId] = (newVersion[siteId] ?? 0) + 1;

  const op: Operation = {
    id: generateId(),
    type,
    position,
    siteId,
    version: newVersion,
    ...(type === 'insert'
      ? { value: valueOrLength as string }
      : { length: valueOrLength as number }),
  };

  return op;
}
