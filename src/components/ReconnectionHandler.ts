{"import React from 'react';
import { useState, useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  isConnected: boolean;
  retryCount: number;
}

const ReconnectionHandler: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState<State>({ isConnected: false, retryCount: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate connection status changes
      setState((prev) => ({ ...prev, isConnected: Math.random() < 0.5 }));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRetry = () => {
    setState((prev) => ({ ...prev, retryCount: prev.retryCount + 1 }));
  }

  return (
    <div>
      {children}
      <p>Connection Status: {state.isConnected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={handleRetry}>Retry ({state.retryCount})</button>
    </div>
  );
};
export default ReconnectionHandler;