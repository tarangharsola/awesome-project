{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import WebSocket from './WebSocket';
import UserList from './UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editorContent, setEditorContent] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'updateUsers') {
        setUsers(data.users);
      } else if (data.type === 'updateEditorContent') {
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
    setUsers([...users, user]);
  };

  const handleUserLeave = (user) => {
    setUsers(users.filter((u) => u !== user));
  };

  return (
    <div>
      <h1>Collaborative Code Editor</h1>
      <Editor content={editorContent} language={language} />
      <WebSocket onMessage={(event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'updateUsers') {
          setUsers(data.users);
        } else if (data.type === 'updateEditorContent') {
          setEditorContent(data.content);
        }
      }} />
      <UserList users={users} onUserJoin={handleUserJoin} onUserLeave={handleUserLeave} />
      <LanguageSelector language={language} onChange={handleLanguageChange} />
    </div>
  );
}

export default App;