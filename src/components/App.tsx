import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'javascript' | 'python' | 'html'>('javascript');

  return (
    <div className="app">
      <header className="app-header">
        <LanguageSelector language={language} onChange={setLanguage} />
        <ConnectionStatus />
      </header>
      <main className="app-main">
        <Editor language={language} />
        <UserList />
      </main>
    </div>
  );
};

export default App;
