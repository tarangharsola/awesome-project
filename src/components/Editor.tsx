{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';
import { useUsers } from './useUsers';
import { useConflictResolver } from './useConflictResolver';

interface EditorProps {
  language: string;
  code: string;
}

const Editor: React.FC<EditorProps> = ({ language, code }) => {
  const [editorState, setEditorState] = useState(code);
  const { sendText, receiveText } = useWebSocket();
  const { users, addUser, removeUser } = useUsers();
  const { resolveConflict } = useConflictResolver();

  useEffect(() => {
    receiveText((text) => setEditorState(text));
  }, []);

  const handleTextChange = (text: string) => {
    sendText(text);
    resolveConflict(text);
  };

  return (
    <div>
      <textarea
        value={editorState}
        onChange={(e) => handleTextChange(e.target.value)}
      />
      <div>
        {users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Editor;