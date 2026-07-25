{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import LanguageSelector from './LanguageSelector';
import UserList from './UserList';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [editorValue, setEditorValue] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editorValue') {
        setEditorValue(data.editorValue);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <Editor value={editorValue} setValue={setEditorValue} language={language} />
      <UserList users={users} />
      <WebSocket ws={ws} />
    </div>
  );
}

export default App;