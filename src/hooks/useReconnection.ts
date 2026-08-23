import { useEffect, useRef, useState } from 'react';
import { useWebSocket } from './useWebSocket';
import { ConflictResolver } from '../utils/useConflictResolver';

export function useReconnection(resolver: ConflictResolver) {
  const { socket, sendMessage, isConnected } = useWebSocket();
  const backoffRef = useRef(1000);
  const timeoutRef = useRef<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Trigger sync request on (re)connection
  useEffect(() => {
    if (isConnected && socket) {
      backoffRef.current = 1000;
      setRetryCount(0);
      sendMessage({ type: 'sync_request', clientId: resolver.getClientId() });
    } else {
      const attempt = () => {
        backoffRef.current = Math.min(backoffRef.current * 2, 30000);
        setRetryCount((c) => c + 1);
      };
      timeoutRef.current = window.setTimeout(attempt, backoffRef.current);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isConnected, socket, resolver, sendMessage]);

  // Handle incoming sync response from server
  useEffect(() => {
    if (!socket) return;
    const handler = (event: MessageEvent) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'sync_response' && msg.document !== undefined) {
        resolver.applyChange({
          id: `sync-${Date.now()}`,
          clientId: 'server',
          timestamp: Date.now(),
          ops: msg.document,
        });
      }
    };
    socket.addEventListener('message', handler);
    return () => socket.removeEventListener('message', handler);
  }, [socket, resolver]);
}
