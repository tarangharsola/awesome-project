{"import { useState, useEffect } from 'react';

interface ReconnectionHandlerProps {
  children: React.ReactNode;
}

const ReconnectionHandler = () => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReconnecting(!reconnecting);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : 'Connected'}
    </div>
  );
}

export default ReconnectionHandler;