import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface CursorTrackerProps {
  editor: useEditor;
  users: useUsers;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ editor, users }) => {
  const { document } = editor;
  const { usersList } = users;

  return (
    <div>
      <h2>Cursor Tracker</h2>
      <p>Document: {document}</p>
      <p>Users: {usersList}</p>
    </div>
  );
};

export default CursorTracker;