import { useEffect, useRef, useCallback } from "react";
import { useConnectionStatusContext } from "../context/ConnectionStatusContext";

/**
 * Hook that manages a WebSocket connection with exponential backoff reconnection.
 * It updates the global connection status via ConnectionStatusContext.
 */
export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);
  const { setStatus } = useConnectionStatusContext();

  const maxDelay = 30000; // 30 seconds max backoff

  const connect = useCallback(() => {
    setStatus("reconnecting");
    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      reconnectAttemptsRef.current = 0;
      setStatus("connected");
    };

    wsRef.current.onclose = () => {
      setStatus("disconnected");
      scheduleReconnect();
    };

    wsRef.current.onerror = () => {
      // Close will trigger onclose which handles reconnection
      wsRef.current?.close();
    };
  }, [url, setStatus]);

  const scheduleReconnect = () => {
    const attempts = reconnectAttemptsRef.current + 1;
    reconnectAttemptsRef.current = attempts;
    const delay = Math.min(1000 * 2 ** attempts, maxDelay);
    timeoutRef.current = window.setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    }
  }, []);

  return { sendMessage, websocket: wsRef.current };
};
