{"import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './Editor';
import UserList from './UserList';
import WebSocket from './WebSocket';

const App = () => {
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

  return (
    <div>
      <Editor content={editorContent} language={language} />
      <UserList users={users} />
      <WebSocket />
    </div>
  );
};

export default App;