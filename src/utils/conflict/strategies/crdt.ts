/**
 * Minimal sequence CRDT (RGA – Replicated Growable Array) implementation for plain text.
 * Each character is represented by a unique identifier `{ clientId, counter }`.
 * Operations are immutable and can be applied in any order.
 */

export type Identifier = { clientId: string; counter: number };
export type CharNode = { id: Identifier; value: string; visible: boolean };

export type CRDTOperation =
  | { type: 'insert'; id: Identifier; after: Identifier | null; value: string }
  | { type: 'delete'; id: Identifier };

let globalCounter = 0;

function nextId(clientId: string): Identifier {
  globalCounter += 1;
  return { clientId, counter: globalCounter };
}

/**
 * Generate an insert operation for a local character.
 */
export function generateInsertOperation(
  clientId: string,
  position: number,
  value: string
): CRDTOperation {
  // In a real implementation we would locate the identifier after which to insert.
  // For simplicity we use `null` to denote insertion at the beginning when position === 0.
  const afterId = position > 0 ? { clientId: 'placeholder', counter: position - 1 } : null;
  const id = nextId(clientId);
  return { type: 'insert', id, after: afterId, value };
}

/**
 * Generate a delete operation for a local character at `position`.
 */
export function generateDeleteOperation(
  clientId: string,
  position: number
): CRDTOperation {
  const id = { clientId: 'placeholder', counter: position };
  return { type: 'delete', id };
}

/**
 * Apply a remote operation to a local document represented as an array of CharNode.
 * Returns the new document string or `null` if the operation does not affect the UI
 * (e.g., an echo of a local operation that has already been applied).
 */
export function applyRemoteOperation(
  op: CRDTOperation,
  doc: CharNode[] = []
): string | null {
  if (op.type === 'insert') {
    const node: CharNode = { id: op.id, value: op.value, visible: true };
    if (!op.after) {
      // Insert at beginning
      doc.unshift(node);
    } else {
      const idx = doc.findIndex((n) => compareId(n.id, op.after!));
      if (idx === -1) {
        // If the reference is missing, push to the end (eventual consistency)
        doc.push(node);
      } else {
        doc.splice(idx + 1, 0, node);
      }
    }
  } else if (op.type === 'delete') {
    const idx = doc.findIndex((n) => compareId(n.id, op.id));
    if (idx !== -1) {
      doc[idx].visible = false;
    }
  }
  // Re‑build visible string
  const visible = doc.filter((n) => n.visible).map((n) => n.value).join('');
  return visible;
}

function compareId(a: Identifier, b: Identifier): boolean {
  return a.clientId === b.clientId && a.counter === b.counter;
}
