{"import React from 'react';
import { useUsers } from '../utils/useUsers';

const User = () => {
  const { users } = useUsers();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} style={{
          position: 'absolute',
          top: user.cursor.top,
          left: user.cursor.left,
          backgroundColor: user.color,
          width: 2,
          height: 20,
        }}>
          {user.name}
        </div>
      ))}
    </div>
  );
};

export default User;