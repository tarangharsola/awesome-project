{"import { WebSocket } from 'ws';

const useReconnection = () => {
  const ws = new WebSocket('ws://localhost:8080');
  return ws;
};

export default useReconnection;