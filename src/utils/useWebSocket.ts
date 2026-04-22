import { useState, useEffect } from 'react';
import WebSocket from '../components/WebSocket';

const useWebSocket = () => {
   const [connected, setConnected] = useState(false);

   useEffect(() => {
      // Establish WebSocket connection
   }, []);

   return { connected, setConnected };
};

export default useWebSocket;