import React, { useState } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import ConnectionStatus from './ConnectionStatus';
import UserList from './UserList';
import Room from './Room';
import { useWebSocket } from '../hooks/useWebSocket';
import { useUsers } from '../hooks/useUsers';
import { useAwareness } from '../hooks/useAwareness';
import './App.css';

const App: React.FC = () => {
  const [language, setLanguage] = useState<string>('javascript');
  const { socket, status } = useWebSocket();
  const users = useUsers(socket);
  const awareness = useAwareness(socket, users);

  return (
    <div className="app">
      <ConnectionStatus status={status} />
      <Room />
      <LanguageSelector selectedLanguage={language} onSelectLanguage={setLanguage} />
      <Editor language={language} socket={socket} awareness={awareness} />
      <UserList users={users} />
    </div>
  );
};

export default App;
