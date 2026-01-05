{"import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

interface AwarenessConsistencyProps {
  onAwareness: (awareness: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ onAwareness }) => {
  const [awareness, setAwareness] = useState({});
  useEffect(() => {
    const socket = io('ws://localhost:3001');
    socket.on('awareness', (awareness) => {
      setAwareness(awareness);
      onAwareness(awareness);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return null;
};

export default AwarenessConsistency;