{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  userId: string;
  userName: string;
}

const User: React.FC<Props> = ({ userId, userName }) => {
  const { userColor } = useUsers(userId);
  return (
    <div style={{
      backgroundColor: userColor,
      padding: 10,
      borderRadius: 10,
    }}>{userName}</div>
  );
}

export default User;