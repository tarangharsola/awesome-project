{"import { useState, useEffect } from 'react';

interface ReconnectionProps {
  users: { id: string; name: string; color: string }[]
}

const useReconnection = ({ users }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setReconnecting(!reconnecting);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return reconnecting;
}

export default useReconnection;