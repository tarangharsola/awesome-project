import React from 'react';
import ConnectionStatus from './ConnectionStatus';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import Room from './Room';

const App: React.FC = () => {
  return (
    <div className="app-container" data-testid="app-root">
      <header className="app-header">
        <h1>Collaborative Code Editor</h1>
        <LanguageSelector />
        <ConnectionStatus />
      </header>
      <main className="app-main">
        <Room />
        <Editor />
        <UserList />
      </main>
    </div>
  );
};

export default App;
