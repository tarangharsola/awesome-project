import { useState, useEffect } from 'react';
import WebSocket from '../components/WebSocket';

const useReconnection = () => {
   const [reconnected, setReconnected] = useState(false);

   useEffect(() => {
      // Handle reconnection logic
   }, []);

   return { reconnected, setReconnected };
};

export default useReconnection;