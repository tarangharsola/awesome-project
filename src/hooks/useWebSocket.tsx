import { useEffect, useRef, useState, useCallback } from 'react';
import { ConnectionStatus } from '../types/connectionStatus';
import { CollaborationMessage } from '../types/collaborationMessage';

/**
 * Hook that manages a WebSocket connection with automatic reconnection.
 * It provides the current connection status and a safe sendMessage function.
 * On (re)connection it automatically requests a full document sync.
 */
export function useWebSocket(
  url: string,
  onMessage: (msg: CollaborationMessage) => void
) {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const retryCount = useRef(0);
  const maxRetry = 10;

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      retryCount.current = 0;
      // Request the latest document and presence state.
      ws.send(JSON.stringify({ type: 'sync_request' } as CollaborationMessage));
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: CollaborationMessage = JSON.parse(event.data);
        onMessage(data);
      } catch (e) {
        console.error('Failed to parse WebSocket message', e);
      }
    };

    ws.onclose = () => {
      setStatus('disconnected');
      // Exponential backoff reconnection strategy.
      const timeout = Math.min(1000 * 2 ** retryCount.current, 30000);
      if (retryCount.current < maxRetry) {
        setTimeout(() => {
          retryCount.current += 1;
          connect();
        }, timeout);
      } else {
        console.error('Maximum reconnection attempts reached');
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error', err);
      ws.close();
    };
  }, [url, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback((msg: CollaborationMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not open – message dropped', msg);
    }
  }, []);

  return { status, sendMessage } as const;
}
