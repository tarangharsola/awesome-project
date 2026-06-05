{"import { useWebSocket } from './useWebSocket';

const WebSocket = () => {
  const { socket, connected } = useWebSocket();

  if (!connected) return <div>Connecting...</div>;

  return <div>Connected!</div>;
};

export default WebSocket;