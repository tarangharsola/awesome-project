import { useEffect, useRef, useState } from 'react';

/**
 * Hook that manages a WebSocket connection with exponential back‑off reconnection.
 * It abstracts the low‑level socket handling and provides stable callbacks.
 */
export const useReconnection = (
  url: string,
  onMessage: (event: MessageEvent) => void,
  onOpen?: () => void,
  onClose?: (event: CloseEvent) => void
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const retryCountRef = useRef(0);
  const maxRetries = 10;

  const connect = () => {
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      retryCountRef.current = 0;
      onOpen && onOpen();
    };

    ws.onmessage = onMessage;

    ws.onclose = (event) => {
      setConnected(false);
      onClose && onClose(event);
      // Attempt reconnection with exponential back‑off.
      if (retryCountRef.current < maxRetries) {
        const timeout = Math.min(1000 * 2 ** retryCountRef.current, 30000);
        retryCountRef.current += 1;
        setTimeout(connect, timeout);
      } else {
        console.error('Maximum reconnection attempts reached.');
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      ws.close();
    };
  };

  useEffect(() => {
    connect();
    return () => {
      socketRef.current && socketRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const send = (data: string) => {
    if (connected && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    } else {
      console.warn('Attempted to send message while WebSocket is not open.');
    }
  };

  return { connected, send };
};
