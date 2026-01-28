{"import WebSocket from 'ws';

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);

  React.useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    setSocket(socket);
    return () => socket.close();
  }, []);

  return socket;
};

export default WebSocketComponent;