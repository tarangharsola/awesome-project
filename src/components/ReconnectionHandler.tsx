{"import React from 'react';
import { useReconnection } from './useReconnection';

interface ReconnectionHandlerProps {
  reconnection: useReconnection;
}

const ReconnectionHandler = ({ reconnection }: ReconnectionHandlerProps) => {
  const { reconnect } = reconnection;
  return <div><button onClick={reconnect}>Reconnect</button></div);
};

export default ReconnectionHandler;