{"import React from 'react';
import { useEditor } from './useEditor';

interface UserListProps {
  editor: useEditor;
}

const UserList = ({ editor }: UserListProps) => {
  const { users } = editor;
  return <div>Users: {users.map(user => user.name).join(', ')}</div>;
};

export default UserList;