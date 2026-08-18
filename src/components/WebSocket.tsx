import React, { ReactNode } from 'react';
import { useWebSocket } from '../utils/useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';

type Props = {
  url: string;
  children: ReactNode;
};

/**
 * WebSocketProvider establishes a resilient WebSocket connection using the
 * useWebSocket hook. It renders a ConnectionStatus indicator and forwards the
 * WebSocket sendMessage function via a custom event system (or context if the
 * project already uses one).
 */
export const WebSocketProvider: React.FC<Props> = ({ url, children }) => {
  const { sendMessage, status } = useWebSocket({
    url,
    onMessage: (event) => {
      // Broadcast incoming messages to the rest of the app.
      const custom = new CustomEvent('ws-message', { detail: event.data });
      window.dispatchEvent(custom);
    },
  });

  // Example of exposing sendMessage globally; replace with proper context if needed.
  React.useEffect(() => {
    (window as any).wsSendMessage = sendMessage;
  }, [sendMessage]);

  return (
    <div>
      <ConnectionStatus status={status} />
      {children}
    </div>
  );
};
