import WebSocket from 'ws';

const WebSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};

export default WebSocket;