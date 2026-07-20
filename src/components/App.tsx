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
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'language') {
        setLanguage(data.language);
      } else if (data.type === 'editorValue') {
        setEditorValue(data.editorValue);
      }
    };
    return () => ws.close();
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