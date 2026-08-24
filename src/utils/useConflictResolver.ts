import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

/**
 * Creates a Yjs document bound to a WebSocket provider for real‑time collaboration.
 * @param roomId Unique identifier for the collaborative session.
 * @param wsUrl  WebSocket server URL (e.g., ws://localhost:1234).
 * @returns An object containing the Y.Doc, the shared Y.Text, and the provider.
 */
export const createCollabDoc = (roomId: string, wsUrl: string) => {
  const doc = new Y.Doc();
  const provider = new WebsocketProvider(wsUrl, roomId, doc);
  const yText = doc.getText('codemirror');

  // Log connection status for debugging.
  provider.on('status', (event: { status: string }) => {
    console.log(`WebSocket connection status: ${event.status}`);
  });

  return { doc, yText, provider };
};

/**
 * Apply a local change (delta) to the shared Y.Text.
 * The delta format follows CodeMirror's transaction delta.
 */
export const applyLocalDelta = (yText: Y.Text, delta: any) => {
  // Y.Text.applyDelta expects an array of insert/delete/retain ops.
  // Directly forward the delta; callers must ensure correct format.
  yText.applyDelta(delta);
};

/**
 * Subscribe to remote changes on the shared Y.Text.
 * The callback receives the full updated text.
 */
export const onRemoteChange = (yText: Y.Text, callback: (text: string) => void) => {
  const observer = () => {
    callback(yText.toString());
  };
  yText.observe(observer);
  return () => yText.unobserve(observer);
};

/**
 * Retrieve the current text content from the shared Y.Text.
 */
export const getCurrentText = (yText: Y.Text) => yText.toString();

/**
 * Access the awareness API provided by y‑websocket.
 * Allows broadcasting user metadata (name, color, cursor).
 */
export const getAwareness = (provider: WebsocketProvider) => provider.awareness;
