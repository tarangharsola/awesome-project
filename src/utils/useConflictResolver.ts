import * as Y from "yjs";

/**
 * Creates a new Yjs document with a shared text type named "codemirror".
 * The returned `text` can be bound to any editor that supports plain text
 * insertion/deletion events.
 */
export function createYDoc() {
  const doc = new Y.Doc();
  const text = doc.getText("codemirror");
  return { doc, text };
}

/**
 * Applies a remote Yjs update to the supplied document. This function is safe
 * to call multiple times – Yjs internally deduplicates already‑applied updates.
 */
export function applyRemoteUpdate(doc: Y.Doc, update: Uint8Array) {
  Y.applyUpdate(doc, update);
}

/**
 * Serialises the current state of a Yjs document as an Uint8Array that can be
 * transmitted over the network.
 */
export function getUpdate(doc: Y.Doc): Uint8Array {
  return Y.encodeStateAsUpdate(doc);
}
