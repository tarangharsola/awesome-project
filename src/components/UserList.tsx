{"import React from 'react';
import { useEditor } from './useEditor';

interface UserListProps {
  editor: useEditor;
}

const UserList: React.FC<UserListProps> = ({ editor }) => {
  const { users } = editor;
  return (
    <div>
      {users.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;