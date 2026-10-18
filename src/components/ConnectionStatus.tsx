import React, { useEffect, useState } from 'react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import './ConnectionStatus.css';

export const ConnectionStatusIndicator: React.FC = () => {
  const { status, retryDelay } = useConnectionStatus();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (retryDelay !== undefined) {
      const initial = Math.ceil(retryDelay / 1000);
      setCountdown(initial);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev && prev > 1) return prev - 1;
          clearInterval(interval);
          return null;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCountdown(null);
    }
  }, [retryDelay]);

  let displayText = '';
  if (status === 'connected') {
    displayText = 'Connected';
  } else if (status === 'connecting') {
    displayText = 'Connecting...';
  } else {
    displayText = countdown ? `Reconnecting in ${countdown}s...` : 'Disconnected';
  }

  return <div className={`connection-status ${status}`}>{displayText}</div>;
};