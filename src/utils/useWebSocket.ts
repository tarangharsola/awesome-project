{"import { WebSocket } from 'ws';

const useWebSocket = () => {
  const ws = new WebSocket('ws://localhost:8080');
  return ws;
};

export default useWebSocket;