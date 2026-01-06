{"import React from 'react';
import { useEditor } from './useEditor';

interface UserListProps {
  editor: any;
  users: any;
}

const UserList = ({ editor, users }: UserListProps) => {
  const { state, dispatch } = useEditor(editor);
  const { cursor, selection } = state;

  const handleUserChange = (newUser: any) => {
    dispatch({ type: 'UPDATE_USER', payload: newUser });
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => handleUserChange({ id: 1, name: 'John Doe', color: 'red' })}>Add User</button>
    </div>
  );
}

export default UserList;