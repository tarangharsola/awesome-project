{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const { socket, setSocket } = useWebSocket();

  useEffect(() => {
    const reconnect = () => {
      setSocket(new WebSocket('ws://localhost:8080'));
    };

    reconnect();

    const intervalId = setInterval(reconnect, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [setSocket]);

  return {
    socket,
    setSocket,
  };
};

export default useReconnection;