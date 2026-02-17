{"import { useState, useEffect } from 'react';
import WebSocket from './WebSocket';

const useWebSocket = () => {
  const { socket, reconnecting } = WebSocket();

  return { socket, reconnecting };
};
export default useWebSocket;