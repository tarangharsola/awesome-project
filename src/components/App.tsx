{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

function App() {
  const [users, setUsers] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        setUsers(data.users);
      } else if (data.type === 'editorContent') {
        setEditorContent(data.content);
      }
    };
    return () => {
      ws.close();
    };
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
  };

  const handleUserJoin = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUserLeave = (user) => {
    setUsers((prevUsers) => prevUsers.filter((u) => u !== user));
  };

  return (
    <div>
      <Editor content={editorContent} language={language} />
      <UserList users={users} />
      <WebSocket onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
    </div>
  );
}

export default App;