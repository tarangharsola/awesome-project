{"import React from 'react';
import useWebSocket from './useWebSocket';

function useWebSocket() {
  const ws = useWebSocket();

  return ws;
}

export default useWebSocket;