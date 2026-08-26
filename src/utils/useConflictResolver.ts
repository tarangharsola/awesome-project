import * as Y from 'yjs';

// Singleton Y.Doc for the whole application
let ydoc: Y.Doc | null = null;

/**
 * Initialize (or retrieve) the shared Y.Doc instance.
 * This should be called once per page load.
 */
export const getYDoc = (): Y.Doc => {
  if (!ydoc) {
    ydoc = new Y.Doc();
  }
  return ydoc;
};

/**
 * Retrieve the shared Y.Text type used by the editor.
 * The default name "codemirror" matches the binding used in the editor component.
 */
export const getYText = (name = 'codemirror'): Y.Text => {
  const doc = getYDoc();
  return doc.getText(name);
};

/**
 * Apply a local change coming from the editor to the Y.Text.
 * The `delta` format follows CodeMirror's transaction delta structure.
 */
export const applyLocalDelta = (delta: Array<{ insert?: string; delete?: number; retain?: number; from?: number }>) => {
  const ytext = getYText();
  ydoc?.transact(() => {
    delta.forEach(op => {
      if (op.insert) {
        // Insert at the current cursor position (assumed to be `op.from`)
        const index = op.from ?? ytext.length;
        ytext.insert(index, op.insert);
      } else if (op.delete) {
        const index = op.from ?? 0;
        ytext.delete(index, op.delete);
      }
      // `retain` does not modify the document; it only moves the cursor.
    });
  });
};

/**
 * Subscribe to remote changes on the Y.Text.
 * The callback receives the full updated text content.
 */
export const onRemoteChange = (callback: (text: string) => void) => {
  const ytext = getYText();
  ytext.observe(() => {
    callback(ytext.toString());
  });
};
