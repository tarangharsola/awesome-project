{"import WebSocket from 'ws';
import { useWebSocket } from './useWebSocket';

interface Props {
  documentId: string;
}

const useWebSocket = ({ documentId }) => {
  const [operations, setOperations] = useState([]);
  const [sendOperation, setSendOperation] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/${documentId}`);
    ws.onmessage = (event) => {
      setOperations((prevOperations) => [...prevOperations, JSON.parse(event.data)]);
    };
    return () => {
      ws.close();
    };
  }, [documentId]);

  return { sendOperation: setSendOperation, operations: operations };
}

export default useWebSocket;