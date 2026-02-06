{"import { useState, useEffect } from 'react';

interface useReconnectionProps {
  roomId: string;
}

const useReconnection = ({ roomId }: useReconnectionProps) => {
  const [reconnectionStatus, setReconnectionStatus] = useState('disconnected');

  useEffect(() => {
    // Handle reconnection logic
  }, []);

  return reconnectionStatus;
};

export default useReconnection;