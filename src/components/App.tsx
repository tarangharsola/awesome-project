import React from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';
import { Editor } from './Editor';
import { LanguageSelector } from './LanguageSelector';
import { UserList } from './UserList';
import './App.css';

export const App: React.FC = () => {
  // WebSocket URL can be configured via environment variable.
  const wsUrl = process.env.REACT_APP_WS_URL || '';
  const { status, sendMessage } = useWebSocket(wsUrl);

  // The rest of the app (editor, user list, etc.) can use sendMessage as needed.
  // For brevity, only the connection status indicator is shown here.

  return (
    <div className="app-container">
      <ConnectionStatus status={status} />
      {/* Existing UI components */}
      <LanguageSelector />
      <Editor sendMessage={sendMessage} />
      <UserList />
    </div>
  );
};