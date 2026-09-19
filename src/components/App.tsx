import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';
import { useWebSocket } from '../hooks/useWebSocket';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const { socket, isConnected } = useWebSocket();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Collaborative Code Editor</h1>
        <ConnectionStatus connected={isConnected} />
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <UserList />
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={setLanguage}
          />
        </aside>
        <main className="editor-pane">
          <Editor language={language} socket={socket} />
        </main>
      </div>
    </div>
  );
};

export default App;
