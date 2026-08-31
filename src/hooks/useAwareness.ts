import { useEffect, useRef } from 'react';
import { useWebSocket } from './useWebSocket';
import { useReconnection } from './useReconnection';
import { UserAwareness } from '../types';

/**
 * Hook that manages broadcasting and receiving user awareness information
 * (username, color, cursor position). It ensures that after a reconnection the
 * local user's awareness is re‑sent so that remote peers stay in sync.
 */
export const useAwareness = (localAwareness: UserAwareness) => {
  const { socket } = useWebSocket();
  const { isConnected } = useReconnection();
  const awarenessRef = useRef<UserAwareness>(localAwareness);

  // Keep the ref up‑to‑date when local awareness changes
  useEffect(() => {
    awarenessRef.current = localAwareness;
  }, [localAwareness]);

  // Broadcast local awareness whenever the socket is open or after reconnection
  useEffect(() => {
    if (!socket) return;
    if (socket.readyState !== WebSocket.OPEN) return;
    const msg = { type: 'AWARENESS_UPDATE', payload: awarenessRef.current };
    socket.send(JSON.stringify(msg));
  }, [socket, isConnected]);

  // Listen for remote awareness updates
  useEffect(() => {
    if (!socket) return;
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'AWARENESS_UPDATE') {
          // Forward to any subscribed listeners via a custom event
          const awarenessEvent = new CustomEvent('remoteAwareness', {
            detail: data.payload,
          });
          window.dispatchEvent(awarenessEvent);
        }
      } catch (_) {
        // ignore malformed messages
      }
    };
    socket.addEventListener('message', handleMessage);
    return () => socket.removeEventListener('message', handleMessage);
  }, [socket]);
};
