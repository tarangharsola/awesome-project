import { useEffect, useRef } from 'react';
import useWebSocket from './useWebSocket';

/**
 * Thin wrapper that ensures the WebSocket hook is instantiated with stable parameters.
 * All reconnection logic now lives inside `useWebSocket`; this hook simply forwards the
 * connection status for UI components.
 */
export default function useReconnection(params: {
  url: string;
  userId: string;
  userName: string;
  userColor: string;
}) {
  const { status, sendMessage } = useWebSocket(params);

  // Expose status for components like ConnectionStatus.
  useEffect(() => {
    // No side‑effects needed – the hook exists for API compatibility.
  }, [status]);

  return { status, sendMessage } as const;
}
