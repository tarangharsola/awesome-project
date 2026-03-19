{"import React from 'react';
import RoomComponent from './RoomComponent';
import WebSocket from './WebSocket';
import useWebSocket from './useWebSocket';

const Room = () => {
  const { send, receive } = useWebSocket();

  useEffect(() => {
    send({ type: 'JOIN', data: { username: 'John Doe' } });
  }, []);

  return (
    <div>
      <RoomComponent />
      <WebSocket send={send} receive={receive} />
    </div>
  );
};

export default Room;