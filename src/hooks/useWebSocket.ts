import { useEffect, useRef, useState } from 'react';
import { ConnectionStatus } from '../types/connectionStatus';

/**
 * Hook that manages a WebSocket connection with automatic reconnection and
 * outbound message queuing. It also forwards incoming messages as global
 * MessageEvent events so other parts of the app can listen without tight
 * coupling.
 */
export const useWebSocket = (url: string) => {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const socketRef = useRef<WebSocket | null>(null);
  const messageQueue = useRef<string[]>([]);
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT = 5;

  const connect = () => {
    setStatus('connecting');
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('connected');
      reconnectAttempts.current = 0;
      // Flush any queued messages.
      while (messageQueue.current.length) {
        ws.send(messageQueue.current.shift()!);
      }
    };

    ws.onmessage = (event) => {
      // Re‑emit as a global event; collaboration hooks listen to this.
      const globalEvent = new MessageEvent('message', { data: event.data });
      window.dispatchEvent(globalEvent);
    };

    ws.onclose = () => {
      setStatus('disconnected');
      if (reconnectAttempts.current < MAX_RECONNECT) {
        const timeout = Math.min(1000 * 2 ** reconnectAttempts.current, 30000);
        reconnectAttempts.current += 1;
        setTimeout(connect, timeout);
      }
    };

    ws.onerror = () => {
      // Trigger close to activate reconnection logic.
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      socketRef.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    } else {
      // Queue until the socket is ready.
      messageQueue.current.push(msg);
    }
  };

  return { status, sendMessage } as const;
};