import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import './ConnectionStatus.css';

type Props = {
  /**
   * WebSocket endpoint for the collaborative session.
   */
  url: string;
};

/**
 * Visual indicator of the WebSocket connection state. Shows one of three
 * statuses: Connected, Connecting…, or Disconnected – retrying…
 */
export const ConnectionStatus: React.FC<Props> = ({ url }) => {
  const { status } = useWebSocket(url);

  let text = '';
  let className = 'connection-status';

  if (status === 'connected') {
    text = 'Connected';
    className += ' connected';
  } else if (status === 'connecting') {
    text = 'Connecting…';
    className += ' connecting';
  } else {
    text = 'Disconnected – retrying…';
    className += ' disconnected';
  }

  return <div className={className}>{text}</div>;
};