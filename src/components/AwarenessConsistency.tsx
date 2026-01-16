{"import React from 'react';
import { io } from 'socket.io-client';

interface AwarenessConsistencyProps {
  cursors: { [key: string]: { x: number; y: number } };
  onCursorUpdate: (cursor: { x: number; y: number }) => void;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ cursors, onCursorUpdate }) => {
  const socket = io('ws://localhost:3001');
  socket.on('cursorUpdate', (cursor) => {
    onCursorUpdate(cursor);
  });
  return null;
};

export default AwarenessConsistency;