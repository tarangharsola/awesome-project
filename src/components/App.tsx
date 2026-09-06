import React from 'react';
import ConnectionStatus from './ConnectionStatus';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import Room from './Room';

const App: React.FC = () => {
  return (
    <div className="app" data-testid="app-root">
      <ConnectionStatus />
      <Room />
      <LanguageSelector />
      <Editor />
      <UserList />
    </div>
  );
};

export default App;
