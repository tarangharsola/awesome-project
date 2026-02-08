{"import React from 'react';
import { useReconnection } from './useReconnection';
import { ReconnectionHandler } from './ReconnectionHandler';

const ReconnectionHandlerComponent: React.FC = () => {
  const reconnection = useReconnection();
  return <ReconnectionHandler reconnection={reconnection} />;
}

export default ReconnectionHandlerComponent;