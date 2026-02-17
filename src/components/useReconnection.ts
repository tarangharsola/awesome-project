{"import { useState, useEffect } from 'react';

const useReconnection = () => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnection = () => {
      setReconnecting(true);
      setTimeout(() => {
        setReconnecting(false);
      }, 1000);
    };

    return () => {
      // Clean up on unmount
    };
  }, []);

  return reconnecting;
};
export default useReconnection;