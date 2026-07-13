{"import React from 'react';
import { useUsers } from '../utils/useUsers';

interface Props {
  userId: string;
}

const User: React.FC<Props> = ({ userId }) => {
  const { users } = useUsers();
  const user = users.find((user) => user.id === userId);
  return (
    <div style={{
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: user.color,
      padding: 5,
      borderRadius: 5,
    }}>
      {user.name}
    </div>
  );
}

export default User;