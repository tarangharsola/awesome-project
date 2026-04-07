{"import React from 'react';
import RoomComponent from './RoomComponent';
import WebSocket from './WebSocket';
import useWebSocket from './useWebSocket';

const Room = () => {
  const { send, receive } = useWebSocket();

  useEffect(() => {
    send({ type: 'JOIN', data: { room: 'room1' } });
  }, []);

  return (
    <div>
      <RoomComponent />
      <WebSocket receive={receive} />
    </div>
  );
};

export default Room;