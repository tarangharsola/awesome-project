import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { Awareness } from 'y-protocols/awareness';

export interface Collaboration {
  doc: Y.Doc;
  provider: WebsocketProvider;
  yText: Y.Text;
  awareness: Awareness;
}

/**
 * Creates a Yjs based collaboration instance.
 * @param roomId Unique identifier for the collaborative session.
 * @param user Object containing user name and assigned color.
 */
export function createCollaboration(roomId: string, user: { name: string; color: string }): Collaboration {
  const doc = new Y.Doc();
  const wsEndpoint = import.meta.env.VITE_WS_ENDPOINT ?? 'ws://localhost:1234';
  const provider = new WebsocketProvider(wsEndpoint, roomId, doc, { connect: true });
  const awareness = provider.awareness;
  awareness.setLocalStateField('user', { name: user.name, color: user.color });

  const yText = doc.getText('codemirror');

  // Reconnection handling: automatically attempts to reconnect with backoff.
  provider.on('status', ({ status }: { status: string }) => {
    console.info(`WebSocket connection status: ${status}`);
  });

  return { doc, provider, yText, awareness };
}
