import { useEffect, useRef } from 'react';
import { WebsocketProvider } from 'y-websocket';

/**
 * Handles reconnection with exponential backoff for a Yjs WebsocketProvider.
 */
export function useReconnection(provider: WebsocketProvider) {
  const retryCount = useRef(0);
  const maxDelay = 30000; // 30 seconds

  useEffect(() => {
    const handleStatus = ({ status }: { status: string }) => {
      if (status === 'disconnected') {
        const delay = Math.min(1000 * 2 ** retryCount.current, maxDelay);
        setTimeout(() => {
          provider.connect();
          retryCount.current += 1;
        }, delay);
      } else if (status === 'connected') {
        retryCount.current = 0;
      }
    };
    provider.on('status', handleStatus);
    return () => {
      provider.off('status', handleStatus);
    };
  }, [provider]);
}
