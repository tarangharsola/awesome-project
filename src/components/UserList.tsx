{"import React from 'react';
import { useEditor } from './useEditor';

interface UserListProps {
  editor: useEditor;
}

const UserList = ({ editor }: UserListProps) => {
  const { state, dispatch } = editor;
  const { users } = state;

  const handleUserUpdate = (user: any) => {
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          position: 'absolute',
          left: user.x,
          top: user.y,
          width: 2,
          height: 2,
          backgroundColor: user.color
        }}>
        </div>
      ))}
    </div>
  );

  return handleUserUpdate;
};

export default UserList;