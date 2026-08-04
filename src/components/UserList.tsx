{"import React from 'react';
import User from './User';

interface Props {
  users: { name: string; color: string }[];
}

const UserList = ({ users }: Props) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
    }}>
      {users.map((user) => (
        <User key={user.name} name={user.name} color={user.color} />
      ))}
    </div>
  );
};

export default UserList;