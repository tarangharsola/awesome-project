{"import React from 'react';
import ReconnectionHandler from './ReconnectionHandler';
import useReconnection from './useReconnection';

const useReconnectionHandler = () => {
  const reconnect = useReconnection();

  return {
    reconnect,
    ReconnectionHandler
  };
};

export default useReconnectionHandler;