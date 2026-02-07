{"import { WebSocket } from 'ws';

interface Props {}

const ReconnectionHandler = () => {
  const ws = new WebSocket('ws://localhost:8080');
  return ws;
}

export default ReconnectionHandler;