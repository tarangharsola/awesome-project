/**
 * Simple sequence CRDT (RGA – Replicated Growable Array) implementation.
 * Each character is stored with a globally unique identifier (siteId, counter).
 * Operations are insert or delete referencing the identifier of the preceding
 * character (or null for the beginning of the document).
 */

type SiteId = string;
interface CharId {
  site: SiteId;
  counter: number;
}
interface CharNode {
  id: CharId;
  value: string;
  visible: boolean;
  prev: CharId | null;
}

export interface CRDTState {
  chars: Map<string, CharNode>; // key = `${site}:${counter}`
  head: CharId | null; // virtual head (null prev)
  siteId: SiteId;
  localCounter: number;
}

function idToString(id: CharId | null): string {
  return id ? `${id.site}:${id.counter}` : 'null';
}

export function createCRDT(siteId: SiteId): CRDTState {
  return {
    chars: new Map(),
    head: null,
    siteId,
    localCounter: 0,
  };
}

export function localInsert(state: CRDTState, value: string, afterId: CharId | null): CharId {
  const newId: CharId = { site: state.siteId, counter: ++state.localCounter };
  const node: CharNode = { id: newId, value, visible: true, prev: afterId };
  state.chars.set(idToString(newId), node);
  return newId;
}

export function localDelete(state: CRDTState, targetId: CharId): void {
  const key = idToString(targetId);
  const node = state.chars.get(key);
  if (node) node.visible = false;
}

export function remoteInsert(state: CRDTState, char: CharNode): void {
  const key = idToString(char.id);
  if (state.chars.has(key)) return; // idempotent
  state.chars.set(key, { ...char, visible: true });
}

export function remoteDelete(state: CRDTState, targetId: CharId): void {
  const key = idToString(targetId);
  const node = state.chars.get(key);
  if (node) node.visible = false;
}

/**
 * Convert the CRDT state into a plain string for rendering.
 */
export function render(state: CRDTState): string {
  // Build a linked list based on prev references.
  const order: CharNode[] = [];
  const visited = new Set<string>();
  const findNext = (prev: CharId | null): CharNode | undefined => {
    for (const node of state.chars.values()) {
      if (node.prev && idToString(node.prev) === idToString(prev) && !visited.has(idToString(node.id))) {
        return node;
      }
      if (!node.prev && prev === null && !visited.has(idToString(node.id))) {
        return node;
      }
    }
    return undefined;
  };
  let cursor: CharId | null = null;
  while (true) {
    const next = findNext(cursor);
    if (!next) break;
    visited.add(idToString(next.id));
    if (next.visible) order.push(next);
    cursor = next.id;
  }
  return order.map((n) => n.value).join('');
}
