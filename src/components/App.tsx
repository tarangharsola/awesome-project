import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';
import { useCollaboration } from '../hooks/useCollaboration';

const App: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [color, setColor] = useState<string>('#' + Math.floor(Math.random() * 16777215).toString(16));
  const [language, setLanguage] = useState<string>('javascript');

  const { roomId, connect, disconnect, isConnected } = useCollaboration(username, color, language);

  // Username prompt UI omitted for brevity

  return (
    <div className="app">
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h1>Collaborative Code Editor</h1>
        <LanguageSelector selected={language as any} onChange={setLanguage} />
        <ConnectionStatus connected={isConnected} />
      </header>
      <main style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
        <Editor roomId={roomId} language={language} />
        <UserList />
      </main>
    </div>
  );
};

export default App;
