import React from 'react';
import { useEditor } from './useEditor';
import { useUsers } from './useUsers';

interface ReconnectionHandlerProps {
  editor: useEditor;
  users: useUsers;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ editor, users }) => {
  const { document } = editor;
  const { usersList } = users;

  return (
    <div>
      <h2>Reconnection Handler</h2>
      <p>Document: {document}</p>
      <p>Users: {usersList}</p>
    </div>
  );
};

export default ReconnectionHandler;