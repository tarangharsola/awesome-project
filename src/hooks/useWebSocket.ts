import { useEffect, useRef, useState, useCallback } from "react";

export type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface UseWebSocketOptions {
  url: string;
  protocols?: string | string[];
  onMessage?: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
}

export const useWebSocket = ({
  url,
  protocols,
  onMessage,
  onOpen,
  onClose,
  onError,
}: UseWebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const reconnectAttemptsRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  const clearTimeoutIfSet = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const connect = useCallback(() => {
    setStatus("reconnecting");
    const ws = new WebSocket(url, protocols);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus("connected");
      reconnectAttemptsRef.current = 0;
      onOpen?.();
    };

    ws.onmessage = (event) => {
      onMessage?.(event);
    };

    ws.onerror = (event) => {
      onError?.(event);
    };

    ws.onclose = () => {
      setStatus("disconnected");
      onClose?.();
      const attempts = reconnectAttemptsRef.current + 1;
      reconnectAttemptsRef.current = attempts;
      const delay = Math.min(1000 * 2 ** attempts, 30000); // exponential backoff up to 30s
      clearTimeoutIfSet();
      timeoutRef.current = window.setTimeout(() => {
        connect();
      }, delay);
    };
  }, [url, protocols, onMessage, onOpen, onClose, onError]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeoutIfSet();
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connect]);

  const sendMessage = useCallback(
    (data: string | ArrayBuffer | Blob) => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send(data);
      } else {
        console.warn("WebSocket is not open. Message not sent.");
      }
    },
    []
  );

  return { socket: socketRef.current, sendMessage, status };
};