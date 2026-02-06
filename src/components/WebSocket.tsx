{"import { useState, useEffect } from 'react';

interface WebSocketProps {
  roomId: string;
}

const WebSocket = ({ roomId }: WebSocketProps) => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    socket.onopen = () => {
      setConnectionStatus('connected');
    };
    socket.onclose = () => {
      setConnectionStatus('disconnected');
    };
    socket.onerror = (error) => {
      console.error(error);
    };
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      // Send message to server
    }
  }, [connectionStatus]);

  return (
    <div>
      Connection status: {connectionStatus}
      Messages:
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default WebSocket;