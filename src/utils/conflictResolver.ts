import * as Y from "yjs";

/**
 * Initializes a Yjs document with a shared text type.
 * Returns the Y.Doc and the shared Y.Text instance.
 */
export function initYDoc(): { doc: Y.Doc; text: Y.Text } {
  const doc = new Y.Doc();
  const text = doc.getText("shared");
  return { doc, text };
}

/**
 * Applies a local change to the shared Y.Text within a transaction.
 * The provided callback receives the Y.Text instance to perform edits.
 */
export function applyLocalChange(
  text: Y.Text,
  change: (t: Y.Text) => void
) {
  text.doc?.transact(() => {
    change(text);
  });
}

/**
 * Generates a binary update representing the current document state.
 * This payload can be sent over the WebSocket to other peers.
 */
export function generateUpdate(doc: Y.Doc): Uint8Array {
  return Y.encodeStateAsUpdate(doc);
}

/**
 * Applies a binary update received from a remote peer to the local Y.Doc.
 */
export function applyRemoteUpdate(doc: Y.Doc, update: Uint8Array) {
  Y.applyUpdate(doc, update);
}
