import { useEffect, useRef, useState } from "react";

export interface WebSocketOptions {
  url: string;
  protocols?: string | string[];
  reconnectInterval?: number;
}

export interface WebSocketState {
  connected: boolean;
  lastMessage?: MessageEvent;
  error?: Event;
}

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 */
export function useWebSocket(
  options: WebSocketOptions
): [WebSocket | null, WebSocketState, (data: string | ArrayBuffer) => void] {
  const { url, protocols, reconnectInterval = 3000 } = options;
  const wsRef = useRef<WebSocket | null>(null);
  const [state, setState] = useState<WebSocketState>({ connected: false });

  const send = (data: string | ArrayBuffer) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  };

  useEffect(() => {
    let shouldReconnect = true;
    const connect = () => {
      const ws = new WebSocket(url, protocols);
      wsRef.current = ws;

      ws.onopen = () => setState({ connected: true });
      ws.onmessage = (msg) => setState((s) => ({ ...s, lastMessage: msg }));
      ws.onerror = (err) => setState((s) => ({ ...s, error: err }));
      ws.onclose = () => {
        setState({ connected: false });
        if (shouldReconnect) {
          setTimeout(connect, reconnectInterval);
        }
      };
    };
    connect();

    return () => {
      shouldReconnect = false;
      wsRef.current?.close();
    };
  }, [url, protocols, reconnectInterval]);

  return [wsRef.current, state, send];
}
