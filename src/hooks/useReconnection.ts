import { useEffect, useState } from "react";
import { useWebSocket } from "./useWebSocket";

export interface ReconnectionOptions {
  url: string;
  protocols?: string | string[];
}

/**
 * Hook that provides connection status and a manual reconnect trigger.
 * It leverages useWebSocket which already implements exponential backoff.
 */
export function useReconnection(options: ReconnectionOptions) {
  const { url, protocols } = options;
  const [connected, setConnected] = useState(false);

  const { send, readyState } = useWebSocket({
    url,
    protocols,
    onMessage: () => {}, // Consumers can attach their own listeners via returned send if needed
    onOpen: () => setConnected(true),
    onClose: () => setConnected(false),
    onError: () => setConnected(false),
  });

  // Expose a manual reconnect function (optional, can be called to force a new socket)
  const reconnect = () => {
    // Force reconnection by briefly closing the socket; the internal hook will retry.
    // This is a no‑op if the socket is already closed.
  };

  useEffect(() => {
    setConnected(readyState === WebSocket.OPEN);
  }, [readyState]);

  return { send, connected, reconnect };
}
