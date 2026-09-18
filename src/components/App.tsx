import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import ConnectionStatus from './ConnectionStatus';
import './App.css';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');

  return (
    <div className="app-container">
      <ConnectionStatus />
      <div className="main-content">
        <aside className="sidebar">
          <UserList />
          <LanguageSelector selected={language} onChange={setLanguage} />
        </aside>
        <section className="editor-section">
          <Editor language={language} />
        </section>
      </div>
    </div>
  );
};

export default App;
