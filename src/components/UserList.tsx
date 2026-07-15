{"import React from 'react';
import User from './User';

interface UserListProps {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#333',
      color: '#fff',
    }}>
      {users.map((user, index) => (
        <User key={index} name={user.name} color={user.color} />
      ))}
    </div>
  );
}

export default UserList;