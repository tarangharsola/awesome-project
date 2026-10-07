import React, { useCallback } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { ConnectionStatus } from './ConnectionStatus';
import { Editor } from './Editor';
import { LanguageSelector } from './LanguageSelector';
import { UserList } from './UserList';
import { useCollaboration } from '../hooks/useCollaboration';
import { usePresence } from '../hooks/usePresence';
import './App.css';

export const App: React.FC = () => {
  const roomId = window.location.pathname.slice(1) || 'default';
  const wsUrl = `${process.env.REACT_APP_WS_URL || 'ws://localhost:8080'}/${roomId}`;

  const handleMessage = useCallback((msg) => {
    // Existing message handling logic (delegated to collaboration/presence hooks)
  }, []);

  const { send, status } = useWebSocket(wsUrl, handleMessage);

  // Hook integrations (collaboration, presence) now receive the send function.
  useCollaboration(send);
  usePresence(send);

  return (
    <div className="app-container">
      <ConnectionStatus status={status} />
      <div className="sidebar">
        <UserList />
        <LanguageSelector />
      </div>
      <Editor send={send} />
    </div>
  );
};