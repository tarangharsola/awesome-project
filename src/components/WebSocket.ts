{"import WebSocket from 'ws';

const WebSocket = ({ ws }) => {
  const [wsState, setWsState] = useState(ws);

  useEffect(() => {
    wsState.onmessage = (event) => {
      console.log(event.data);
    };
    return () => {
      wsState.close();
    };
  }, []);

  return (
    <div>
      <button onClick={() => wsState.close()}>Close WebSocket</button>
    </div>
  );
};

export default WebSocket;