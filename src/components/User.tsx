{"import React from 'react';
import { useUsers } from './useUsers';

interface UserProps {
  userId: string;
  userName: string;
  cursorColor: string;
}

const User: React.FC<UserProps> = ({ userId, userName, cursorColor }) => {
  const { users } = useUsers();
  const user = users.find((user) => user.id === userId);
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <span style={{
        color: cursorColor,
      }}>{userName}</span>
      <span style={{
        color: cursorColor,
      }}>{userId}</span>
    </div>
  );
};

export default User;