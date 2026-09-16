import React from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatusIndicator from './ConnectionStatus';
import { useWebSocket } from '../hooks/useWebSocket';
import './App.css';

const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';

const App: React.FC = () => {
  const { socket, sendMessage, status } = useWebSocket(WS_URL);

  // The socket and sendMessage are passed down to child components via context or props as needed.
  // For brevity, only the connection status indicator is shown here.

  return (
    <div className="app-container">
      <ConnectionStatusIndicator status={status} />
      <div className="main-panel">
        <LanguageSelector />
        <Editor socket={socket} sendMessage={sendMessage} />
      </div>
      <UserList />
    </div>
  );
};

export default App;
