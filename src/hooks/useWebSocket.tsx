import { useEffect, useRef, useCallback } from 'react';
import { useReconnection } from './useReconnection';

export interface WebSocketMessage {
  type: string;
  payload?: any;
}

/**
 * Hook managing a WebSocket connection with automatic reconnection and
 * initial session handshake (join + sync request).
 */
export function useWebSocket(
  url: string,
  userInfo: { username: string; color: string },
  onMessage: (msg: WebSocketMessage) => void,
  onStatusChange?: (connected: boolean) => void
) {
  const wsRef = useRef<WebSocket | null>(null);
  const { attemptReconnect, reset } = useReconnection();

  const sendMessage = useCallback((msg: WebSocketMessage) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        reset();
        onStatusChange?.(true);
        // Handshake: announce self and request latest document state
        sendMessage({ type: 'join', payload: { username: userInfo.username, color: userInfo.color } });
        sendMessage({ type: 'sync_request' });
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          onMessage(data);
        } catch (e) {
          console.error('Invalid WS message', e);
        }
      };

      ws.onclose = () => {
        if (!isMounted) return;
        onStatusChange?.(false);
        // Attempt reconnection with backoff
        attemptReconnect(connect);
      };

      ws.onerror = () => {
        // Close will trigger reconnection logic
        ws.close();
      };
    };

    connect();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, userInfo.username, userInfo.color]);

  return { sendMessage };
}
