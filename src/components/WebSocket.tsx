import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

interface Props {
  url: string;
  children: (status: string) => React.ReactNode;
}

export const WebSocketProvider: React.FC<Props> = ({ url, children }) => {
  const { status } = useWebSocket({ url });
  return <>{children(status)}</>;
};
