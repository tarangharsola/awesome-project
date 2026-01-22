import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface AwarenessConsistencyProps {
  editor: useEditor;
  users: useUsers;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor, users }) => {
  const { document } = editor;
  const { usersList } = users;

  return (
    <div>
      <h2>Awareness Consistency</h2>
      <p>Document: {document}</p>
      <p>Users: {usersList}</p>
    </div>
  );
};

export default AwarenessConsistency;