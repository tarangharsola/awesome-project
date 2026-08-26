import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { getYDoc } from './useConflictResolver';

let provider: WebsocketProvider | null = null;

/**
 * Initialise the Yjs WebSocket provider for a given room.
 * `onStatusChange` is called with "connected" or "disconnected".
 */
export const initWebSocket = (roomId: string, onStatusChange: (status: string) => void) => {
  const doc = getYDoc();
  // Use the same host for the signalling server; adjust path if needed.
  const wsUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/yjs`;
  provider = new WebsocketProvider(wsUrl, roomId, doc);

  provider.on('status', (event: { status: string }) => {
    onStatusChange(event.status);
  });

  // The provider automatically handles reconnection, but we expose the event for UI feedback.
  provider.on('connection-close', () => {
    onStatusChange('disconnected');
  });
};

/**
 * Retrieve the current provider instance (may be null before initialisation).
 */
export const getProvider = (): WebsocketProvider | null => provider;
