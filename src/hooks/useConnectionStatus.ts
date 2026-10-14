import { useWebSocket, ConnectionStatus } from "./useWebSocket";
import { useCallback } from "react";

/**
 * Higher‑level hook that provides connection status for the collaboration layer.
 * It wraps useWebSocket and exposes a safe send function that only transmits
 * when the socket is fully connected.
 */
export const useConnectionStatus = (url: string) => {
  const { status, send, reconnect, disconnect } = useWebSocket({
    url,
    onMessage: () => {}, // Message handling is delegated to other hooks
  });

  const safeSend = useCallback(
    (msg: unknown) => {
      if (status === "connected") {
        send(JSON.stringify(msg));
      }
    },
    [status, send]
  );

  return {
    status: status as ConnectionStatus,
    send: safeSend,
    reconnect,
    disconnect,
  };
};