{"import React, { useState, useEffect } from 'react';
import useReconnection from './useReconnection';

interface WebSocketProps {
  url: string;
  onMessage: (message: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const WebSocket = ({ url, onMessage, onOpen, onClose }: WebSocketProps) => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { handleConnectionError, handleReconnect } = useReconnection({
    retryDelay: 500,
    maxRetries: 3
  });

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      onMessage(event.data);
    };

    ws.onopen = () => {
      setConnectionStatus('connected');
      onOpen();
    };

    ws.onclose = () => {
      setConnectionStatus('disconnected');
      onClose();
    };

    ws.onerror = (event) => {
      handleConnectionError();
    };

    return () => {
      ws.close();
    };
  }, [url, onMessage, onOpen, onClose]);

  useEffect(() => {
    if (reconnecting) {
      setRetryCount(retryCount + 1);
    }
  }, [reconnecting, retryCount]);

  const handleReconnect = () => {
    handleReconnect();
  };

  return (
    <div>
      <p>Connection Status: {connectionStatus}</p>
      <p>Retry Count: {retryCount}</p>
      <button onClick={handleReconnect}>Reconnect</button>
    </div>
  );
};

export default WebSocket;