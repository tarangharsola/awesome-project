{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);
  const [lastKnownState, setLastKnownState] = useState({});
  const { send, close } = useWebSocket();

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
      send('reconnect', lastKnownState);
    };

    const handleDisconnect = () => {
      setReconnecting(false);
      setLastKnownState({});
    };

    const handleMessage = (message) => {
      if (message.type === 'reconnect') {
        setLastKnownState(message.state);
      }
    };

    send('subscribe', 'reconnect');

    return () => {
      close();
    };
  }, [send, close, lastKnownState]);

  return reconnecting;
};

export default useReconnection;