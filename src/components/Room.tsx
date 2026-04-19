{"import React from 'react';
import { useRoom } from './useRoom';

const Room = () => {
  const room = useRoom();
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <h1>Room {room.id}</h1>
      <Editor />
    </div>
  );
};

export default Room;