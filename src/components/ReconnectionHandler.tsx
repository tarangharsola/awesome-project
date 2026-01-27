{"import React from 'react';
import { useReconnection } from './useReconnection';

interface ReconnectionHandlerProps {
  roomId: string;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ roomId }) => {
  const reconnection = useReconnection(roomId);
  return <div>Reconnection: {JSON.stringify(reconnection)}</div);
};

export default ReconnectionHandler;