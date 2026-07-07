{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState('javascript');
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'userJoin') {
        setUsers((prevUsers) => [...prevUsers, data.user]);
      } else if (data.type === 'userLeave') {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== data.userId));
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <Editor language={language} value={editorValue} setValue={setEditorValue} />
      <UserList users={users} />
    </div>
  );
}

export default App;