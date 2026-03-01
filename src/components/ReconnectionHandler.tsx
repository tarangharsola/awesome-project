{"import React, { useState, useEffect } from 'react';
import { useReconnection } from './useReconnection';

interface Props {
  reconnection: any;
}

const ReconnectionHandler: React.FC<Props> = ({ reconnection }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };
    reconnection.on('reconnect', handleReconnect);
    return () => {
      reconnection.off('reconnect', handleReconnect);
    };
  }, [reconnection]);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
}

export default ReconnectionHandler;