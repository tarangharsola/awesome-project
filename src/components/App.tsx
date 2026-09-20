import React, { useState, useCallback } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';
import { useWebSocket } from '../hooks/useWebSocket';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const { connectionStatus } = useWebSocket();

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang);
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Collaborative Code Editor</h1>
        <ConnectionStatus status={connectionStatus} />
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <UserList />
          <LanguageSelector selected={language} onChange={handleLanguageChange} />
        </aside>
        <main className="editor-pane">
          <Editor language={language} />
        </main>
      </div>
    </div>
  );
};

export default App;
