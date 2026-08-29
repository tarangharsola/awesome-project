import { useEffect, useRef, useState } from "react";

export interface WebSocketOptions {
  url: string;
  protocols?: string | string[];
  onMessage: (event: MessageEvent) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It exposes the current readyState and a send function.
 */
export function useWebSocket(options: WebSocketOptions) {
  const { url, protocols, onMessage, onOpen, onClose, onError } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const [readyState, setReadyState] = useState<WebSocket["readyState"]>(WebSocket.CLOSED);
  const maxDelay = 30000; // 30 seconds

  const send = (data: string | ArrayBuffer | Blob) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  };

  const connect = () => {
    wsRef.current = new WebSocket(url, protocols);
    setReadyState(WebSocket.CONNECTING);

    wsRef.current.onopen = () => {
      reconnectAttempts.current = 0;
      setReadyState(WebSocket.OPEN);
      onOpen?.();
    };

    wsRef.current.onmessage = onMessage;

    wsRef.current.onclose = (event) => {
      setReadyState(WebSocket.CLOSED);
      onClose?.();
      scheduleReconnect();
    };

    wsRef.current.onerror = (event) => {
      onError?.(event);
      // onclose will trigger reconnection
    };
  };

  const scheduleReconnect = () => {
    const delay = Math.min(1000 * 2 ** reconnectAttempts.current, maxDelay);
    reconnectAttempts.current += 1;
    setTimeout(() => {
      connect();
    }, delay);
  };

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { send, readyState };
}
