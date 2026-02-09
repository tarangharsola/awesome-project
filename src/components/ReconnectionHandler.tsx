{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const ReconnectionHandler = () => {
  const { ws, dispatch } = useWebSocket();

  useEffect(() => {
    const reconnect = () => {
      ws.reconnect();
    };

    ws.onclose = reconnect;
    ws.onerror = reconnect;
  }, [ws]);

  return null;
};

export default ReconnectionHandler;