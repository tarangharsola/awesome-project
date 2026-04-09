{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler = ({ children }: ReconnectionHandlerProps) => {
  const { reconnect } = useWebSocket();

  useEffect(() => {
    reconnect();
  }, []);

  return children;
}

export default ReconnectionHandler;