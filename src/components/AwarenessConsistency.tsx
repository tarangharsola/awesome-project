{"import React from 'react';
import { io } from 'socket.io-client';

interface AwarenessConsistencyProps {
  onAwareness: (awareness: any) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ onAwareness }) => {
  const socket = io('ws://localhost:3001');
  socket.on('awareness', (awareness) => {
    onAwareness(awareness);
  });
  return null;
};

export default AwarenessConsistency;