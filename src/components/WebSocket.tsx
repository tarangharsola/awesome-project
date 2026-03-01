{"import WebSocket from 'ws';
import { useWebSocket } from './useWebSocket';

interface Props {
  documentId: string;
}

const WebSocket: React.FC<Props> = ({ documentId }) => {
  const { sendOperation, operations } = useWebSocket(documentId);
  return (
    <div>
      <button onClick={() => sendOperation({ type: 'create', document: 'Hello World!' })}>Send Operation</button>
      <ul>
        {operations.map((operation) => (
          <li key={operation.id}>{operation.type}</li>
        ))}
      </ul>
    </div>
  );
}

export default WebSocket;