{"import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../utils/useWebSocket';

interface Props {
}

const WebSocket: React.FC<Props> = () => {
  const [ws, setWs] = useState(null);
  const { connect, send, receive } = useWebSocket();

  useEffect(() => {
    connect(() => {
      setWs(true);
    }, () => {
      setWs(false);
    });
  }, []);

  useEffect(() => {
    receive((message) => {
      console.log(message);
    });
  }, []);

  const handleSendMessage = () => {
    send({ type: 'hello' });
 );

  return (
    <div style={{
      padding: 10,
    }}>
      <button onClick={handleSendMessage}>Send Message</button>
      {ws ? 'Connected' : 'Disconnected'}
    </div>
  );
}

export default WebSocket;