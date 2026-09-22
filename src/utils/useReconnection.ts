import { useEffect, useRef } from 'react';
import { getWebSocketClient } from './websocketClient';

/**
 * Hook that ensures a WebSocket connection with exponential backoff reconnection.
 * It returns the client instance for the caller to attach listeners.
 */
export const useReconnection = (url: string) => {
  const clientRef = useRef<any>(null);

  useEffect(() => {
    clientRef.current = getWebSocketClient(url);
    // No additional logic needed because the client itself handles reconnection.
    return () => {
      clientRef.current?.close();
    };
  }, [url]);

  return clientRef.current;
};
