{"import React from 'react';
import { useReconnection } from './useReconnection';

interface ReconnectionHandlerProps {
  reconnection: any;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ reconnection }) => {
  const { reconnect } = useReconnection(reconnection);
  return <button onClick={reconnect}>Reconnect</button>;
}

export default ReconnectionHandler;