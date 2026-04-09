{"import React from 'react';
import { useUsers } from './useUsers';

interface UserListProps {
  users: { username: string; color: string; }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: 'lightgray',
      padding: 5,
      borderRadius: 5
    }}>
      Users: {users.map((user) => user.username).join(', ')}
    </div>
  );
}

export default UserList;