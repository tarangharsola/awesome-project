import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = () => {
   const [socket, setSocket] = useState(null);

   useEffect(() => {
      const newSocket = io();
      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      };
   }, []);

   return socket;
};

export default useWebSocket;