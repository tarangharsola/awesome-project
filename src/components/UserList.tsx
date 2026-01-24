{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { userName: string; userColor: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div>
      {users.map((user, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 10
        }}>
          <div style={{
            backgroundColor: user.userColor,
            width: 10,
            height: 10,
            borderRadius: 5,
            marginRight: 10
          }} />
          <span>{user.userName}</span>
        </div>
      ))}
    </div>
  );
};

export default UserList;