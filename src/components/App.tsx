import React, { useState, useCallback } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang);
  }, []);

  const handleSave = useCallback(() => {
    // In a real app this would persist the document to a backend or local storage.
    console.log('Document saved');
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Collaborative Code Editor</h1>
        <ConnectionStatus />
      </header>
      <aside className="sidebar">
        <UserList />
        <LanguageSelector selectedLanguage={language} onLanguageChange={handleLanguageChange} />
      </aside>
      <main className="editor-pane">
        <Editor language={language} onSave={handleSave} />
      </main>
    </div>
  );
};

export default App;
