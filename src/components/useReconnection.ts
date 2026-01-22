// Import required modules
import { useState, useEffect } from 'react';

// Define the useReconnection hook
const useReconnection = () => {
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    // Check for reconnection on mount
    const checkReconnection = () => {
      setReconnected(true);
    };
    return () => {
      // Clean up on unmount
      checkReconnection();
    };
  }, []);

  return reconnected;
};

export default useReconnection;