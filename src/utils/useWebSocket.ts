{"import { WebSocket } from 'ws';

function useWebSocket() {
  const ws = new WebSocket('ws://localhost:8080');
  return ws;
}

export default useWebSocket;