{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  userId: string;
  color: string;
}

const User: React.FC<Props> = ({ userId, color }) => {
  const { users } = useUsers();
  const user = users.find((user) => user.id === userId);
  return (
    <div style={{
      backgroundColor: color,
      padding: 10,
      borderRadius: 10,
    }}>{user?.name}</div>
  );
}

export default User;