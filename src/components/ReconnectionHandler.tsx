{"import React, { useState, useEffect } from 'react';

interface ReconnectionHandlerProps {
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        onReconnect();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [reconnecting, onReconnect]);

  return <div>Reconnection Handler</div>;
};

export default ReconnectionHandler;