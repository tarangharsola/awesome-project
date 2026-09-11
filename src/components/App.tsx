import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import ConnectionStatus from './ConnectionStatus';
import UserList from './UserList';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Collaborative Code Editor</h1>
        <ConnectionStatus />
      </header>
      <section className="app-main">
        <aside className="sidebar">
          <UserList />
          <LanguageSelector currentLanguage={language} onChangeLanguage={setLanguage} />
        </aside>
        <main className="editor-pane">
          <Editor language={language} />
        </main>
      </section>
    </div>
  );
};

export default App;
