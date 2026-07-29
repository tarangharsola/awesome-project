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
      position: 'absolute',
      left: user.cursorPosition,
      top: 0,
      width: 2,
      height: '100%',
      backgroundColor: color,
    }} />
  );
}

export default User;