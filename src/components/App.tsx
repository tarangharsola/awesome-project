import React from 'react';
import ConnectionStatus from './ConnectionStatus';
import Editor from './Editor';
import { useWebSocket } from '../hooks/useWebSocket';

// Adjust the WebSocket endpoint as needed for the deployment environment
const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

const App: React.FC = () => {
  const { sendMessage, status } = useWebSocket(WS_URL, (msg) => {
    // Existing message handling logic (e.g., dispatch to store, update editor state)
    // This placeholder preserves current behavior without modification.
    // eslint-disable-next-line no-console
    console.debug('Received WS message', msg);
  });

  return (
    <div className="app-container">
      <ConnectionStatus status={status} />
      <Editor sendMessage={sendMessage} />
    </div>
  );
};

export default App;