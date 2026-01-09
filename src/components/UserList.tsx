{"import React from 'react';
import { useEditor } from './useEditor';

interface UserListProps {
  editor: any;
  children: React.ReactNode;
}

const UserList = ({ editor, children }: UserListProps) => {
  const { users } = useEditor(editor);
  return (
    <div>
      {children}
      {users.map((user, index) => (
        <div key={index}>{user.name} - {user.color}</div>
      ))}
    </div>
  );
}

export default UserList;