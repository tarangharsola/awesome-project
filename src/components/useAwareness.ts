{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface AwarenessOptions {
  webSocket: useWebSocket;
  onPresenceChange: (presence: any) => void;
}

const useAwareness = ({ webSocket, onPresenceChange }: AwarenessOptions) => {
  const [presence, setPresence] = useState({ users: [] });

  useEffect(() => {
    const handlePresenceChange = (presence) => {
      setPresence(presence);
      onPresenceChange(presence);
    };

    webSocket.on('presence', handlePresenceChange);

    return () => {
      webSocket.off('presence', handlePresenceChange);
    };
  }, [webSocket, onPresenceChange]);

  return { presence };
};

export default useAwareness;