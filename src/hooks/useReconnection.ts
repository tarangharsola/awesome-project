import { useEffect, useState, useCallback } from 'react';
import { useWebSocket } from './useWebSocket';
import type { User } from '../types';

/**
 * Hook that abstracts reconnection logic for collaborative sessions.
 * It exposes connection status and a method to manually trigger reconnection.
 */
export function useReconnection(roomUrl: string, user: User) {
  const { ws, connected, sendMessage } = useWebSocket(roomUrl, user);
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>(
    connected ? 'connected' : 'disconnected'
  );

  // Update status based on WebSocket events
  useEffect(() => {
    if (!ws) return;
    const handleOpen = () => setStatus('connected');
    const handleClose = () => setStatus('reconnecting');
    ws.addEventListener('open', handleOpen);
    ws.addEventListener('close', handleClose);
    return () => {
      ws.removeEventListener('open', handleOpen);
      ws.removeEventListener('close', handleClose);
    };
  }, [ws]);

  const reconnect = useCallback(() => {
    if (ws && ws.readyState !== WebSocket.OPEN) {
      ws.close();
    }
    // useWebSocket's internal logic will attempt reconnection automatically.
  }, [ws]);

  // Ensure presence is re‑sent after reconnection
  useEffect(() => {
    if (status === 'connected') {
      sendMessage({ type: 'presence', payload: { user } });
    }
  }, [status, sendMessage, user]);

  return { status, reconnect } as const;
}
