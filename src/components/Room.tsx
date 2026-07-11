{"import React from 'react';
import { useWebSocket } from '../utils/useWebSocket';

const Room = () => {
  const socket = useWebSocket();
  return (
    <div>
      <h1>Room</h1>
      <Editor />
      <CursorTracker />
      <LanguageSelector />
    </div>
  );
};

export default Room;