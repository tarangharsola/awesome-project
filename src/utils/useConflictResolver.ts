import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { useEffect, useRef } from 'react';

/**
 * Hook that sets up a Yjs document and WebSocket provider for a given room.
 * It ensures conflict‑free collaborative editing and notifies the caller on
 * document updates.
 */
export const useConflictResolver = (
  roomId: string,
  onUpdate: (doc: Y.Doc) => void
) => {
  const ydocRef = useRef<Y.Doc>();
  const providerRef = useRef<WebsocketProvider>();

  useEffect(() => {
    // Initialise Yjs document
    const ydoc = new Y.Doc();
    ydocRef.current = ydoc;

    // Build WebSocket URL – fallback to same origin if env var not set
    const wsBase = process.env.REACT_APP_WS_URL || `${window.location.protocol.replace('http', 'ws')}//${window.location.host}`;
    const wsUrl = `${wsBase}/room/${roomId}`;

    // Initialise Yjs WebSocket provider
    const provider = new WebsocketProvider(wsUrl, roomId, ydoc);
    providerRef.current = provider;

    // Forward Yjs updates to the consumer (ignore local origin to avoid loops)
    const handleYUpdate = (update: Uint8Array, origin: any) => {
      if (origin !== provider) {
        onUpdate(ydoc);
      }
    };
    ydoc.on('update', handleYUpdate);

    // Cleanup on unmount or room change
    return () => {
      ydoc.off('update', handleYUpdate);
      provider.disconnect();
      ydoc.destroy();
    };
  }, [roomId, onUpdate]);

  const getYDoc = () => ydocRef.current;
  const getProvider = () => providerRef.current;

  return { getYDoc, getProvider };
};