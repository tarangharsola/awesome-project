{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  connected: boolean;
}

const Header = ({ connected }: Props) => {
  const [retryCount, setRetryCount] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!connected) {
        setRetryCount(retryCount + 1);
        if (retryCount >= 3) {
          setReconnecting(true);
        }
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [connected, retryCount]);

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      {connected ? (
        <p>Connected</p>
      ) : (
        <p>Disconnected. Retrying...</p>
      )}
      {reconnecting ? (
        <p>Reconnecting...</p>
      ) : null}
    </div>
  );
};

export default Header;