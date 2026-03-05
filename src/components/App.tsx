{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
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

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  return (
    <div>
      <Editor value={editorValue} language={language} />
      <UserList users={users} />
      <WebSocket />
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
    </div>
  );
}

export default App;