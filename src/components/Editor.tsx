{"import React, { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';

function Editor({ language, code, onChange }) {
  const [cursor, setCursor] = useState({ line: 0, ch: 0 });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cursor') {
        setCursor(data.cursor);
      }
      if (data.type === 'users') {
        setUsers(data.users);
      }
    };
    return () => ws.close();
  }, []);

  const handleCodeChange = (code) => {
    onChange(code);
  };

  const handleCursorChange = (cursor) => {
    setCursor(cursor);
  };

  return (
    <div>
      <CodeMirror
        value={code}
        onChange={handleCodeChange}
        options={{
          mode: language,
          lineNumbers: true,
          foldGutter: true,
          gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
          extraKeys: {
            'Ctrl-Space': 'autocomplete',
          },
        }}
      />
      <div>
        {users.map((user, index) => (
          <span key={index} style={{
            backgroundColor: user.color,
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '12px',
          }}>{user.name}</span>
        ))}
      </div>
      <div>
        <span style={{
          backgroundColor: cursor.color,
          padding: '2px 4px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>{cursor.name}</span>
        <span style={{
          position: 'absolute',
          top: cursor.line * 20 + 10,
          left: cursor.ch * 20 + 10,
          backgroundColor: cursor.color,
          padding: '2px 4px',
          borderRadius: '4px',
          fontSize: '12px',
        }}>■</span>
      </div>
    </div>
  );
}

export default Editor;