{"import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface ReconnectionState {
  connected: boolean;
}

const useReconnection = () => {
  const [reconnectionState, setReconnectionState] = useState<ReconnectionState>({ connected: false });
  const socket = io();

  useEffect(() => {
    socket.on('connect', () => {
      setReconnectionState({ connected: true });
    });
    socket.on('disconnect', () => {
      setReconnectionState({ connected: false });
    });
  }, []);

  return reconnectionState;
};

export default useReconnection;