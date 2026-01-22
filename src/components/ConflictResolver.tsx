import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface ConflictResolverProps {
  editor: useEditor;
  users: useUsers;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor, users }) => {
  const { document } = editor;
  const { usersList } = users;

  return (
    <div>
      <h2>Conflict Resolver</h2>
      <p>Document: {document}</p>
      <p>Users: {usersList}</p>
    </div>
  );
};

export default ConflictResolver;