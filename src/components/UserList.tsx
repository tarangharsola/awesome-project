{"import React from 'react';
import User from './User';

interface UserListProps {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
    }}>
      {users.map((user, index) => (
        <User key={index} name={user.name} color={user.color} />
      ))}
    </div>
  );
}

export default UserList;