{"import React, { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
  onReconnect: () => void;
}

const ReconnectionHandler: React.FC<Props> = ({ children, onReconnect }) => {
  const [reconnecting, setReconnecting] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (reconnecting) {
        setRetryCount(retryCount + 1);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [reconnecting, retryCount]);

  const handleReconnect = () => {
    onReconnect();
    setReconnecting(false);
    setRetryCount(0);
  };

  return (
    <div>
      {children}
      {reconnecting ? (
        <div>
          Reconnecting... ({retryCount} retries)
        </div>
      ) : (
        <button onClick={handleReconnect}>Reconnect</button>
      )}
    </div>
  );
};

export default ReconnectionHandler;