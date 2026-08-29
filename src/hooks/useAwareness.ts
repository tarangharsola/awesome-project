import { useEffect, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { useWebSocket } from "./useWebSocket";

export interface AwarenessUser {
  id: string;
  name: string;
  color: string;
}

/**
 * Hook that sets up Yjs awareness for a collaborative session.
 * It ensures that user presence is broadcast and cleaned up on disconnect.
 */
export function useAwareness(
  doc: Y.Doc,
  roomId: string,
  localUser: AwarenessUser,
  wsUrl: string
) {
  const providerRef = useRef<WebsocketProvider | null>(null);

  useEffect(() => {
    const provider = new WebsocketProvider(wsUrl, roomId, doc, {
      // Use a dedicated awareness instance to avoid conflicts with other providers
      awareness: new Y.Awareness(doc),
    });
    providerRef.current = provider;

    // Set the local user's awareness state
    provider.awareness.setLocalStateField("user", localUser);

    // Clean up on component unmount
    return () => {
      provider.awareness.setLocalStateField("user", null);
      provider.disconnect();
    };
  }, [doc, roomId, wsUrl, localUser]);

  // Return the awareness instance for UI components to subscribe to changes
  return providerRef.current?.awareness;
}
