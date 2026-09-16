import { useState, useEffect } from 'react';
import { getWebSocketClient } from '../utils/websocketClient';

/**
 * Hook exposing reconnection attempt count for UI feedback.
 */
export const useReconnection = () => {
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const client = getWebSocketClient();
    if (!client) return;
    const handleClose = () => {
      setAttempts(prev => prev + 1);
    };
    const handleOpen = () => {
      setAttempts(0);
    };
    client.on('close', handleClose);
    client.on('open', handleOpen);
    return () => {
      client.off('close', handleClose);
      client.off('open', handleOpen);
    };
  }, []);

  return attempts;
};
