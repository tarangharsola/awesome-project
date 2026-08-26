import { useEffect, useRef } from 'react';
import { initWebSocket, getProvider } from '../utils/websocketClient';

/**
 * Hook that ensures the WebSocket connection is re‑established with exponential back‑off.
 * It also updates the supplied `onStatusChange` callback.
 */
export const useReconnection = (roomId: string, onStatusChange: (status: string) => void) => {
  const retryCount = useRef(0);
  const maxDelay = 30000; // 30 seconds

  useEffect(() => {
    // Initialise the connection on mount.
    initWebSocket(roomId, onStatusChange);

    const handleClose = () => {
      const delay = Math.min(1000 * 2 ** retryCount.current, maxDelay);
      setTimeout(() => {
        // Re‑initialise the provider; Yjs provider will attempt reconnection automatically.
        initWebSocket(roomId, onStatusChange);
        retryCount.current += 1;
      }, delay);
    };

    const provider = getProvider();
    if (provider) {
      provider.on('connection-close', handleClose);
    }

    return () => {
      const prov = getProvider();
      if (prov) {
        prov.off('connection-close', handleClose);
      }
    };
  }, [roomId, onStatusChange]);
};
