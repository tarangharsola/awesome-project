import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface EditorProps {
  editor: useEditor;
  users: useUsers;
}

const Editor: React.FC<EditorProps> = ({ editor, users }) => {
  const { document } = editor;
  const { usersList } = users;

  return (
    <div>
      <h2>Editor</h2>
      <p>Document: {document}</p>
      <p>Users: {usersList}</p>
    </div>
  );
};

export default Editor;