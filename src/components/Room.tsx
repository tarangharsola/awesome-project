{"import React from 'react';
import { useRoom } from './useRoom';

function Room() {
  const room = useRoom();
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {room.children}
    </div>
  );
}

export default Room;