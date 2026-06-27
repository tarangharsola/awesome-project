{"import { useState, useEffect } from 'react';
import { useWebSocket } from './useWebSocket';

interface Awareness {
  updateAwareness: (awareness: any) => void;
}

const useAwareness = () => {
  const { send } = useWebSocket();
  const [awareness, setAwareness] = useState<Record<string, any>>({});

  useEffect(() => {
    const handleAwareness = (awareness: any) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, ...awareness }));
    };

    send({ type: 'UPDATE_AWARENESS', payload: handleAwareness });
  }, []);

  const updateAwareness = (awareness: any) => {
    setAwareness((prevAwareness) => ({ ...prevAwareness, ...awareness }));
    send({ type: 'UPDATE_AWARENESS', payload: awareness });
  };

  return { updateAwareness, awareness };
};

export default useAwareness;